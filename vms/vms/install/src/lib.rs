pub mod app;
pub mod cli;
pub mod installer;
pub mod models;
pub mod ui;
pub mod utils;

pub use crate::app::App;
pub use crate::cli::{
    AppCommand, SyncArgs, WorkflowPlan, parse_args, parse_components, workflow_plan,
};
pub use crate::installer::Installer;
pub use crate::models::{
    Agent, AppError, AppFocus, Component, Credentials, InstallReport, Mcp, Role, SelectionMode,
    Status, TuiStage, UserResponse, WriteStatus,
};

use crate::app::tui::run_tui;

pub fn run_app() -> Result<(), AppError> {
    let cmd = parse_args(std::env::args())?;
    match cmd {
        AppCommand::Sync(args) | AppCommand::Update(args) => {
            let plan = workflow_plan(&args);
            if plan.requires_tui {
                run_tui(args)
            } else {
                run_sync_headless(args)
            }
        }
        AppCommand::Doctor => {
            println!("doctor is not implemented yet");
            Ok(())
        }
    }
}

pub fn run_sync_headless(_args: crate::cli::SyncArgs) -> Result<(), AppError> {
    let ctx = Installer::new()?;
    ctx.check_prereqs()?;
    // Simplified logic for headless - assume force or simple append
    Ok(())
}
