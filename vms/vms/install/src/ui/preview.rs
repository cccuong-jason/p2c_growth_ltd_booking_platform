use ratatui::Frame;
use ratatui::layout::Rect;
use ratatui::style::{Color, Style, Stylize};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Padding, Paragraph, Wrap};

use crate::app::App;
use crate::models::{Mcp, Status, TuiStage};

pub fn render(f: &mut Frame, app: &App, area: Rect) {
    let preview_block = Block::default()
        .borders(Borders::LEFT)
        .border_style(Style::default().fg(Color::DarkGray))
        .padding(Padding::new(1, 1, 1, 0))
        .title(" Preview ");

    let mut preview_lines = Vec::new();

    // Components
    if app.processed_stages.contains(&TuiStage::Components) || app.stage >= TuiStage::Components {
        preview_lines.push(Line::from("Components".bold().cyan()));
        if app.sync_args.components.is_empty() {
            preview_lines.push(Line::from("  None selected".dim()));
        } else {
            for c in &app.sync_args.components {
                preview_lines.push(Line::from(format!("  • {}", c.cli_name())));
            }
        }
        preview_lines.push(Line::from(""));
    }

    // Agents
    if app.processed_stages.contains(&TuiStage::Agents) || app.stage >= TuiStage::Agents {
        preview_lines.push(Line::from("Agents".bold().cyan()));
        if app.sync_args.agents.is_empty() {
            preview_lines.push(Line::from("  None selected".dim()));
        } else {
            for a in &app.sync_args.agents {
                preview_lines.push(Line::from(format!("  • {}", a.label())));
            }
        }
        preview_lines.push(Line::from(""));
    }

    // MCPs
    if app.processed_stages.contains(&TuiStage::Credentials) || app.stage >= TuiStage::Credentials {
        preview_lines.push(Line::from("MCPs".bold().cyan()));
        if let Some(r) = app.sync_args.role {
            let mcps = r.mcps();
            if mcps.is_empty() {
                preview_lines.push(Line::from("  None required".dim()));
            } else {
                for m in mcps {
                    if app.mcp_skipped.contains(m) {
                        preview_lines.push(Line::from(vec![
                            Span::raw(format!("  • {}", m.cli_name())),
                            Span::styled(" (Skipped)", Style::default().dim()),
                        ]));
                    } else if *m == Mcp::Atlassian {
                        preview_lines.push(Line::from(vec![
                            Span::raw(format!("  • {}", m.cli_name())),
                            Span::styled(
                                " (Hosted remote setup)",
                                Style::default().fg(Color::DarkGray),
                            ),
                        ]));
                    } else if *m == Mcp::Chrome {
                        preview_lines.push(Line::from(vec![
                            Span::raw(format!("  • {}", m.cli_name())),
                            Span::styled(
                                " (No verification needed)",
                                Style::default().fg(Color::DarkGray),
                            ),
                        ]));
                    } else {
                        let field_to_check = match m {
                            Mcp::Atlassian => Some("Atlassian API Token"),
                            Mcp::Figma => Some("Figma API Token"),
                            Mcp::Dbhub => Some("DBHub API Key"),
                            _ => None,
                        };

                        if let Some(field) = field_to_check {
                            match app.validation_status.get(field) {
                                Some(Status::Success) => {
                                    preview_lines.push(Line::from(vec![
                                        Span::raw(format!("  • {}", m.cli_name())),
                                        Span::styled(
                                            " (Configured)",
                                            Style::default().fg(Color::Green),
                                        ),
                                    ]));
                                }
                                Some(Status::Error(_)) => {
                                    preview_lines.push(Line::from(vec![
                                        Span::raw(format!("  • {}", m.cli_name())),
                                        Span::styled(" (Failed)", Style::default().fg(Color::Red)),
                                    ]));
                                }
                                _ => {
                                    preview_lines.push(Line::from(vec![
                                        Span::raw(format!("  • {}", m.cli_name())),
                                        Span::styled(
                                            " (Pending)",
                                            Style::default().fg(Color::Yellow),
                                        ),
                                    ]));
                                }
                            }
                        } else {
                            preview_lines.push(Line::from(vec![
                                Span::raw(format!("  • {}", m.cli_name())),
                                Span::styled(" (Pending)", Style::default().fg(Color::Yellow)),
                            ]));
                        }
                    }
                }
            }
        }
    }

    f.render_widget(
        Paragraph::new(preview_lines)
            .block(preview_block)
            .wrap(Wrap { trim: true }),
        area,
    );
}
