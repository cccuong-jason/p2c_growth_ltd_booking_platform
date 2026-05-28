use crate::app::App;
use std::path::{Path, PathBuf};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum TuiStage {
    Welcome,
    Components,
    Agents,
    Credentials,
    Install,
    Summary,
}

impl TuiStage {
    pub fn is_processed(&self, app: &App) -> bool {
        app.processed_stages.contains(self)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AppFocus {
    Sidebar,
    Main,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SelectionMode {
    QuickStart,
    Custom,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Status {
    Pending,
    Running,
    Success,
    Error(String),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum UserResponse {
    Overwrite,
    Skip,
    Append,
    Merge,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum WriteStatus {
    Created(PathBuf),
    Updated(PathBuf),
    Appended(PathBuf),
    Merged(PathBuf),
    Skipped(PathBuf),
}

impl WriteStatus {
    pub fn label(&self) -> &'static str {
        match self {
            Self::Created(_) => "Added",
            Self::Updated(_) => "Updated",
            Self::Appended(_) => "Appended",
            Self::Merged(_) => "Merged",
            Self::Skipped(_) => "Skipped",
        }
    }
    pub fn path(&self) -> &Path {
        match self {
            Self::Created(p)
            | Self::Updated(p)
            | Self::Appended(p)
            | Self::Merged(p)
            | Self::Skipped(p) => p,
        }
    }
}
