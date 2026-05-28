use ratatui::Frame;
use ratatui::layout::Rect;
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{List, ListItem};

use crate::app::App;
use crate::models::Component;

pub fn render(f: &mut Frame, app: &mut App, area: Rect) {
    let items = vec!["Skills", "MCPs", "PR Template", "Orchestration"];
    let list_items: Vec<ListItem> = items
        .iter()
        .map(|i| {
            let comp = match *i {
                "Skills" => Component::Skills,
                "MCPs" => Component::Mcps,
                "PR Template" => Component::PrTemplate,
                "Orchestration" => Component::Orchestration,
                _ => unreachable!(),
            };
            let (check, style) = if app.sync_args.components.contains(&comp) {
                (
                    "✔",
                    Style::default()
                        .fg(Color::Green)
                        .add_modifier(Modifier::BOLD),
                )
            } else {
                ("○", Style::default().fg(Color::DarkGray))
            };
            ListItem::new(Line::from(vec![
                Span::styled(format!(" {} ", check), style),
                Span::raw(*i),
            ]))
        })
        .collect();

    f.render_stateful_widget(
        List::new(list_items).highlight_style(
            Style::default()
                .bg(Color::DarkGray)
                .add_modifier(Modifier::BOLD),
        ),
        area,
        &mut app.list_state,
    );
}
