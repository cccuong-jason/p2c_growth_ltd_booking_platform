use ratatui::Frame;
use ratatui::layout::Rect;

use crate::app::App;
use crate::models::TuiStage;

pub mod agents;
pub mod components;
pub mod credentials;
pub mod install;
pub mod summary;
pub mod welcome;

pub fn render(f: &mut Frame, app: &mut App, area: Rect) {
    match app.stage {
        TuiStage::Welcome => welcome::render(f, app, area),
        TuiStage::Components => components::render(f, app, area),
        TuiStage::Agents => agents::render(f, app, area),
        TuiStage::Credentials => credentials::render(f, app, area),
        TuiStage::Install => install::render(f, app, area),
        TuiStage::Summary => summary::render(f, app, area),
    }
}
