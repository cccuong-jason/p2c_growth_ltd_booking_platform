use ratatui::Frame;
use ratatui::layout::Rect;
use ratatui::style::{Color, Modifier, Style, Stylize};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, Borders, List, ListItem, Padding};

use crate::app::App;
use crate::models::AppFocus;

pub fn render(f: &mut Frame, app: &App, area: Rect) {
    let stages_labels = ["Welcome", "Setup", "Agents", "Creds", "Install", "Done"];
    let current_idx = app.stage as usize;
    let sidebar_focused = app.focus == AppFocus::Sidebar;

    let stepper_items: Vec<ListItem> = stages_labels
        .iter()
        .enumerate()
        .map(|(i, label)| {
            let is_current = i == current_idx;
            let (prefix, mut style) = if is_current {
                (
                    " ● ",
                    Style::default()
                        .fg(Color::Yellow)
                        .add_modifier(Modifier::BOLD),
                )
            } else if i < current_idx {
                (" ✔ ", Style::default().fg(Color::Green))
            } else {
                (" ○ ", Style::default().fg(Color::DarkGray))
            };

            if is_current && sidebar_focused {
                style = style.bg(Color::DarkGray).fg(Color::Cyan);
            }

            ListItem::new(Line::from(vec![
                Span::styled(prefix, style),
                Span::styled(format!("{:02} {}", i + 1, *label), style),
            ]))
        })
        .collect();

    let sidebar_block = Block::default()
        .borders(Borders::RIGHT)
        .border_style(Style::default().fg(if sidebar_focused {
            Color::Cyan
        } else {
            Color::DarkGray
        }))
        .padding(Padding::new(1, 1, 1, 0))
        .title(Line::from(vec![
            " Progress ".into(),
            if sidebar_focused {
                " [FOCUS] ".bold().cyan()
            } else {
                "".into()
            },
        ]));

    f.render_widget(List::new(stepper_items).block(sidebar_block), area);
}
