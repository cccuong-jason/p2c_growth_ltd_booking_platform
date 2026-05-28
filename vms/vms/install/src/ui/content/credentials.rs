use ratatui::Frame;
use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style, Stylize};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Paragraph};

use crate::app::{App, SPINNER};
use crate::models::{Mcp, Status};

pub fn render(f: &mut Frame, app: &App, area: Rect) {
    let mcps = app.sync_args.role.unwrap().mcps();
    let mut fields = Vec::new();
    if mcps.contains(&Mcp::Figma) {
        fields.push("Figma API Token");
    }
    if mcps.contains(&Mcp::Dbhub) {
        fields.push("DBHub API Key");
        fields.push("DBHub DSN");
    }

    let active_mcp = if app.cursor_pos < fields.len() {
        match fields[app.cursor_pos] {
            "Figma API Token" => Some(Mcp::Figma),
            "DBHub API Key" | "DBHub DSN" => Some(Mcp::Dbhub),
            _ => None,
        }
    } else {
        None
    };

    let mut constraints = Vec::new();
    for mcp in mcps {
        constraints.push(Constraint::Length(1)); // Header only
        if active_mcp == Some(*mcp) && !app.mcp_skipped.contains(mcp) {
            let field_count = match mcp {
                Mcp::Atlassian | Mcp::Dbhub => 2,
                Mcp::Figma => 1,
                Mcp::Chrome => 0,
            };
            for _ in 0..field_count {
                constraints.push(Constraint::Length(3)); // Field box
            }
        }
    }
    constraints.push(Constraint::Min(0));

    let field_chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints(constraints)
        .split(area);
    let mut chunk_idx = 0;

    for mcp in mcps {
        let is_expanded = active_mcp == Some(*mcp);
        let is_skipped = app.mcp_skipped.contains(mcp);

        let (icon, title_style) = if is_expanded {
            (
                "▼",
                Style::default()
                    .fg(Color::Yellow)
                    .add_modifier(Modifier::BOLD),
            )
        } else if is_skipped {
            (
                "○",
                Style::default()
                    .fg(Color::DarkGray)
                    .add_modifier(Modifier::DIM),
            )
        } else {
            ("▶", Style::default().fg(Color::DarkGray))
        };

        let mut title_spans = vec![
            Span::styled(format!(" {} ", icon), title_style),
            Span::styled(
                format!("{} SETTINGS", mcp.cli_name().to_uppercase()),
                title_style,
            ),
        ];

        if is_skipped {
            title_spans.push(Span::styled(
                " [SKIPPED]",
                Style::default().fg(Color::DarkGray).italic(),
            ));
        }

        f.render_widget(
            Paragraph::new(Line::from(title_spans)),
            field_chunks[chunk_idx],
        );
        chunk_idx += 1;

        if is_expanded && !is_skipped {
            for (i, field) in fields.iter().enumerate() {
                let field_mcp = match *field {
                    "Atlassian Email" | "Atlassian API Token" => Mcp::Atlassian,
                    "Figma API Token" => Mcp::Figma,
                    "DBHub API Key" | "DBHub DSN" => Mcp::Dbhub,
                    _ => unreachable!(),
                };

                if field_mcp != *mcp {
                    continue;
                }

                let status = app
                    .validation_status
                    .get(*field)
                    .cloned()
                    .unwrap_or(Status::Pending);
                let (sym, sym_style, err_msg) = match status {
                    Status::Pending => ("○", Style::default().fg(Color::DarkGray), None),
                    Status::Running => (
                        SPINNER[app.spinner_idx],
                        Style::default().fg(Color::Blue),
                        None,
                    ),
                    Status::Success => ("✔", Style::default().fg(Color::Green), None),
                    Status::Error(e) => ("✘", Style::default().fg(Color::Red), Some(e)),
                };

                let is_active = i == app.cursor_pos;
                let box_style = if is_active {
                    Style::default().fg(Color::Cyan)
                } else {
                    Style::default().fg(Color::DarkGray)
                };

                let raw_val = if i < app.cursor_pos {
                    match *field {
                        "Atlassian Email" => &app.credentials.atlassian_username,
                        "Atlassian API Token" => &app.credentials.atlassian_token,
                        "Figma API Token" => &app.credentials.figma_token,
                        "DBHub API Key" => &app.credentials.dbhub_key,
                        "DBHub DSN" => &app.credentials.dbhub_dsn,
                        _ => "",
                    }
                } else if is_active {
                    &app.input_buffer
                } else {
                    ""
                };

                let is_secret = field.contains("Token") || field.contains("Key");
                let val = if is_secret && !app.show_secrets && !raw_val.is_empty() {
                    "*".repeat(raw_val.len().min(20))
                } else {
                    raw_val.to_string()
                };

                let cursor = if is_active { "█" } else { "" };

                let mut title_spans = vec![
                    Span::styled(format!(" {} ", sym), sym_style),
                    Span::styled(
                        format!(" {} ", field),
                        if is_active {
                            Style::default().fg(Color::Cyan).bold()
                        } else {
                            Style::default()
                        },
                    ),
                ];
                if let Some(err) = err_msg {
                    let short_err = err
                        .lines()
                        .next()
                        .unwrap_or(err.as_str())
                        .chars()
                        .take(50)
                        .collect::<String>();
                    let elipsis = if err.len() > 50 || err.contains('\n') {
                        "..."
                    } else {
                        ""
                    };
                    title_spans.push(Span::styled(
                        format!(" - {}{} (Ctrl+E details) ", short_err, elipsis),
                        Style::default().fg(Color::Red).italic(),
                    ));
                }

                let input_block = Block::default()
                    .borders(Borders::ALL)
                    .border_style(box_style)
                    .title(Line::from(title_spans));

                f.render_widget(
                    Paragraph::new(format!(" {}{}", val, cursor)).block(input_block),
                    field_chunks[chunk_idx],
                );
                chunk_idx += 1;
            }
        }
    }
}
