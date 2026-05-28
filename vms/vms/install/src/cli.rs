use crate::models::{Agent, AppError, Component, Role};
use clap::{Parser, Subcommand};
use std::collections::BTreeSet;
use std::ffi::OsString;

#[derive(Parser, Debug)]
#[command(name = "vms-sync", version, about = "VMS Cargo-backed installer", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Option<AppCommand>,

    #[arg(long, help = "Agent(s) to install for", value_delimiter = ',')]
    pub agent: Vec<Agent>,

    #[arg(long, help = "Role to configure for")]
    pub role: Option<Role>,

    #[arg(long, help = "Components to install", value_delimiter = ',')]
    pub components: Vec<Component>,

    #[arg(long, help = "Overwrite existing files without asking")]
    pub force: bool,

    #[arg(long, help = "Alias for --force")]
    pub update: bool,
}

#[derive(Subcommand, Clone, Debug, PartialEq, Eq)]
pub enum AppCommand {
    Sync(SyncArgs),
    Doctor,
    Update(SyncArgs),
}

#[derive(Parser, Clone, Debug, Default, PartialEq, Eq)]
pub struct SyncArgs {
    #[arg(long, help = "Agent(s) to install for", value_delimiter = ',')]
    pub agents: Vec<Agent>,

    #[arg(long, help = "Role to configure for")]
    pub role: Option<Role>,

    #[arg(long, help = "Components to install", value_delimiter = ',')]
    pub components: Vec<Component>,

    #[arg(long, help = "Overwrite existing files without asking")]
    pub force: bool,
}

pub fn parse_args<I, T>(iter: I) -> Result<AppCommand, AppError>
where
    I: IntoIterator<Item = T>,
    T: Into<OsString> + Clone,
{
    let cli = Cli::try_parse_from(iter).map_err(|e| AppError::Message(e.to_string()))?;
    let mut cmd = if let Some(command) = cli.command {
        command
    } else {
        AppCommand::Sync(SyncArgs {
            agents: cli.agent,
            role: cli.role,
            components: cli.components,
            force: cli.force || cli.update,
        })
    };

    match &mut cmd {
        AppCommand::Update(args) => {
            args.force = true;
            if args.components.contains(&Component::All) {
                args.components = vec![
                    Component::Skills,
                    Component::Mcps,
                    Component::PrTemplate,
                    Component::Orchestration,
                ];
            }
            dedupe_agents(&mut args.agents);
        }
        AppCommand::Sync(args) => {
            if args.components.contains(&Component::All) {
                args.components = vec![
                    Component::Skills,
                    Component::Mcps,
                    Component::PrTemplate,
                    Component::Orchestration,
                ];
            }
            dedupe_agents(&mut args.agents);
        }
        _ => {}
    }
    Ok(cmd)
}

pub fn parse_components(input: &str) -> Result<BTreeSet<Component>, String> {
    let mut out = BTreeSet::new();
    if input == "all" {
        out.insert(Component::Skills);
        out.insert(Component::Mcps);
        out.insert(Component::PrTemplate);
        out.insert(Component::Orchestration);
        return Ok(out);
    }
    for raw in input.split(',') {
        match raw.trim() {
            "skills" => {
                out.insert(Component::Skills);
            }
            "mcps" => {
                out.insert(Component::Mcps);
            }
            "pr-template" => {
                out.insert(Component::PrTemplate);
            }
            "orchestration" => {
                out.insert(Component::Orchestration);
            }
            "" => {}
            other => return Err(format!("Unknown component: {other}")),
        }
    }
    Ok(out)
}

fn dedupe_agents(agents: &mut Vec<Agent>) {
    let mut seen = BTreeSet::new();
    agents.retain(|agent| seen.insert(*agent));
}

pub fn workflow_plan(sync: &SyncArgs) -> WorkflowPlan {
    let needs_components = sync.components.is_empty();
    let needs_agents = (sync.components.contains(&Component::Skills)
        || sync.components.contains(&Component::Mcps)
        || sync.components.contains(&Component::Orchestration))
        && sync.agents.is_empty();
    let needs_role = sync.components.contains(&Component::Mcps) && sync.role.is_none();
    WorkflowPlan {
        requires_tui: needs_components || needs_agents || needs_role,
        stages: vec!["Welcome", "Setup", "Agents", "Creds", "Install", "Done"],
    }
}

#[derive(Clone, Debug)]
pub struct WorkflowPlan {
    pub requires_tui: bool,
    pub stages: Vec<&'static str>,
}
