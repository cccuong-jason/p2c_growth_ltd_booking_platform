use ratatui::Frame;
use ratatui::layout::{Constraint, Direction, Layout, Margin};
use ratatui::style::{Color, Style, Stylize};
use ratatui::text::Line;
use ratatui::widgets::{Block, Borders, Padding, Paragraph, Wrap};

use crate::app::App;
use crate::models::{AppFocus, TuiStage};
use crate::utils::centered_rect;

pub mod content;
pub mod popups;
pub mod preview;
pub mod sidebar;

pub fn ui(f: &mut Frame, app: &mut App) {
    let size = f.area();
    let main_area = if size.width > 120 && size.height > 40 {
        centered_rect(70, 70, size)
    } else {
        centered_rect(95, 95, size)
    };

    f.render_widget(
        Block::default()
            .borders(Borders::ALL)
            .border_style(Style::default().fg(Color::DarkGray))
            .title(Line::from(vec![
                " VMS Sync ".bold().blue(),
                " v0.2.0 ".dim(),
            ])),
        main_area,
    );

    let inner_area = main_area.inner(Margin {
        horizontal: 1,
        vertical: 1,
    });
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),
            Constraint::Min(10),
            Constraint::Length(3),
        ])
        .split(inner_area);

    // Header
    f.render_widget(
        Paragraph::new(Line::from(vec![
            " OPSWAT ".bold().bg(Color::Blue).fg(Color::White),
            " MetaDefender AI Harness ".bold().fg(Color::Blue),
        ]))
        .alignment(ratatui::layout::Alignment::Center)
        .block(
            Block::default()
                .borders(Borders::BOTTOM)
                .border_style(Style::default().fg(Color::DarkGray)),
        ),
        chunks[0],
    );

    let show_preview = app.stage >= TuiStage::Components;
    let body_constraints = if show_preview {
        vec![
            Constraint::Length(25),
            Constraint::Min(0),
            Constraint::Length(30),
        ]
    } else {
        vec![Constraint::Length(25), Constraint::Min(0)]
    };
    let body_chunks = Layout::default()
        .direction(Direction::Horizontal)
        .constraints(body_constraints)
        .split(chunks[1]);

    // Sidebar
    sidebar::render(f, app, body_chunks[0]);

    // Main Content
    let stages_labels = ["Welcome", "Setup", "Agents", "Creds", "Install", "Done"];
    let current_idx = app.stage as usize;
    let content_block = Block::default()
        .padding(Padding::new(2, 2, 1, 1))
        .title(format!(
            " Step {}: {} ",
            current_idx + 1,
            stages_labels[current_idx]
        ));
    let inner_content_area = content_block.inner(body_chunks[1]);
    f.render_widget(content_block, body_chunks[1]);

    content::render(f, app, inner_content_area);

    // Preview Panel
    if show_preview {
        preview::render(f, app, body_chunks[2]);
    }

    // Footer
    let footer_text = match (app.focus, app.stage) {
        (AppFocus::Sidebar, _) => "Sidebar: ↑/↓ Move • 1-8 Jump • Enter Select • Esc Back • ? Help",
        (_, TuiStage::Welcome) => {
            "Welcome: Enter Custom Setup • Q Quick Start • Tab Focus • ? Help"
        }
        (_, TuiStage::Components) | (_, TuiStage::Agents) => {
            "Setup: ↑/↓ Move • Space Toggle • Enter Next • Tab Focus • ? Help"
        }
        (_, TuiStage::Credentials) => {
            "Credentials: Type • Enter Next • Ctrl+X Skip • Ctrl+V Secret • Ctrl+E Details • Ctrl+S Focus • ? Help"
        }
        (_, TuiStage::Install) => "Installing... • Tab Focus • ? Help",
        (_, TuiStage::Summary) => {
            "Verification: ←/→ Agent • ↑/↓ Sections • Enter Toggle/Exit • Tab Focus • ? Help"
        }
    };

    f.render_widget(
        Paragraph::new(footer_text)
            .alignment(ratatui::layout::Alignment::Center)
            .wrap(Wrap { trim: true })
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_style(Style::default().fg(Color::DarkGray)),
            ),
        chunks[2],
    );

    // Popups
    if let Some(ref info) = app.conflict {
        popups::render_conflict(f, info, size);
    }

    if let Some(ref err) = app.error_message {
        popups::render_error(f, err, size);
    }

    if app.show_help {
        popups::render_help(f, size);
    }
}
