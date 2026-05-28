use std::io;
use std::process::Command;
use std::time::{Duration, Instant};

use crossterm::ExecutableCommand;
use crossterm::event::{self, Event, KeyCode, KeyEventKind};
use crossterm::terminal::{
    EnterAlternateScreen, LeaveAlternateScreen, disable_raw_mode, enable_raw_mode,
};
use ratatui::Terminal;
use ratatui::backend::CrosstermBackend;

use crate::app::{App, AppFocus};
use crate::installer::Installer;
use crate::models::{Agent, AppError, Component, Mcp, Role, Status, TuiStage, UserResponse};
use crate::ui::ui;
use crate::utils::match_stage;

pub fn run_tui(args: crate::cli::SyncArgs) -> Result<(), AppError> {
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    stdout.execute(EnterAlternateScreen)?;
    let mut terminal = Terminal::new(CrosstermBackend::new(stdout))?;
    let mut app = App::new(args);
    let tick_rate = Duration::from_millis(100);
    let mut last_tick = Instant::now();

    loop {
        terminal.draw(|f| ui(f, &mut app))?;
        let timeout = tick_rate
            .checked_sub(last_tick.elapsed())
            .unwrap_or_else(|| Duration::from_secs(0));
        if event::poll(timeout)? {
            if let Event::Key(key) = event::read()? {
                if key.kind == KeyEventKind::Press {
                    // 1. Conflict Popup Handling
                    if app.conflict.is_some() {
                        match key.code {
                            KeyCode::Char('o') | KeyCode::Char('O') => {
                                app.resp_tx.send(UserResponse::Overwrite).ok();
                                app.conflict = None;
                            }
                            KeyCode::Char('s') | KeyCode::Char('S') => {
                                app.resp_tx.send(UserResponse::Skip).ok();
                                app.conflict = None;
                            }
                            KeyCode::Char('a') | KeyCode::Char('A') => {
                                if app.conflict.as_ref().unwrap().can_append {
                                    app.resp_tx.send(UserResponse::Append).ok();
                                    app.conflict = None;
                                }
                            }
                            KeyCode::Char('m') | KeyCode::Char('M') => {
                                let info = app.conflict.take().unwrap();
                                disable_raw_mode()?;
                                terminal.backend_mut().execute(LeaveAlternateScreen)?;

                                let temp_file = std::env::temp_dir().join(format!(
                                    "vms_new_{}",
                                    info.path.file_name().unwrap_or_default().to_string_lossy()
                                ));
                                std::fs::write(&temp_file, &info.new_content).ok();

                                let child = Command::new("vimdiff")
                                    .arg(&info.path)
                                    .arg(&temp_file)
                                    .spawn();

                                if let Ok(mut c) = child {
                                    c.wait().ok();
                                }

                                std::fs::remove_file(temp_file).ok();

                                terminal.backend_mut().execute(EnterAlternateScreen)?;
                                enable_raw_mode()?;
                                terminal.clear()?;

                                app.resp_tx.send(UserResponse::Merge).ok();
                            }
                            _ => {}
                        }
                        continue;
                    }

                    // 2. Help Modal Handling
                    if app.show_help {
                        match key.code {
                            KeyCode::Esc | KeyCode::Char('?') | KeyCode::Enter => {
                                app.show_help = false
                            }
                            _ => {}
                        }
                        continue;
                    }

                    // 3. Error Dismissal
                    if app.error_message.is_some() {
                        app.error_message = None;
                        match key.code {
                            KeyCode::Esc | KeyCode::Enter => continue,
                            _ => {}
                        }
                    }

                    // 4. Main Event Loop
                    match (app.focus, app.stage, key.code) {
                        (_, _, KeyCode::Char('c'))
                            if key.modifiers.contains(event::KeyModifiers::CONTROL) =>
                        {
                            break;
                        }
                        (_, _, KeyCode::Char('s'))
                            if key.modifiers.contains(event::KeyModifiers::CONTROL) =>
                        {
                            app.toggle_focus()
                        }
                        (_, stage, KeyCode::Tab) | (_, stage, KeyCode::BackTab)
                            if stage != TuiStage::Credentials =>
                        {
                            app.toggle_focus();
                        }

                        // Universal Esc behavior (with Summary override)
                        (AppFocus::Main, TuiStage::Summary, KeyCode::Esc) => {
                            if app.view_file_path.is_some() {
                                app.view_file_path = None;
                                app.view_file_content = None;
                            } else if app.focus == AppFocus::Sidebar {
                                app.focus = AppFocus::Main;
                            } else {
                                break;
                            }
                        }
                        (_, _, KeyCode::Esc) => {
                            if app.focus == AppFocus::Sidebar {
                                app.focus = AppFocus::Main;
                            } else {
                                break;
                            }
                        }
                        (_, _, KeyCode::Char('?')) => {
                            app.show_help = true;
                            continue;
                        }

                        // Sidebar navigation
                        (AppFocus::Sidebar, _, KeyCode::Up)
                        | (AppFocus::Sidebar, _, KeyCode::Left) => {
                            let current = app.stage as usize;
                            if current > 0 {
                                let target = match_stage(current - 1);
                                app.try_set_stage(target);
                            }
                        }
                        (AppFocus::Sidebar, _, KeyCode::Down)
                        | (AppFocus::Sidebar, _, KeyCode::Right) => {
                            let current = app.stage as usize;
                            if current < 7 {
                                let target = match_stage(current + 1);
                                if target.is_processed(&app)
                                    || current + 1 <= app.processed_stages.len()
                                {
                                    app.try_set_stage(target);
                                }
                            }
                        }
                        (AppFocus::Sidebar, _, KeyCode::Enter) => {
                            app.focus = AppFocus::Main;
                        }
                        (AppFocus::Sidebar, _, KeyCode::Char(c)) if c.is_ascii_digit() => {
                            if let Some(digit) = c.to_digit(10) {
                                if (1..=8).contains(&digit) {
                                    let target_idx = digit as usize - 1;
                                    let target = match_stage(target_idx);
                                    if target.is_processed(&app)
                                        || target_idx <= app.processed_stages.len()
                                    {
                                        app.try_set_stage(target);
                                        app.focus = AppFocus::Main;
                                    }
                                }
                            }
                        }

                        // Summary Verification Dashboard Navigation
                        (AppFocus::Main, TuiStage::Summary, KeyCode::Left) => {
                            if app.summary_selected_agent > 0 {
                                app.summary_selected_agent -= 1;
                            } else {
                                app.summary_selected_agent =
                                    app.sync_args.agents.len().saturating_sub(1);
                            }
                        }
                        (AppFocus::Main, TuiStage::Summary, KeyCode::Right) => {
                            app.summary_selected_agent = (app.summary_selected_agent + 1)
                                % app.sync_args.agents.len().max(1);
                        }
                        (AppFocus::Main, TuiStage::Summary, KeyCode::Up) => {
                            app.summary_expanded_section = match app.summary_expanded_section {
                                Some(0) => Some(3),
                                Some(1) => Some(0),
                                Some(2) => Some(1),
                                Some(3) => Some(2),
                                None => Some(2),
                                _ => Some(0),
                            };
                        }
                        (AppFocus::Main, TuiStage::Summary, KeyCode::Down) => {
                            app.summary_expanded_section = match app.summary_expanded_section {
                                Some(0) => Some(1),
                                Some(1) => Some(2),
                                Some(2) => Some(3),
                                Some(3) => Some(0),
                                None => Some(0),
                                _ => Some(0),
                            };
                        }

                        // Main Content Actions
                        (AppFocus::Main, _, KeyCode::Char('v'))
                            if key.modifiers.contains(event::KeyModifiers::CONTROL) =>
                        {
                            app.show_secrets = !app.show_secrets;
                        }
                        (AppFocus::Main, TuiStage::Credentials, KeyCode::Char('e'))
                        | (AppFocus::Main, TuiStage::Credentials, KeyCode::Char('E'))
                            if key.modifiers.contains(event::KeyModifiers::CONTROL) =>
                        {
                            let role = app.sync_args.role.unwrap();
                            let mcps = role.mcps();
                            let mut fields = Vec::new();
                            if mcps.contains(&Mcp::Figma) {
                                fields.push("Figma API Token");
                            }
                            if mcps.contains(&Mcp::Dbhub) {
                                fields.push("DBHub API Key");
                                fields.push("DBHub DSN");
                            }

                            if app.cursor_pos < fields.len() {
                                let field_name = fields[app.cursor_pos].to_string();
                                if let Some(Status::Error(e)) =
                                    app.validation_status.get(&field_name)
                                {
                                    app.error_message = Some(e.clone());
                                }
                            }
                        }
                        (AppFocus::Main, TuiStage::Credentials, KeyCode::Char('x'))
                            if key.modifiers.contains(event::KeyModifiers::CONTROL) =>
                        {
                            let role = app.sync_args.role.unwrap();
                            let mcps = role.mcps();
                            let mut fields = Vec::new();
                            if mcps.contains(&Mcp::Figma) {
                                fields.push(("Figma API Token", Mcp::Figma));
                            }
                            if mcps.contains(&Mcp::Dbhub) {
                                fields.push(("DBHub API Key", Mcp::Dbhub));
                                fields.push(("DBHub DSN", Mcp::Dbhub));
                            }

                            if app.cursor_pos < fields.len() {
                                let active_mcp = fields[app.cursor_pos].1;
                                app.mcp_skipped.insert(active_mcp);
                                app.credentials.skipped.insert(active_mcp);
                                while app.cursor_pos < fields.len()
                                    && fields[app.cursor_pos].1 == active_mcp
                                {
                                    app.cursor_pos += 1;
                                }
                                if app.cursor_pos == fields.len() {
                                    app.next_stage();
                                }
                            }
                        }
                        (AppFocus::Main, TuiStage::Credentials, KeyCode::Tab)
                        | (AppFocus::Main, TuiStage::Credentials, KeyCode::Down) => {
                            let role = app.sync_args.role.unwrap();
                            let mcps = role.mcps();
                            let mut fields = Vec::new();
                            if mcps.contains(&Mcp::Figma) {
                                fields.push("Figma API Token");
                            }
                            if mcps.contains(&Mcp::Dbhub) {
                                fields.push("DBHub API Key");
                                fields.push("DBHub DSN");
                            }

                            if app.cursor_pos < fields.len() {
                                let field_name = fields[app.cursor_pos].to_string();
                                let val = app.input_buffer.clone();
                                match field_name.as_str() {
                                    "Figma API Token" => app.credentials.figma_token = val.clone(),
                                    "DBHub API Key" => app.credentials.dbhub_key = val.clone(),
                                    "DBHub DSN" => app.credentials.dbhub_dsn = val.clone(),
                                    _ => {}
                                }
                                if !val.trim().is_empty() {
                                    if field_name.contains("Token") || field_name.contains("Key") {
                                        app.validate_field(field_name, val, None);
                                    } else {
                                        app.validation_status.insert(field_name, Status::Success);
                                    }
                                }
                                app.cursor_pos = (app.cursor_pos + 1) % fields.len();
                                let next_field_name = fields[app.cursor_pos].to_string();
                                app.input_buffer = match next_field_name.as_str() {
                                    "Figma API Token" => app.credentials.figma_token.clone(),
                                    "DBHub API Key" => app.credentials.dbhub_key.clone(),
                                    "DBHub DSN" => app.credentials.dbhub_dsn.clone(),
                                    _ => String::new(),
                                };
                            }
                        }
                        (AppFocus::Main, TuiStage::Credentials, KeyCode::BackTab)
                        | (AppFocus::Main, TuiStage::Credentials, KeyCode::Up) => {
                            let role = app.sync_args.role.unwrap();
                            let mcps = role.mcps();
                            let mut fields = Vec::new();
                            if mcps.contains(&Mcp::Figma) {
                                fields.push("Figma API Token");
                            }
                            if mcps.contains(&Mcp::Dbhub) {
                                fields.push("DBHub API Key");
                                fields.push("DBHub DSN");
                            }

                            if app.cursor_pos < fields.len() {
                                let field_name = fields[app.cursor_pos].to_string();
                                let val = app.input_buffer.clone();
                                match field_name.as_str() {
                                    "Figma API Token" => app.credentials.figma_token = val.clone(),
                                    "DBHub API Key" => app.credentials.dbhub_key = val.clone(),
                                    "DBHub DSN" => app.credentials.dbhub_dsn = val.clone(),
                                    _ => {}
                                }
                                if !val.trim().is_empty() {
                                    if field_name.contains("Token") || field_name.contains("Key") {
                                        app.validate_field(field_name, val, None);
                                    } else {
                                        app.validation_status.insert(field_name, Status::Success);
                                    }
                                }
                                if app.cursor_pos == 0 {
                                    app.cursor_pos = fields.len() - 1;
                                } else {
                                    app.cursor_pos -= 1;
                                }
                                let next_field_name = fields[app.cursor_pos].to_string();
                                app.input_buffer = match next_field_name.as_str() {
                                    "Figma API Token" => app.credentials.figma_token.clone(),
                                    "DBHub API Key" => app.credentials.dbhub_key.clone(),
                                    "DBHub DSN" => app.credentials.dbhub_dsn.clone(),
                                    _ => String::new(),
                                };
                            }
                        }
                        (AppFocus::Main, TuiStage::Welcome, KeyCode::Char('q'))
                        | (AppFocus::Main, TuiStage::Welcome, KeyCode::Char('Q')) => {
                            if !app.is_prereq_done {
                                continue;
                            }
                            let idx = app.list_state.selected().unwrap_or(0);
                            if idx >= 3 {
                                app.error_message = Some("This role is coming soon. Please select an active role to proceed.".into());
                            } else {
                                app.sync_args.role = Some(match idx {
                                    0 => Role::Backend,
                                    1 => Role::Frontend,
                                    2 => Role::Fullstack,
                                    _ => unreachable!(),
                                });
                                app.selection_mode = crate::models::SelectionMode::QuickStart;
                                app.next_stage();
                            }
                        }
                        (AppFocus::Main, TuiStage::Components, KeyCode::Char(' ')) => {
                            let idx = app.list_state.selected().unwrap_or(0);
                            let comp = match idx {
                                0 => Component::Skills,
                                1 => Component::Mcps,
                                2 => Component::PrTemplate,
                                3 => Component::Orchestration,
                                _ => unreachable!(),
                            };
                            if let Some(pos) =
                                app.sync_args.components.iter().position(|c| *c == comp)
                            {
                                app.sync_args.components.remove(pos);
                            } else {
                                app.sync_args.components.push(comp);
                            }
                        }
                        (AppFocus::Main, TuiStage::Agents, KeyCode::Char(' ')) => {
                            let idx = app.list_state.selected().unwrap_or(0);
                            let agents = [
                                Agent::ClaudeCode,
                                Agent::Copilot,
                                Agent::Cursor,
                                Agent::Codex,
                                Agent::Gemini,
                            ];
                            let agent = agents[idx];
                            if let Some(pos) = app.sync_args.agents.iter().position(|a| *a == agent)
                            {
                                app.sync_args.agents.remove(pos);
                            } else {
                                app.sync_args.agents.push(agent);
                            }
                        }
                        (AppFocus::Main, TuiStage::Credentials, KeyCode::Char(c)) => {
                            app.input_buffer.push(c);
                        }
                        (AppFocus::Main, TuiStage::Credentials, KeyCode::Backspace) => {
                            app.input_buffer.pop();
                        }
                        (AppFocus::Main, _, KeyCode::Up) => {
                            let i = match app.list_state.selected() {
                                Some(i) => {
                                    if i == 0 {
                                        0
                                    } else {
                                        i - 1
                                    }
                                }
                                None => 0,
                            };
                            app.list_state.select(Some(i));
                        }
                        (AppFocus::Main, _, KeyCode::Down) => {
                            let i = match app.list_state.selected() {
                                Some(i) => i + 1,
                                None => 0,
                            };
                            app.list_state.select(Some(i));
                        }

                        // Enter handling consolidated
                        (AppFocus::Main, stage, KeyCode::Enter) => {
                            match stage {
                                TuiStage::Summary => {
                                    if let Some(_path) = &app.view_file_path {
                                        app.view_file_path = None;
                                        app.view_file_content = None;
                                    } else {
                                        let selected_agents = &app.sync_args.agents;
                                        if let Some(agent) =
                                            selected_agents.get(app.summary_selected_agent)
                                        {
                                            match app.summary_expanded_section {
                                                Some(0) => {
                                                    // Global Instruction
                                                    if let Some(status) =
                                                        app.report.instructions.get(agent)
                                                    {
                                                        let path = status.path();
                                                        if let Ok(content) =
                                                            std::fs::read_to_string(path)
                                                        {
                                                            app.view_file_path =
                                                                Some(path.to_path_buf());
                                                            app.view_file_content = Some(content);
                                                        }
                                                    }
                                                }
                                                Some(3) => {
                                                    // MCP Config
                                                    let path = agent.mcp_config_path(
                                                        &Installer::new().unwrap().home,
                                                    );
                                                    if let Ok(content) =
                                                        std::fs::read_to_string(&path)
                                                    {
                                                        app.view_file_path = Some(path);
                                                        app.view_file_content = Some(content);
                                                    }
                                                }
                                                _ => {
                                                    if app.summary_expanded_section.is_none() {
                                                        app.should_quit = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                TuiStage::Install => {}
                                TuiStage::Welcome => {
                                    if let Some(idx) = app.list_state.selected() {
                                        if idx >= 3 {
                                            app.error_message = Some("This role is coming soon. Please select an active role to proceed.".into());
                                        } else {
                                            app.sync_args.role = Some(match idx {
                                                0 => Role::Backend,
                                                1 => Role::Frontend,
                                                2 => Role::Fullstack,
                                                _ => unreachable!(),
                                            });
                                            app.selection_mode =
                                                crate::models::SelectionMode::Custom;
                                            app.next_stage();
                                        }
                                    } else {
                                        app.error_message =
                                            Some("Please select a role before proceeding.".into());
                                    }
                                }
                                TuiStage::Credentials => {
                                    let role = app.sync_args.role.unwrap_or(Role::Frontend);
                                    let mcps = role.mcps();
                                    let mut fields = Vec::new();
                                    if mcps.contains(&Mcp::Figma) {
                                        fields.push("Figma API Token");
                                    }
                                    if mcps.contains(&Mcp::Dbhub) {
                                        fields.push("DBHub API Key");
                                        fields.push("DBHub DSN");
                                    }

                                    if app.cursor_pos < fields.len() {
                                        if app.input_buffer.trim().is_empty() {
                                            app.error_message = Some("Input cannot be empty. Press Ctrl+X to skip this MCP.".into());
                                        } else {
                                            app.error_message = None;
                                            let field_name = fields[app.cursor_pos].to_string();
                                            let val =
                                                app.input_buffer.drain(..).collect::<String>();
                                            match field_name.as_str() {
                                                "Figma API Token" => {
                                                    app.credentials.figma_token = val.clone()
                                                }
                                                "DBHub API Key" => {
                                                    app.credentials.dbhub_key = val.clone()
                                                }
                                                "DBHub DSN" => {
                                                    app.credentials.dbhub_dsn = val.clone()
                                                }
                                                _ => {}
                                            }
                                            if field_name.contains("Token")
                                                || field_name.contains("Key")
                                            {
                                                app.validate_field(field_name, val, None);
                                            } else {
                                                app.validation_status
                                                    .insert(field_name, Status::Success);
                                            }
                                            app.cursor_pos += 1;
                                            if app.cursor_pos == fields.len() {
                                                app.next_stage();
                                            }
                                        }
                                    } else {
                                        app.next_stage();
                                    }
                                }

                                TuiStage::Components | TuiStage::Agents => {
                                    app.next_stage();
                                }
                            }
                        }
                        _ => {}
                    }
                }
            }
        }
        if last_tick.elapsed() >= tick_rate {
            app.update();
            last_tick = Instant::now();
        }
        if app.should_quit {
            break;
        }
    }
    disable_raw_mode()?;
    io::stdout().execute(LeaveAlternateScreen)?;
    Ok(())
}
