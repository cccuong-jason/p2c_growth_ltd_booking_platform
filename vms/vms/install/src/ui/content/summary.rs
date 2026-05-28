use ratatui::Frame;
use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Style, Stylize};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Clear, Paragraph, Wrap};

use crate::app::App;
use crate::models::WriteStatus;
use crate::utils::centered_rect;

pub fn render(f: &mut Frame, app: &App, area: Rect) {
    let selected_agents = &app.sync_args.agents;
    if selected_agents.is_empty() {
        f.render_widget(
            Paragraph::new("No agents were selected for installation.".red()),
            area,
        );
        return;
    }

    let mut tabs_list = Vec::new();
    for (i, agent) in selected_agents.iter().enumerate() {
        let style = if i == app.summary_selected_agent {
            Style::default().fg(Color::Cyan).bold()
        } else {
            Style::default().dim()
        };
        tabs_list.push(Span::styled(format!(" {} ", agent.label()), style));
        if i < selected_agents.len() - 1 {
            tabs_list.push(Span::raw(" │ "));
        }
    }

    let v_chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(3), Constraint::Min(0)])
        .split(area);

    f.render_widget(
        Paragraph::new(Line::from(tabs_list)).block(
            Block::default()
                .borders(Borders::BOTTOM)
                .title(" Agent Verification (←/→) "),
        ),
        v_chunks[0],
    );

    let agent = selected_agents[app.summary_selected_agent];
    let mut summary_items = Vec::new();

    // 1. Global Instruction File
    let inst_status = app.report.instructions.get(&agent);
    let inst_label = inst_status.map(|s| s.label()).unwrap_or("Pending");
    let inst_title = format!(" Global Instruction File: {}", inst_label);
    let inst_style = if app.summary_expanded_section == Some(0) {
        Style::default().fg(Color::Yellow).bold()
    } else {
        Style::default()
    };
    summary_items.push(Line::from(vec![
        Span::styled(
            if app.summary_expanded_section == Some(0) {
                " ▼"
            } else {
                " ▶"
            },
            inst_style,
        ),
        Span::styled(inst_title, inst_style),
    ]));

    if app.summary_expanded_section == Some(0) {
        if let Some(s) = inst_status {
            summary_items.push(Line::from(
                format!("    Path: {}", s.path().display()).dim(),
            ));
            summary_items.push(Line::from(
                "    (Press Enter to view content)".cyan().italic(),
            ));
        }
        summary_items.push(Line::from(""));
    }

    // 2. Skill List
    let skill_results = app.report.skills.get(&agent);
    let skill_count = skill_results.map(|v| v.len()).unwrap_or(0);
    let skill_title = format!(" Installed Skills: {} total", skill_count);
    let skill_style = if app.summary_expanded_section == Some(1) {
        Style::default().fg(Color::Yellow).bold()
    } else {
        Style::default()
    };
    summary_items.push(Line::from(vec![
        Span::styled(
            if app.summary_expanded_section == Some(1) {
                " ▼"
            } else {
                " ▶"
            },
            skill_style,
        ),
        Span::styled(skill_title, skill_style),
    ]));

    if app.summary_expanded_section == Some(1) {
        if let Some(results) = skill_results {
            for (name, status) in results {
                summary_items.push(Line::from(vec![
                    Span::raw("    • "),
                    Span::raw(format!("{:<30} ", name)),
                    Span::styled(
                        format!("[{}]", status.label()),
                        if matches!(status, WriteStatus::Created(_) | WriteStatus::Merged(_)) {
                            Style::default().fg(Color::Green)
                        } else {
                            Style::default().dim()
                        },
                    ),
                ]));
            }
        }
        summary_items.push(Line::from(""));
    }

    // 3. Orchestration Projection
    let orchestration_results = app.report.orchestration.get(&agent);
    let orchestration_count = orchestration_results.map(|v| v.len()).unwrap_or(0);
    let orchestration_title = format!(" Orchestration Projection: {} files", orchestration_count);
    let orchestration_style = if app.summary_expanded_section == Some(2) {
        Style::default().fg(Color::Yellow).bold()
    } else {
        Style::default()
    };
    summary_items.push(Line::from(vec![
        Span::styled(
            if app.summary_expanded_section == Some(2) {
                " ▼"
            } else {
                " ▶"
            },
            orchestration_style,
        ),
        Span::styled(orchestration_title, orchestration_style),
    ]));

    if app.summary_expanded_section == Some(2) {
        if let Some(results) = orchestration_results {
            for (name, status) in results {
                summary_items.push(Line::from(vec![
                    Span::raw("    • "),
                    Span::raw(format!("{:<30} ", name)),
                    Span::styled(
                        format!("[{}]", status.label()),
                        Style::default().fg(Color::Green),
                    ),
                    Span::raw(format!(" {}", status.path().display())).dim(),
                ]));
            }
        }
        summary_items.push(Line::from(""));
    }

    // 4. MCP List
    let mcp_status = app.report.mcps.get(&agent);
    let mcp_label = mcp_status.map(|s| s.label()).unwrap_or("Pending");
    let mcp_title = format!(" MCP Configuration: {}", mcp_label);
    let mcp_style = if app.summary_expanded_section == Some(3) {
        Style::default().fg(Color::Yellow).bold()
    } else {
        Style::default()
    };
    summary_items.push(Line::from(vec![
        Span::styled(
            if app.summary_expanded_section == Some(3) {
                " ▼"
            } else {
                " ▶"
            },
            mcp_style,
        ),
        Span::styled(mcp_title, mcp_style),
    ]));

    if app.summary_expanded_section == Some(3) {
        if let Some(role) = app.sync_args.role {
            summary_items.push(Line::from(
                "    (Press Enter to view configuration)".cyan().italic(),
            ));
            for mcp in role.mcps() {
                let is_skipped = app.mcp_skipped.contains(mcp);
                summary_items.push(Line::from(vec![
                    Span::raw("    • "),
                    Span::raw(format!("{:<15} ", mcp.cli_name())),
                    if is_skipped {
                        Span::styled("(Skipped)", Style::default().dim())
                    } else {
                        Span::styled("(Configured)", Style::default().fg(Color::Green))
                    },
                ]));
            }
        }
        summary_items.push(Line::from(""));
    }

    if !app.report.orchestration_runtime.is_empty() {
        summary_items.push(Line::from(""));
        summary_items.push(Line::from(" Orchestration Runtime".bold().green()));
        for (name, status) in &app.report.orchestration_runtime {
            summary_items.push(Line::from(vec![
                Span::raw("    • "),
                Span::raw(format!("{:<30} ", name)),
                Span::styled(
                    format!("[{}]", status.label()),
                    Style::default().fg(Color::Green),
                ),
                Span::raw(format!(" {}", status.path().display())).dim(),
            ]));
        }
    }

    // PR Template (Separate if installed)
    if let Some(ref status) = app.report.pr_template {
        summary_items.push(Line::from(""));
        summary_items.push(Line::from(vec![
            Span::styled(" ✔ PR Template: ", Style::default().bold().green()),
            Span::raw(status.label()),
            Span::raw(format!(" ({})", status.path().display())).dim(),
        ]));
    }

    f.render_widget(
        Paragraph::new(summary_items).wrap(Wrap { trim: true }),
        v_chunks[1],
    );

    // File Content Viewer Popup
    if let (Some(path), Some(content)) = (&app.view_file_path, &app.view_file_content) {
        let area = centered_rect(80, 80, area);
        f.render_widget(Clear, area);
        let block = Block::default()
            .title(format!(" Viewing File: {} ", path.display()))
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::Cyan));

        f.render_widget(
            Paragraph::new(content.as_str())
                .block(block)
                .wrap(Wrap { trim: false }),
            area,
        );

        // Help hint for closing the viewer
        let help_area = Rect {
            x: area.x + 2,
            y: area.y + area.height - 1,
            width: area.width - 4,
            height: 1,
        };
        f.render_widget(
            Paragraph::new(" Press Esc or Enter to close ".dim().italic()),
            help_area,
        );
    }
}
