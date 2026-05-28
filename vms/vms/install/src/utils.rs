use crate::models::{AppError, TuiStage};
use ratatui::layout::{Constraint, Direction, Layout, Rect};
use serde_json::{Map as JsonMap, Value as JsonValue};
use std::fs;
use std::path::Path;
use std::process::Command;

pub fn detect_git_email() -> Option<String> {
    let output = Command::new("git")
        .args(["config", "user.email"])
        .output()
        .ok()?;
    if output.status.success() {
        Some(String::from_utf8_lossy(&output.stdout).trim().to_owned())
    } else {
        None
    }
}

pub fn detect_git_name() -> Option<String> {
    let output = Command::new("git")
        .args(["config", "user.name"])
        .output()
        .ok()?;
    if output.status.success() {
        Some(String::from_utf8_lossy(&output.stdout).trim().to_owned())
    } else {
        None
    }
}

pub fn centered_rect(percent_x: u16, percent_y: u16, r: Rect) -> Rect {
    let popup_layout = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage((100 - percent_y) / 2),
            Constraint::Percentage(percent_y),
            Constraint::Percentage((100 - percent_y) / 2),
        ])
        .split(r);
    Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Percentage((100 - percent_x) / 2),
            Constraint::Percentage(percent_x),
            Constraint::Percentage((100 - percent_x) / 2),
        ])
        .split(popup_layout[1])[1]
}

pub fn read_json_object(path: &Path) -> Result<JsonMap<String, JsonValue>, AppError> {
    let text = fs::read_to_string(path)?;
    match serde_json::from_str::<JsonValue>(&text)? {
        JsonValue::Object(map) => Ok(map),
        _ => Ok(JsonMap::new()),
    }
}

pub fn git_branch_for(cwd: &Path) -> Option<String> {
    let output = Command::new("git")
        .args([
            "-C",
            &cwd.display().to_string(),
            "rev-parse",
            "--abbrev-ref",
            "HEAD",
        ])
        .output()
        .ok()?;
    if !output.status.success() {
        return None;
    }
    let branch = String::from_utf8_lossy(&output.stdout).trim().to_owned();
    if branch.is_empty() || branch == "HEAD" {
        None
    } else {
        Some(branch)
    }
}

pub fn match_stage(idx: usize) -> TuiStage {
    match idx {
        0 => TuiStage::Welcome,
        1 => TuiStage::Components,
        2 => TuiStage::Agents,
        3 => TuiStage::Credentials,
        4 => TuiStage::Install,
        5 => TuiStage::Summary,
        _ => TuiStage::Welcome,
    }
}
