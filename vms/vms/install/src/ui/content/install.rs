use ratatui::Frame;
use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, Gauge, List, ListItem};

use crate::app::App;

pub fn render(f: &mut Frame, app: &App, area: Rect) {
    let v = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(3), Constraint::Min(0)])
        .split(area);

    f.render_widget(
        Gauge::default()
            .block(Block::default().borders(Borders::ALL).title(" Progress "))
            .gauge_style(
                Style::default()
                    .fg(Color::Green)
                    .bg(Color::Black)
                    .add_modifier(Modifier::ITALIC),
            )
            .percent((app.install_progress * 100.0) as u16),
        v[0],
    );

    let log_items: Vec<ListItem> = app
        .install_log
        .iter()
        .rev()
        .take(10)
        .map(|line| {
            ListItem::new(Line::from(vec![
                Span::styled(" ok ", Style::default().fg(Color::Green)),
                Span::raw(line.clone()),
            ]))
        })
        .collect();

    f.render_widget(
        List::new(log_items).block(Block::default().title(" Logs ")),
        v[1],
    );
}
