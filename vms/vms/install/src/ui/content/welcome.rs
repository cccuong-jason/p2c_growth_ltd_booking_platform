use ratatui::Frame;
use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style, Stylize};
use ratatui::text::{Line, Span};
use ratatui::widgets::{List, ListItem, Paragraph, Wrap};

use crate::app::{App, SPINNER};
use crate::models::{Role, Status};
use crate::utils::centered_rect;

pub fn render(f: &mut Frame, app: &mut App, area: Rect) {
    let layout = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(7), // ASCII Art
            Constraint::Length(1), // Spacer
            Constraint::Length(3), // Welcome Header
            Constraint::Min(0),    // Dynamic Content (Prereqs or Role+Keys)
        ])
        .split(area);

    // VMS ASCII Art (Glow Effect using Bold Cyan)
    let ascii = Paragraph::new(vec![
        Line::from(" ██╗   ██╗███╗   ███╗███████╗ ".bold().cyan()),
        Line::from(" ██║   ██║████╗ ████║██╔════╝ ".bold().cyan()),
        Line::from(" ██║   ██║██╔████╔██║███████╗ ".bold().cyan()),
        Line::from(" ╚██╗ ██╔╝██║╚██╔╝██║╚════██║ ".bold().cyan()),
        Line::from("  ╚████╔╝ ██║ ╚═╝ ██║███████║ ".bold().cyan()),
        Line::from("   ╚═══╝  ╚═╝     ╚═╝╚══════╝ ".bold().cyan()),
    ])
    .alignment(ratatui::layout::Alignment::Center);
    f.render_widget(ascii, layout[0]);

    let role_name = match app.sync_args.role {
        Some(Role::Backend) => "Backend ",
        Some(Role::Frontend) => "Frontend ",
        Some(Role::Fullstack) => "Fullstack ",
        Some(Role::DataEngineer) => "Data Engineer ",
        Some(Role::SecurityEngineer) => "Security Engineer ",
        Some(Role::DevOps) => "DevOps ",
        Some(Role::SoftwareInTest) => "Software in Test/QC ",
        None => "",
    };

    let name = app.git_name.as_deref().unwrap_or("Developer");
    let welcome_line = format!("Welcome, {}!", name);
    let harness_line = format!("to the VMS MetaDefender AI Harness {}Setup.", role_name);

    let header = Paragraph::new(vec![Line::from(vec![
        Span::styled(welcome_line, Style::default().bold().cyan()),
        Span::raw(" "),
        Span::styled(harness_line, Style::default().fg(Color::DarkGray)),
    ])])
    .alignment(ratatui::layout::Alignment::Center);
    f.render_widget(header, layout[2]);

    if !app.is_prereq_done {
        // Phase A: Initializing (Prerequisites)
        let prereq_area = centered_rect(50, 100, layout[3]);
        let items: Vec<ListItem> = app
            .prereq_status
            .iter()
            .map(|(name, status)| {
                let (sym, style) = match status {
                    Status::Pending => ("○", Style::default().fg(Color::DarkGray)),
                    Status::Running => (SPINNER[app.spinner_idx], Style::default().fg(Color::Blue)),
                    Status::Success => ("✔", Style::default().fg(Color::Green)),
                    Status::Error(_) => ("✘", Style::default().fg(Color::Red)),
                };
                ListItem::new(Line::from(vec![
                    Span::styled(format!(" {} ", sym), style),
                    Span::raw(name.clone()),
                ]))
            })
            .collect();
        f.render_widget(List::new(items), prereq_area);
    } else {
        // Phase B: Ready (Role Selection & Keybindings)
        let dynamic_layout = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Length(8), // Role selection
                Constraint::Length(2), // Spacer
                Constraint::Length(6), // Keybindings
                Constraint::Min(0),    // Description
            ])
            .split(layout[3]);

        // Role List
        let items = [
            ("Backend", false),
            ("Frontend", false),
            ("Fullstack", false),
            ("Data Engineer", true),
            ("Security Engineer", true),
            ("DevOps", true),
            ("Software in Test/QC", true),
        ];
        let idx = app.list_state.selected();

        let list_items: Vec<ListItem> = items
            .iter()
            .enumerate()
            .map(|(i, (label, coming_soon))| {
                let prefix = if Some(i) == idx { " ▶ " } else { "   " };
                if *coming_soon {
                    ListItem::new(format!("{prefix}{label} (Coming Soon)"))
                        .style(Style::default().dim())
                } else {
                    let style = if Some(i) == idx {
                        Style::default().fg(Color::Cyan).bold()
                    } else {
                        Style::default()
                    };
                    ListItem::new(Line::from(vec![
                        Span::styled(prefix, Style::default().fg(Color::Cyan)),
                        Span::styled(*label, style),
                    ]))
                }
            })
            .collect();

        let role_area = centered_rect(50, 100, dynamic_layout[0]);
        f.render_stateful_widget(
            List::new(list_items).highlight_style(
                Style::default()
                    .bg(Color::DarkGray)
                    .add_modifier(Modifier::BOLD),
            ),
            role_area,
            &mut app.list_state,
        );

        // Neovim-style Keybindings (Aligned Columns)
        let keybindings_area = centered_rect(50, 100, dynamic_layout[2]);
        let keybindings = Paragraph::new(vec![
            Line::from(vec![
                Span::styled(" [Enter] ", Style::default().bold().yellow()),
                Span::styled(
                    " Begin Custom Setup ",
                    Style::default().add_modifier(Modifier::DIM),
                ),
            ]),
            Line::from(vec![
                Span::styled(" [Q]     ", Style::default().bold().yellow()),
                Span::styled(
                    " Quick Start (Recommended) ",
                    Style::default().add_modifier(Modifier::DIM),
                ),
            ]),
            Line::from(vec![
                Span::styled(" [Tab]   ", Style::default().bold().yellow()),
                Span::styled(
                    " Toggle Sidebar Focus ",
                    Style::default().add_modifier(Modifier::DIM),
                ),
            ]),
            Line::from(vec![
                Span::styled(" [?]     ", Style::default().bold().yellow()),
                Span::styled(
                    " View Help Navigation ",
                    Style::default().add_modifier(Modifier::DIM),
                ),
            ]),
        ]);
        f.render_widget(keybindings, keybindings_area);

        let description = Paragraph::new(vec![
            Line::from(""),
            Line::from(
                "This tool will configure your local environment, install necessary skills,"
                    .fg(Color::DarkGray),
            ),
            Line::from(
                "and set up MCP credentials across your preferred AI agents.".fg(Color::DarkGray),
            ),
        ])
        .alignment(ratatui::layout::Alignment::Center)
        .wrap(Wrap { trim: true });
        f.render_widget(description, dynamic_layout[3]);
    }
}
