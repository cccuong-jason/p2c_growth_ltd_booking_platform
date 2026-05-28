use crate::models::{InstallReport, Status};
use std::path::PathBuf;

#[derive(Debug)]
pub enum TaskMessage {
    PrereqUpdate(usize, Status),
    PrereqDone(Result<(), String>),
    ValidateUpdate(String, Status),
    InstallUpdate(String, f64),
    Conflict(ConflictInfo),
    InstallDone(Result<InstallReport, String>),
}

#[derive(Debug, Clone)]
pub struct ConflictInfo {
    pub path: PathBuf,
    pub message: String,
    pub can_append: bool,
    pub new_content: String,
}
