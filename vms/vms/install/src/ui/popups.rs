use ratatui::Frame;
use ratatui::layout::Rect;
use ratatui::style::{Color, Style, Stylize};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Clear, Padding, Paragraph, Wrap};

use crate::app::tasks::ConflictInfo;
use crate::utils::centered_rect;

pub fn render_conflict(f: &mut Frame, info: &ConflictInfo, size: Rect) {
    let area = centered_rect(60, 30, size);
    f.render_widget(Clear, area);
    let block = Block::default()
        .title(" Conflict Detected ")
        .borders(Borders::ALL)
        .border_style(Style::default().fg(Color::Yellow))
        .padding(Padding::new(1, 1, 1, 1));

    let mut text = vec![
        Line::from(format!("File: {}", info.path.display()).bold()),
        Line::from(info.message.clone()),
        Line::from(""),
        Line::from("Choose action:"),
        Line::from(vec![
            Span::styled(" [O] ", Style::default().bold().green()),
            Span::raw("Overwrite "),
        ]),
        Line::from(vec![
            Span::styled(" [S] ", Style::default().bold().yellow()),
            Span::raw("Skip "),
        ]),
        Line::from(vec![
            Span::styled(" [M] ", Style::default().bold().magenta()),
            Span::raw("Merge manually (vimdiff) "),
        ]),
    ];
    if info.can_append {
        text.push(Line::from(vec![
            Span::styled(" [A] ", Style::default().bold().blue()),
            Span::raw("Append (VMS section) "),
        ]));
    }
    f.render_widget(
        Paragraph::new(text).block(block).wrap(Wrap { trim: true }),
        area,
    );
}

pub fn render_error(f: &mut Frame, err: &str, size: Rect) {
    let area = centered_rect(60, 20, size);
    f.render_widget(Clear, area);
    let block = Block::default()
        .title(" Error ")
        .borders(Borders::ALL)
        .border_style(Style::default().fg(Color::Red));
    f.render_widget(
        Paragraph::new(err.to_string().red())
            .block(block)
            .wrap(Wrap { trim: true }),
        area,
    );
}

pub fn render_help(f: &mut Frame, size: Rect) {
    let area = centered_rect(50, 50, size);
    f.render_widget(Clear, area);
    let block = Block::default()
        .title(" Help Navigation ")
        .borders(Borders::ALL)
        .border_style(Style::default().fg(Color::Cyan));
    let help_lines = vec![
        Line::from("Navigation:"),
        Line::from("  Tab / Right: Next Step"),
        Line::from("  Shift+Tab / Left: Previous Step"),
        Line::from("  Up / Down: Move Selection"),
        Line::from("  Space: Toggle Selection"),
        Line::from("  Enter: Confirm/Next"),
        Line::from("  Esc / Ctrl+C: Quit"),
        Line::from(""),
        Line::from("Press Any Key to close this help."),
    ];
    f.render_widget(Paragraph::new(help_lines).block(block), area);
}
