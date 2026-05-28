use ratatui::widgets::ListState;
use std::collections::{BTreeMap, BTreeSet};
use std::sync::mpsc::{self, Receiver, Sender};
use std::thread;

use crate::app::tasks::ConflictInfo;
use crate::app::tasks::TaskMessage;
use crate::cli::SyncArgs;
use crate::installer::{Installer, REPO};
use crate::models::{
    Agent, AppError, AppFocus, Component, Credentials, InstallReport, Mcp, Role, SelectionMode,
    Status, TuiStage, UserResponse,
};
use crate::utils::detect_git_name;

pub mod tasks;
pub mod tui;

pub struct App {
    pub stage: TuiStage,
    pub focus: AppFocus,
    pub selection_mode: SelectionMode,
    pub sync_args: SyncArgs,
    pub credentials: Credentials,
    pub list_state: ListState,
    pub input_buffer: String,
    pub cursor_pos: usize,
    pub tx: Sender<TaskMessage>,
    pub rx: Receiver<TaskMessage>,
    pub resp_tx: Sender<UserResponse>,
    pub resp_rx: Option<Receiver<UserResponse>>,
    pub prereq_status: Vec<(String, Status)>,
    pub validation_status: BTreeMap<String, Status>,
    pub install_log: Vec<String>,
    pub install_progress: f64,
    pub report: InstallReport,
    pub spinner_idx: usize,
    pub should_quit: bool,
    pub show_help: bool,
    pub error_message: Option<String>,
    pub conflict: Option<ConflictInfo>,
    pub is_installing: bool,
    pub processed_stages: BTreeSet<TuiStage>,
    pub mcp_skipped: BTreeSet<Mcp>,
    pub show_secrets: bool,
    pub git_name: Option<String>,
    pub summary_selected_agent: usize,
    pub summary_expanded_section: Option<usize>, // 0=Instructions, 1=Skills, 2=Orchestration, 3=MCPs
    pub view_file_path: Option<std::path::PathBuf>,
    pub view_file_content: Option<String>,
    pub is_prereq_done: bool,
}

pub const SPINNER: &[&str] = &["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

impl App {
    pub fn new(args: SyncArgs) -> Self {
        let (tx, rx) = mpsc::channel();
        let (resp_tx, resp_rx) = mpsc::channel();
        let app = Self {
            stage: TuiStage::Welcome,
            focus: AppFocus::Main,
            selection_mode: SelectionMode::QuickStart,
            sync_args: args,
            credentials: Credentials::default(),
            list_state: ListState::default(),
            input_buffer: String::new(),
            cursor_pos: 0,
            tx,
            rx,
            resp_tx,
            resp_rx: Some(resp_rx),
            prereq_status: vec![
                ("Check gh CLI".into(), Status::Pending),
                ("Check gh Auth".into(), Status::Pending),
                ("Check Repo Access".into(), Status::Pending),
            ],
            validation_status: BTreeMap::new(),
            install_log: Vec::new(),
            install_progress: 0.0,
            report: InstallReport::default(),
            spinner_idx: 0,
            should_quit: false,
            show_help: false,
            error_message: None,
            conflict: None,
            is_installing: false,
            processed_stages: BTreeSet::new(),
            mcp_skipped: BTreeSet::new(),
            show_secrets: false,
            git_name: detect_git_name(),
            summary_selected_agent: 0,
            summary_expanded_section: None,
            view_file_path: None,
            view_file_content: None,
            is_prereq_done: false,
        };
        app.start_prereqs();
        app
    }

    fn start_prereqs(&self) {
        let tx = self.tx.clone();
        thread::spawn(move || {
            let installer = match Installer::new() {
                Ok(i) => i,
                Err(e) => {
                    tx.send(TaskMessage::PrereqDone(Err(e.to_string()))).ok();
                    return;
                }
            };
            tx.send(TaskMessage::PrereqUpdate(0, Status::Running)).ok();
            match installer.ensure_command("gh", "gh CLI not found") {
                Ok(_) => tx.send(TaskMessage::PrereqUpdate(0, Status::Success)).ok(),
                Err(e) => {
                    tx.send(TaskMessage::PrereqUpdate(0, Status::Error(e.to_string())))
                        .ok();
                    tx.send(TaskMessage::PrereqDone(Err(e.to_string()))).ok();
                    return;
                }
            };
            tx.send(TaskMessage::PrereqUpdate(1, Status::Running)).ok();
            match installer.run_checked("gh", &["auth", "status"], "gh not authenticated") {
                Ok(_) => tx.send(TaskMessage::PrereqUpdate(1, Status::Success)).ok(),
                Err(e) => {
                    tx.send(TaskMessage::PrereqUpdate(1, Status::Error(e.to_string())))
                        .ok();
                    tx.send(TaskMessage::PrereqDone(Err(e.to_string()))).ok();
                    return;
                }
            };
            tx.send(TaskMessage::PrereqUpdate(2, Status::Running)).ok();
            match installer.run_checked(
                "gh",
                &["api", &format!("repos/{REPO}"), "--silent"],
                "No access",
            ) {
                Ok(_) => tx.send(TaskMessage::PrereqUpdate(2, Status::Success)).ok(),
                Err(e) => {
                    tx.send(TaskMessage::PrereqUpdate(2, Status::Error(e.to_string())))
                        .ok();
                    tx.send(TaskMessage::PrereqDone(Err(e.to_string()))).ok();
                    return;
                }
            };
            tx.send(TaskMessage::PrereqDone(Ok(()))).ok();
        });
    }

    pub fn toggle_focus(&mut self) {
        self.focus = match self.focus {
            AppFocus::Main => AppFocus::Sidebar,
            AppFocus::Sidebar => AppFocus::Main,
        };
    }

    pub fn set_stage(&mut self, stage: TuiStage) {
        self.stage = stage;
        if stage == TuiStage::Welcome {
            self.list_state.select(None);
        } else {
            self.list_state.select(Some(0));
        }
    }

    pub fn validate_field(&self, field: String, value: String, username: Option<String>) {
        let tx = self.tx.clone();
        thread::spawn(move || {
            tx.send(TaskMessage::ValidateUpdate(field.clone(), Status::Running))
                .ok();

            let res = match field.as_str() {
                "Atlassian API Token" => {
                    let user = username.unwrap_or_default().trim().to_string();
                    let val_trimmed = value.trim().to_string();
                    let output = std::process::Command::new("curl")
                        .args([
                            "-s",
                            "-w",
                            "\n%{http_code}",
                            "-H",
                            "Accept: application/json",
                            "-u",
                            &format!("{}:{}", user, val_trimmed),
                            "https://opswat.atlassian.net/rest/api/3/myself",
                        ])
                        .output();

                    match output {
                        Ok(o) if o.status.success() => {
                            let text = String::from_utf8_lossy(&o.stdout);
                            let lines: Vec<&str> = text.lines().collect();
                            let code = lines.last().unwrap_or(&"0");
                            if *code == "200" {
                                Ok(())
                            } else {
                                let body = lines[..lines.len().saturating_sub(1)].join("\n");
                                Err(format!("HTTP {} [User: {}] - {}", code, user, body))
                            }
                        }
                        Ok(_) | Err(_) => Err("Connection failed".into()),
                    }
                }
                "Figma API Token" => {
                    let val_trimmed = value.trim().to_string();
                    let output = std::process::Command::new("curl")
                        .args([
                            "-s",
                            "-w",
                            "\n%{http_code}",
                            "-H",
                            &format!("X-Figma-Token: {}", val_trimmed),
                            "https://api.figma.com/v1/me",
                        ])
                        .output();

                    match output {
                        Ok(o) if o.status.success() => {
                            let text = String::from_utf8_lossy(&o.stdout);
                            let lines: Vec<&str> = text.lines().collect();
                            let code = lines.last().unwrap_or(&"0");
                            if *code == "200" {
                                Ok(())
                            } else {
                                let body = lines[..lines.len().saturating_sub(1)].join("\n");
                                Err(format!("HTTP {} - {}", code, body))
                            }
                        }
                        Ok(_) | Err(_) => Err("Connection failed".into()),
                    }
                }
                _ => Ok(()),
            };

            match res {
                Ok(_) => tx
                    .send(TaskMessage::ValidateUpdate(field, Status::Success))
                    .ok(),
                Err(e) => tx
                    .send(TaskMessage::ValidateUpdate(field, Status::Error(e)))
                    .ok(),
            };
        });
    }

    pub fn start_install(&mut self) {
        self.is_installing = true;
        let tx = self.tx.clone();
        let resp_rx = self.resp_rx.take().expect("resp_rx already taken");

        let args = self.sync_args.clone();
        let creds = self.credentials.clone();

        thread::spawn(move || {
            let res = (|| -> Result<InstallReport, AppError> {
                let installer = Installer::new()?;
                let mut report = InstallReport::default();

                let mut progress = 0.0;
                let components = &args.components;

                // Calculate total steps for progress bar
                let mut total_steps = 0;
                if components.contains(&Component::PrTemplate) {
                    total_steps += 1;
                }
                total_steps += args.agents.len(); // Instructions
                if components.contains(&Component::Skills) {
                    total_steps += 1; // Load skills
                    total_steps += args.agents.len();
                }
                if components.contains(&Component::Orchestration) {
                    total_steps += 1; // Shared runtime projection
                    total_steps += args.agents.len(); // Agent-specific wrappers
                }
                if components.contains(&Component::Mcps) {
                    total_steps += args.agents.len();
                }

                let step_weight = 1.0 / total_steps.max(1) as f64;

                if components.contains(&Component::PrTemplate) {
                    tx.send(TaskMessage::InstallUpdate(
                        "Installing PR Template...".into(),
                        progress,
                    ))
                    .ok();
                    let status = installer.install_pr_template(args.force, &tx, &resp_rx)?;
                    report.pr_template = Some(status);
                    progress += step_weight;
                }

                let skills_to_install = if components.contains(&Component::Skills) {
                    tx.send(TaskMessage::InstallUpdate(
                        "Discovering skills from GitHub...".into(),
                        progress,
                    ))
                    .ok();
                    let s = installer.load_skills()?;
                    progress += step_weight;
                    s
                } else {
                    Vec::new()
                };

                if components.contains(&Component::Orchestration) {
                    tx.send(TaskMessage::InstallUpdate(
                        "Installing shared orchestration runtime...".into(),
                        progress,
                    ))
                    .ok();
                    report.orchestration_runtime =
                        installer.install_orchestration_runtime(args.force, &tx, &resp_rx)?;
                    progress += step_weight;
                }

                tx.send(TaskMessage::InstallUpdate(
                    "Fetching global instructions...".into(),
                    progress,
                ))
                .ok();
                let global_instructions = installer.fetch_global_instructions(&args.agents)?;

                for agent in &args.agents {
                    tx.send(TaskMessage::InstallUpdate(
                        format!("Writing instructions for {}...", agent.label()),
                        progress,
                    ))
                    .ok();
                    let status = installer.write_instruction(
                        *agent,
                        &global_instructions[agent],
                        args.force,
                        &tx,
                        &resp_rx,
                    )?;
                    report.instructions.insert(*agent, status);
                    progress += step_weight;

                    if components.contains(&Component::Skills) {
                        tx.send(TaskMessage::InstallUpdate(
                            format!("Installing skills for {}...", agent.label()),
                            progress,
                        ))
                        .ok();
                        let results = installer.install_skills(
                            *agent,
                            &skills_to_install,
                            args.force,
                            &tx,
                            &resp_rx,
                        )?;
                        report.skills.insert(*agent, results);
                        progress += step_weight;
                    }

                    if components.contains(&Component::Orchestration) {
                        tx.send(TaskMessage::InstallUpdate(
                            format!("Projecting orchestration for {}...", agent.label()),
                            progress,
                        ))
                        .ok();
                        let results = installer
                            .install_orchestration_projection(*agent, args.force, &tx, &resp_rx)?;
                        report.orchestration.insert(*agent, results);
                        progress += step_weight;
                    }

                    if components.contains(&Component::Mcps) {
                        if let Some(role) = args.role {
                            tx.send(TaskMessage::InstallUpdate(
                                format!("Merging MCP configs for {}...", agent.label()),
                                progress,
                            ))
                            .ok();
                            let status =
                                installer.install_mcps(*agent, role, &creds, &tx, &resp_rx)?;
                            report.mcps.insert(*agent, status);
                        }
                        progress += step_weight;
                    }
                }

                Ok(report)
            })();

            match res {
                Ok(report) => tx.send(TaskMessage::InstallDone(Ok(report))).ok(),
                Err(e) => tx
                    .send(TaskMessage::InstallDone(Err::<InstallReport, String>(
                        e.to_string(),
                    )))
                    .ok(),
            };
        });
    }

    pub fn update(&mut self) {
        while let Ok(msg) = self.rx.try_recv() {
            match msg {
                TaskMessage::PrereqUpdate(idx, status) => {
                    self.prereq_status[idx].1 = status;
                }
                TaskMessage::PrereqDone(res) => {
                    if let Err(e) = res {
                        self.error_message = Some(e);
                    } else {
                        self.is_prereq_done = true;
                    }
                }
                TaskMessage::ValidateUpdate(field, status) => {
                    self.validation_status.insert(field, status);
                }
                TaskMessage::InstallUpdate(msg, prog) => {
                    self.install_log.push(msg);
                    self.install_progress = prog;
                }
                TaskMessage::Conflict(info) => {
                    self.conflict = Some(info);
                }
                TaskMessage::InstallDone(res) => match res {
                    Ok(rep) => {
                        self.report = rep;
                        self.next_stage();
                    }
                    Err(e) => {
                        self.error_message = Some(format!("Installation failed: {}", e));
                    }
                },
            }
        }
        self.spinner_idx = (self.spinner_idx + 1) % SPINNER.len();
    }

    pub fn try_set_stage(&mut self, target: TuiStage) {
        if target > self.stage {
            // Forward navigation: validate current stage
            self.error_message = None;
            match self.stage {
                TuiStage::Welcome => {
                    if self.sync_args.role.is_none() {
                        self.error_message = Some("A role must be selected to proceed.".into());
                        return;
                    }
                }
                TuiStage::Components => {
                    if self.sync_args.components.is_empty() {
                        self.error_message =
                            Some("At least one component must be selected.".into());
                        return;
                    }
                }
                TuiStage::Agents => {
                    let needs_agents = self.sync_args.components.contains(&Component::Skills)
                        || self.sync_args.components.contains(&Component::Mcps)
                        || self
                            .sync_args
                            .components
                            .contains(&Component::Orchestration);
                    if needs_agents && self.sync_args.agents.is_empty() {
                        self.error_message = Some(
                            "At least one agent is required for the chosen components.".into(),
                        );
                        return;
                    }
                }
                TuiStage::Credentials => {
                    let role = self.sync_args.role.unwrap_or(Role::Frontend);
                    let mcps = role.mcps();
                    let mut fields = Vec::new();
                    if mcps.contains(&Mcp::Figma) {
                        fields.push("Figma API Token");
                    }
                    if mcps.contains(&Mcp::Dbhub) {
                        fields.push("DBHub API Key");
                        fields.push("DBHub DSN");
                    }

                    for field in &fields {
                        let mcp = match *field {
                            "Figma API Token" => Mcp::Figma,
                            "DBHub API Key" | "DBHub DSN" => Mcp::Dbhub,
                            _ => unreachable!(),
                        };
                        if !self.mcp_skipped.contains(&mcp) {
                            let status = self
                                .validation_status
                                .get(*field)
                                .cloned()
                                .unwrap_or(Status::Pending);
                            if !matches!(status, Status::Success) {
                                self.error_message = Some(format!(
                                    "Please provide valid input for {}, or press Ctrl+X to skip.",
                                    field
                                ));
                                self.cursor_pos =
                                    fields.iter().position(|f| f == field).unwrap_or(0);
                                return;
                            }
                        }
                    }
                }
                _ => {}
            }

            // Mark current stage as processed only after successful validation when moving forward
            self.processed_stages.insert(self.stage);
        }

        self.error_message = None;

        if self.stage == TuiStage::Welcome && target > TuiStage::Welcome {
            if self.selection_mode == SelectionMode::QuickStart {
                if self.sync_args.components.is_empty() {
                    self.sync_args.components = vec![
                        Component::Skills,
                        Component::Mcps,
                        Component::PrTemplate,
                        Component::Orchestration,
                    ];
                }
                if self.sync_args.agents.is_empty() {
                    self.sync_args.agents = vec![Agent::ClaudeCode, Agent::Gemini];
                }
            }
        }

        if target == TuiStage::Credentials && self.stage != TuiStage::Credentials {
            let role = self.sync_args.role.unwrap_or(Role::Frontend);
            let mcps = role.mcps();
            let mut fields = Vec::new();
            if mcps.contains(&Mcp::Figma) {
                fields.push("Figma API Token");
            }
            if mcps.contains(&Mcp::Dbhub) {
                fields.push("DBHub API Key");
                fields.push("DBHub DSN");
            }

            if let Some(first) = fields.first() {
                self.input_buffer = match *first {
                    "Figma API Token" => self.credentials.figma_token.clone(),
                    "DBHub API Key" => self.credentials.dbhub_key.clone(),
                    "DBHub DSN" => self.credentials.dbhub_dsn.clone(),
                    _ => String::new(),
                };
            }
        }

        if target == TuiStage::Install && !self.is_installing {
            self.start_install();
        }

        self.set_stage(target);
    }

    pub fn next_stage(&mut self) {
        if self.stage == TuiStage::Summary {
            self.should_quit = true;
            return;
        }

        let target = match self.stage {
            TuiStage::Welcome => TuiStage::Components,
            TuiStage::Components => TuiStage::Agents,
            TuiStage::Agents => TuiStage::Credentials,
            TuiStage::Credentials => TuiStage::Install,
            TuiStage::Install => TuiStage::Summary,
            _ => return,
        };

        self.try_set_stage(target);
    }
}
