use crate::app::tasks::ConflictInfo;
use crate::app::tasks::TaskMessage;
use crate::models::{Agent, AppError, Credentials, Mcp, Role, UserResponse, WriteStatus};
use crate::utils::{git_branch_for, read_json_object};
use base64::Engine;
use serde_json::{Map as JsonMap, Value as JsonValue};
use std::collections::BTreeMap;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use std::sync::mpsc::{Receiver, Sender};
use toml::Value as TomlValue;

pub const REPO: &str = "opswat-eng/ai-playbook";
pub const SKILLS_SRC: &str = "teams-to-share/vms/skills/shared";
pub const PR_TEMPLATE_SRC: &str = "teams-to-share/vms/shared-assets/pull_request_template.md";
pub const ORCHESTRATION_SRC: &str = "teams-to-share/vms/orchestration";
pub const VMS_HEADER: &str = "--- VMS STANDARD ---";
pub const ORCHESTRATION_ROOT: &str = ".ai/vms-orchestration";
pub const ORCHESTRATION_STATE_GLOB: &str = ".ai/vms-orchestration/*.json";

const ORCHESTRATION_RUNTIME_FILES: &[(&str, &str)] = &[
    ("README.md", "README.md"),
    ("project-context.md", "project-context.md"),
    ("pipeline/v1.yaml", "pipeline/v1.yaml"),
    ("pipeline/state-schema.md", "pipeline/state-schema.md"),
    ("prompts/planner.md", "prompts/planner.md"),
    ("prompts/developer.md", "prompts/developer.md"),
    ("prompts/reviewer.md", "prompts/reviewer.md"),
    ("prompts/orchestrator.md", "prompts/orchestrator.md"),
];

pub struct Installer {
    pub cwd: PathBuf,
    pub home: PathBuf,
    pub reference: String,
}

impl Installer {
    pub fn new() -> Result<Self, AppError> {
        let cwd = std::env::current_dir()?;
        let home = std::env::var_os("HOME")
            .map(PathBuf::from)
            .ok_or_else(|| AppError::Message("HOME is not set".into()))?;
        let reference = git_branch_for(&cwd).unwrap_or_else(|| "main".into());
        Ok(Self {
            cwd,
            home,
            reference,
        })
    }

    pub fn check_prereqs(&self) -> Result<(), AppError> {
        self.ensure_command("gh", "gh CLI not found")?;
        self.run_checked("gh", &["auth", "status"], "gh not authenticated")?;
        self.run_checked(
            "gh",
            &["api", &format!("repos/{REPO}"), "--silent"],
            "No access to repo",
        )?;
        Ok(())
    }

    pub fn ensure_command(&self, cmd: &str, message: &str) -> Result<(), AppError> {
        let status = Command::new(cmd)
            .arg("--version")
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .status();
        match status {
            Ok(s) if s.success() => Ok(()),
            _ => Err(AppError::Message(message.into())),
        }
    }

    pub fn run_checked(&self, program: &str, args: &[&str], message: &str) -> Result<(), AppError> {
        let output = Command::new(program).args(args).output()?;
        if output.status.success() {
            Ok(())
        } else {
            Err(AppError::Message(message.into()))
        }
    }

    fn gh_text(&self, path: &str) -> Result<String, AppError> {
        let output = Command::new("gh")
            .args([
                "api",
                &format!("repos/{REPO}/contents/{path}?ref={}", self.reference),
                "--jq",
                ".content",
            ])
            .output()?;
        if !output.status.success() {
            return Err(AppError::Message(format!("Failed to fetch {path}")));
        }
        let encoded = String::from_utf8_lossy(&output.stdout);
        let compact: String = encoded.lines().collect();
        let decoded = base64::engine::general_purpose::STANDARD
            .decode(compact)
            .map_err(|e| AppError::Message(format!("Decode error: {e}")))?;
        String::from_utf8(decoded).map_err(|e| AppError::Message(format!("UTF8 error: {e}")))
    }

    pub fn load_skills(&self) -> Result<Vec<String>, AppError> {
        let output = Command::new("gh")
            .args([
                "api",
                &format!("repos/{REPO}/contents/{SKILLS_SRC}?ref={}", self.reference),
                "--jq",
                ".[] | select(.type==\"dir\") | .name",
            ])
            .output()?;
        if !output.status.success() {
            return Err(AppError::Message("Failed to discover skills".into()));
        }
        let mut skills: Vec<String> = String::from_utf8_lossy(&output.stdout)
            .lines()
            .map(str::trim)
            .filter(|l| !l.is_empty())
            .map(ToOwned::to_owned)
            .collect();
        skills.sort();
        Ok(skills)
    }

    pub fn fetch_global_instructions(
        &self,
        agents: &[Agent],
    ) -> Result<BTreeMap<Agent, String>, AppError> {
        let mut map = BTreeMap::new();
        for agent in agents {
            map.insert(*agent, self.gh_text(agent.global_instruction_src())?);
        }
        Ok(map)
    }

    pub fn install_skills(
        &self,
        agent: Agent,
        skills: &[String],
        force: bool,
        tx: &Sender<TaskMessage>,
        rx: &Receiver<UserResponse>,
    ) -> Result<Vec<(String, WriteStatus)>, AppError> {
        let mut results = Vec::new();
        for skill in skills {
            let content = self.gh_text(&format!("{SKILLS_SRC}/{skill}/SKILL.md"))?;
            let dest = agent.skill_dest(&self.home, skill);
            let status = self.smart_write(&dest, &content, force, tx, rx)?;
            results.push((skill.clone(), status));
        }
        Ok(results)
    }

    pub fn write_instruction(
        &self,
        agent: Agent,
        content: &str,
        force: bool,
        tx: &Sender<TaskMessage>,
        rx: &Receiver<UserResponse>,
    ) -> Result<WriteStatus, AppError> {
        let dest = agent.instruction_path(&self.home);
        self.smart_write(&dest, content, force, tx, rx)
    }

    pub fn install_pr_template(
        &self,
        force: bool,
        tx: &Sender<TaskMessage>,
        rx: &Receiver<UserResponse>,
    ) -> Result<WriteStatus, AppError> {
        let dest = self.cwd.join(".github/pull_request_template.md");
        let content = self.gh_text(PR_TEMPLATE_SRC)?;
        self.smart_write(&dest, &content, force, tx, rx)
    }

    pub fn install_orchestration_runtime(
        &self,
        force: bool,
        tx: &Sender<TaskMessage>,
        rx: &Receiver<UserResponse>,
    ) -> Result<Vec<(String, WriteStatus)>, AppError> {
        let mut results = Vec::new();
        let root = self.cwd.join(ORCHESTRATION_ROOT);

        for (relative_dest, relative_src) in ORCHESTRATION_RUNTIME_FILES {
            let content = self.gh_text(&format!("{ORCHESTRATION_SRC}/{relative_src}"))?;
            let dest = root.join(relative_dest);
            let status = self.smart_write(&dest, &content, force, tx, rx)?;
            results.push((relative_dest.to_string(), status));
        }

        let gitignore_status =
            self.ensure_gitignore_entry(&self.cwd.join(".gitignore"), ORCHESTRATION_STATE_GLOB)?;
        results.push((".gitignore".into(), gitignore_status));
        Ok(results)
    }

    pub fn install_orchestration_projection(
        &self,
        agent: Agent,
        force: bool,
        tx: &Sender<TaskMessage>,
        rx: &Receiver<UserResponse>,
    ) -> Result<Vec<(String, WriteStatus)>, AppError> {
        let files = match agent {
            Agent::Codex => vec![(
                "AGENTS.md".to_string(),
                self.cwd.join("AGENTS.md"),
                render_codex_orchestration_block(),
            )],
            Agent::Cursor => vec![
                (
                    ".cursor/rules/vms-orchestration.mdc".to_string(),
                    self.cwd.join(".cursor/rules/vms-orchestration.mdc"),
                    render_cursor_orchestration_rule(
                        "orchestrator",
                        ".ai/vms-orchestration/prompts/orchestrator.md",
                    ),
                ),
                (
                    ".cursor/rules/vms-planner.mdc".to_string(),
                    self.cwd.join(".cursor/rules/vms-planner.mdc"),
                    render_cursor_orchestration_rule(
                        "planner",
                        ".ai/vms-orchestration/prompts/planner.md",
                    ),
                ),
                (
                    ".cursor/rules/vms-developer.mdc".to_string(),
                    self.cwd.join(".cursor/rules/vms-developer.mdc"),
                    render_cursor_orchestration_rule(
                        "developer",
                        ".ai/vms-orchestration/prompts/developer.md",
                    ),
                ),
                (
                    ".cursor/rules/vms-reviewer.mdc".to_string(),
                    self.cwd.join(".cursor/rules/vms-reviewer.mdc"),
                    render_cursor_orchestration_rule(
                        "reviewer",
                        ".ai/vms-orchestration/prompts/reviewer.md",
                    ),
                ),
            ],
            Agent::ClaudeCode => vec![
                (
                    "CLAUDE.md".to_string(),
                    self.cwd.join("CLAUDE.md"),
                    render_claude_orchestration_index(),
                ),
                (
                    ".claude/agents/orchestrator.md".to_string(),
                    self.cwd.join(".claude/agents/orchestrator.md"),
                    render_claude_orchestration_agent(
                        "orchestrator",
                        ".ai/vms-orchestration/prompts/orchestrator.md",
                    ),
                ),
                (
                    ".claude/agents/planner.md".to_string(),
                    self.cwd.join(".claude/agents/planner.md"),
                    render_claude_orchestration_agent(
                        "planner",
                        ".ai/vms-orchestration/prompts/planner.md",
                    ),
                ),
                (
                    ".claude/agents/developer.md".to_string(),
                    self.cwd.join(".claude/agents/developer.md"),
                    render_claude_orchestration_agent(
                        "developer",
                        ".ai/vms-orchestration/prompts/developer.md",
                    ),
                ),
                (
                    ".claude/agents/reviewer.md".to_string(),
                    self.cwd.join(".claude/agents/reviewer.md"),
                    render_claude_orchestration_agent(
                        "reviewer",
                        ".ai/vms-orchestration/prompts/reviewer.md",
                    ),
                ),
            ],
            _ => vec![(
                format!("{}-unsupported", agent.cli_name()),
                self.cwd.join(ORCHESTRATION_ROOT).join("README.md"),
                String::new(),
            )],
        };

        let mut results = Vec::new();
        for (name, path, content) in files {
            let status = if content.is_empty() {
                WriteStatus::Skipped(path)
            } else {
                self.smart_write(&path, &content, force, tx, rx)?
            };
            results.push((name, status));
        }
        Ok(results)
    }

    pub fn install_mcps(
        &self,
        agent: Agent,
        role: Role,
        creds: &Credentials,
        tx: &Sender<TaskMessage>,
        rx: &Receiver<UserResponse>,
    ) -> Result<WriteStatus, AppError> {
        let active: Vec<Mcp> = role
            .mcps()
            .iter()
            .copied()
            .filter(|m| !creds.skipped.contains(m))
            .collect();
        if active.is_empty() {
            return Ok(WriteStatus::Skipped(agent.mcp_config_path(&self.home)));
        }
        if agent == Agent::Codex {
            let status = self.install_codex_mcps(&active, creds)?;
            if active.contains(&Mcp::Atlassian) {
                self.ensure_atlassian_ready(agent)?;
            }
            return Ok(status);
        }

        let path = agent.mcp_config_path(&self.home);
        let mut new_servers = JsonMap::new();
        for mcp in &active {
            new_servers.insert(
                mcp.cli_name().into(),
                build_mcp_server_for_agent(agent, *mcp, creds),
            );
        }
        let status = self.smart_merge_json(&path, new_servers, tx, rx)?;
        if active.contains(&Mcp::Atlassian) && matches!(agent, Agent::Cursor) {
            self.ensure_atlassian_ready(agent)?;
        }
        Ok(status)
    }

    pub fn smart_write(
        &self,
        path: &Path,
        content: &str,
        force: bool,
        tx: &Sender<TaskMessage>,
        rx: &Receiver<UserResponse>,
    ) -> Result<WriteStatus, AppError> {
        if let Some(p) = path.parent() {
            fs::create_dir_all(p)?;
        }

        if !path.exists() {
            fs::write(path, content)?;
            return Ok(WriteStatus::Created(path.to_path_buf()));
        }

        let existing = fs::read_to_string(path).unwrap_or_default();
        if existing == content {
            return Ok(WriteStatus::Skipped(path.to_path_buf()));
        }

        if force {
            fs::write(path, content)?;
            return Ok(WriteStatus::Updated(path.to_path_buf()));
        }

        let can_append = path
            .extension()
            .is_some_and(|ext| ext == "md" || ext == "mdc")
            && !existing.contains(VMS_HEADER);

        tx.send(TaskMessage::Conflict(ConflictInfo {
            path: path.to_path_buf(),
            message: "File exists and differs from the template.".into(),
            can_append,
            new_content: content.to_string(),
        }))
        .ok();

        match rx.recv() {
            Ok(UserResponse::Overwrite) => {
                fs::write(path, content)?;
                Ok(WriteStatus::Updated(path.to_path_buf()))
            }
            Ok(UserResponse::Skip) => Ok(WriteStatus::Skipped(path.to_path_buf())),
            Ok(UserResponse::Merge) => Ok(WriteStatus::Merged(path.to_path_buf())),
            Ok(UserResponse::Append) if can_append => {
                let mut final_content = existing;
                if !final_content.ends_with('\n') {
                    final_content.push('\n');
                }
                final_content.push_str(VMS_HEADER);
                final_content.push('\n');
                final_content.push_str(content);
                fs::write(path, final_content)?;
                Ok(WriteStatus::Appended(path.to_path_buf()))
            }
            Ok(UserResponse::Append) => {
                fs::write(path, content)?;
                Ok(WriteStatus::Updated(path.to_path_buf()))
            }
            Err(_) => Err(AppError::Message("Channel closed".into())),
        }
    }

    pub fn smart_merge_json(
        &self,
        path: &Path,
        new_servers: JsonMap<String, JsonValue>,
        _tx: &Sender<TaskMessage>,
        _rx: &Receiver<UserResponse>,
    ) -> Result<WriteStatus, AppError> {
        if let Some(p) = path.parent() {
            fs::create_dir_all(p)?;
        }

        let is_new = !path.exists();
        let mut root = if path.exists() {
            read_json_object(path)?
        } else {
            JsonMap::new()
        };

        let mcp_servers = root
            .entry("mcpServers")
            .or_insert_with(|| JsonValue::Object(JsonMap::new()));
        let server_map = mcp_servers
            .as_object_mut()
            .ok_or_else(|| AppError::Message("mcpServers is not an object".into()))?;

        let mut changed = false;
        for (name, config) in new_servers {
            if server_map.get(&name) != Some(&config) {
                server_map.insert(name, config);
                changed = true;
            }
        }

        if changed || is_new {
            fs::write(
                path,
                serde_json::to_string_pretty(&JsonValue::Object(root))? + "\n",
            )?;
            if is_new {
                Ok(WriteStatus::Created(path.to_path_buf()))
            } else {
                Ok(WriteStatus::Updated(path.to_path_buf()))
            }
        } else {
            Ok(WriteStatus::Skipped(path.to_path_buf()))
        }
    }

    fn ensure_gitignore_entry(&self, path: &Path, entry: &str) -> Result<WriteStatus, AppError> {
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)?;
        }

        if !path.exists() {
            fs::write(path, format!("{entry}\n"))?;
            return Ok(WriteStatus::Created(path.to_path_buf()));
        }

        let mut existing = fs::read_to_string(path)?;
        if existing.lines().any(|line| line.trim() == entry) {
            return Ok(WriteStatus::Skipped(path.to_path_buf()));
        }

        if !existing.ends_with('\n') {
            existing.push('\n');
        }
        existing.push_str(entry);
        existing.push('\n');
        fs::write(path, existing)?;
        Ok(WriteStatus::Appended(path.to_path_buf()))
    }

    fn install_codex_mcps(
        &self,
        mcps: &[Mcp],
        creds: &Credentials,
    ) -> Result<WriteStatus, AppError> {
        let path = self.home.join(".codex/config.toml");
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)?;
        }

        let is_new = !path.exists();
        let mut root = if path.exists() {
            fs::read_to_string(&path)?
                .parse::<TomlValue>()
                .map_err(|e| {
                    AppError::Message(format!("Invalid TOML in {}: {e}", path.display()))
                })?
        } else {
            TomlValue::Table(Default::default())
        };

        let root_table = root
            .as_table_mut()
            .ok_or_else(|| AppError::Message("Codex config root is not a TOML table".into()))?;
        let servers = root_table
            .entry("mcp_servers")
            .or_insert_with(|| TomlValue::Table(Default::default()));
        let server_table = servers
            .as_table_mut()
            .ok_or_else(|| AppError::Message("mcp_servers is not a TOML table".into()))?;

        let mut changed = false;
        for mcp in mcps {
            let config = codex_mcp_value(*mcp, creds);
            if server_table.get(mcp.cli_name()) != Some(&config) {
                server_table.insert(mcp.cli_name().into(), config);
                changed = true;
            }
        }

        if changed || is_new {
            fs::write(
                &path,
                toml::to_string_pretty(&root)
                    .map_err(|e| AppError::Message(format!("TOML write error: {e}")))?
                    + "\n",
            )?;
            if is_new {
                Ok(WriteStatus::Created(path))
            } else {
                Ok(WriteStatus::Updated(path))
            }
        } else {
            Ok(WriteStatus::Skipped(path))
        }
    }

    fn ensure_atlassian_ready(&self, agent: Agent) -> Result<(), AppError> {
        match agent {
            Agent::Codex => self.ensure_codex_atlassian_ready(),
            Agent::Cursor => self.ensure_cursor_atlassian_ready(),
            _ => Ok(()),
        }
    }

    fn ensure_codex_atlassian_ready(&self) -> Result<(), AppError> {
        if codex_atlassian_ready(&self.run_output("codex", &["mcp", "list", "--json"])?)? {
            return Ok(());
        }

        self.run_checked(
            "codex",
            &["mcp", "login", "atlassian"],
            "Codex Atlassian login failed",
        )?;

        if codex_atlassian_ready(&self.run_output("codex", &["mcp", "list", "--json"])?)? {
            Ok(())
        } else {
            Err(AppError::Message(
                "Codex Atlassian MCP is still not ready after scripted login".into(),
            ))
        }
    }

    fn ensure_cursor_atlassian_ready(&self) -> Result<(), AppError> {
        let before = self.run_output("cursor-agent", &["mcp", "list"])?;
        if cursor_atlassian_ready(&before) {
            return Ok(());
        }

        self.run_checked(
            "cursor-agent",
            &["mcp", "enable", "atlassian"],
            "Cursor Atlassian approval step failed",
        )?;
        self.run_checked(
            "cursor-agent",
            &["mcp", "login", "atlassian"],
            "Cursor Atlassian login failed",
        )?;

        let after = self.run_output("cursor-agent", &["mcp", "list"])?;
        if cursor_atlassian_ready(&after) {
            Ok(())
        } else {
            Err(AppError::Message(
                "Cursor Atlassian MCP is still not ready after scripted approval/login".into(),
            ))
        }
    }

    fn run_output(&self, program: &str, args: &[&str]) -> Result<String, AppError> {
        let output = Command::new(program).args(args).output()?;
        if !output.status.success() {
            return Err(AppError::Message(format!(
                "{} {} failed: {}",
                program,
                args.join(" "),
                String::from_utf8_lossy(&output.stderr).trim()
            )));
        }
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    }
}

pub fn build_mcp_server(mcp: Mcp, _creds: &Credentials) -> JsonValue {
    match mcp {
        Mcp::Atlassian => {
            serde_json::json!({ "command": "npx", "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"] })
        }
        Mcp::Figma => {
            serde_json::json!({ "command": "npx", "args": ["-y", "figma-mcp"], "env": { "FIGMA_API_TOKEN": _creds.figma_token } })
        }
        Mcp::Chrome => {
            serde_json::json!({ "command": "npx", "args": ["-y", "@playwright/mcp", "--browser", "chromium"] })
        }
        Mcp::Dbhub => {
            serde_json::json!({ "command": "npx", "args": ["-y", "dbhub-mcp"], "env": { "DBHUB_API_KEY": _creds.dbhub_key, "DBHUB_DSN": _creds.dbhub_dsn } })
        }
    }
}

pub fn build_mcp_server_for_agent(agent: Agent, mcp: Mcp, creds: &Credentials) -> JsonValue {
    match (agent, mcp) {
        (Agent::Cursor, Mcp::Atlassian) => {
            serde_json::json!({ "url": "https://mcp.atlassian.com/v1/sse" })
        }
        _ => build_mcp_server(mcp, creds),
    }
}

pub fn codex_mcp_value(mcp: Mcp, creds: &Credentials) -> TomlValue {
    let toml_text = match mcp {
        Mcp::Atlassian => r#"
url = "https://mcp.atlassian.com/v1/sse"
"#
        .to_string(),
        Mcp::Figma => format!(
            r#"
command = "npx"
args = ["-y", "figma-mcp"]
startup_timeout_sec = 30

[env]
FIGMA_API_TOKEN = "{}"
"#,
            creds.figma_token
        ),
        Mcp::Chrome => r#"
command = "npx"
args = ["-y", "@playwright/mcp", "--browser", "chromium"]
startup_timeout_sec = 30
"#
        .to_string(),
        Mcp::Dbhub => format!(
            r#"
command = "npx"
args = ["-y", "dbhub-mcp"]
startup_timeout_sec = 30

[env]
DBHUB_API_KEY = "{}"
DBHUB_DSN = "{}"
"#,
            creds.dbhub_key, creds.dbhub_dsn
        ),
    };

    TomlValue::Table(
        toml::from_str::<toml::Table>(&toml_text).expect("valid Codex MCP TOML snippet"),
    )
}

pub fn codex_atlassian_ready(json_text: &str) -> Result<bool, AppError> {
    let value: JsonValue = serde_json::from_str(json_text)?;
    let servers = value
        .as_array()
        .ok_or_else(|| AppError::Message("Codex MCP list JSON is not an array".into()))?;

    let status = servers
        .iter()
        .find(|server| server.get("name").and_then(JsonValue::as_str) == Some("atlassian"))
        .and_then(|server| server.get("auth_status"))
        .and_then(JsonValue::as_str);

    Ok(matches!(status, Some(s) if s != "not_logged_in" && s != "unsupported"))
}

pub fn cursor_atlassian_ready(list_text: &str) -> bool {
    list_text
        .lines()
        .find(|line| line.trim_start().starts_with("atlassian:"))
        .is_some_and(|line| {
            !line.contains("not loaded")
                && !line.contains("needs approval")
                && !line.contains("error")
        })
}

fn render_codex_orchestration_block() -> String {
    format!(
        r#"# VMS Orchestration v1

Use the repo-local orchestration runtime when a task should move through
`planner -> developer -> reviewer`.

## Local runtime

- `.ai/vms-orchestration/README.md`
- `.ai/vms-orchestration/project-context.md`
- `.ai/vms-orchestration/pipeline/v1.yaml`
- `.ai/vms-orchestration/pipeline/state-schema.md`

## Role prompts

- Planner: `.ai/vms-orchestration/prompts/planner.md`
- Developer: `.ai/vms-orchestration/prompts/developer.md`
- Reviewer: `.ai/vms-orchestration/prompts/reviewer.md`
- Orchestrator: `.ai/vms-orchestration/prompts/orchestrator.md`

## Run-state convention

- Store run state at `{ORCHESTRATION_STATE_GLOB}`
- Read or create the state file before dispatching a role
- Keep history append-only and halt at `scope-approved` and `merge-approved`

## Operating rules

1. Skills remain authoritative for how work is executed.
2. The orchestrator only selects the next role, validates the contract, and updates run state.
3. Do not infer gate approval from sentiment in chat; require explicit human approval.
"#
    )
}

fn render_cursor_orchestration_rule(role: &str, prompt_path: &str) -> String {
    format!(
        r#"---
description: "VMS orchestration {role} wrapper"
globs: ["**/*"]
alwaysApply: false
---

# VMS Orchestration — {role}

Use this wrapper only when the workflow is currently assigned to the `{role}` role.

## Local runtime

- `.ai/vms-orchestration/README.md`
- `.ai/vms-orchestration/project-context.md`
- `.ai/vms-orchestration/pipeline/v1.yaml`
- `.ai/vms-orchestration/pipeline/state-schema.md`

## Canonical prompt

- `{prompt_path}`

## Run-state convention

- Store run state at `{ORCHESTRATION_STATE_GLOB}`
- Halt at `scope-approved` and `merge-approved` until a human explicitly approves the gate

## Rule

Read the local runtime first, then follow the canonical prompt for this role without duplicating VMS skill behavior.
"#
    )
}

fn render_claude_orchestration_index() -> String {
    format!(
        r#"# VMS Orchestration v1

This repo installs the VMS orchestration runtime locally so Claude sessions can
resume work across Planner, Developer, and Reviewer.

## Local runtime

- `.ai/vms-orchestration/README.md`
- `.ai/vms-orchestration/project-context.md`
- `.ai/vms-orchestration/pipeline/v1.yaml`
- `.ai/vms-orchestration/pipeline/state-schema.md`

## Local agents

- `.claude/agents/orchestrator.md`
- `.claude/agents/planner.md`
- `.claude/agents/developer.md`
- `.claude/agents/reviewer.md`

## Run-state convention

- Store run state at `{ORCHESTRATION_STATE_GLOB}`
- Update the state after each role handoff and each explicit gate decision
"#
    )
}

fn render_claude_orchestration_agent(role: &str, prompt_path: &str) -> String {
    format!(
        r#"# Claude Agent — VMS {role}

This is a thin wrapper over the repo-local VMS orchestration runtime.

## Read first

- `.ai/vms-orchestration/README.md`
- `.ai/vms-orchestration/project-context.md`
- `.ai/vms-orchestration/pipeline/v1.yaml`
- `.ai/vms-orchestration/pipeline/state-schema.md`

## Canonical prompt

- `{prompt_path}`

## Run-state convention

- Store run state at `{ORCHESTRATION_STATE_GLOB}`
- Do not move past `scope-approved` or `merge-approved` without explicit human approval

## Rule

Follow the canonical prompt for `{role}` and let VMS skills remain the authority for execution details.
"#
    )
}

#[cfg(test)]
mod tests {
    use super::{
        ORCHESTRATION_STATE_GLOB, build_mcp_server, build_mcp_server_for_agent,
        codex_atlassian_ready, codex_mcp_value, cursor_atlassian_ready,
        render_claude_orchestration_agent, render_codex_orchestration_block,
        render_cursor_orchestration_rule,
    };
    use crate::{Agent, Credentials, Mcp};

    #[test]
    fn atlassian_server_uses_hosted_remote_bridge() {
        let value = build_mcp_server(Mcp::Atlassian, &Credentials::default());

        assert_eq!(
            value,
            serde_json::json!({
                "command": "npx",
                "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"]
            })
        );
    }

    #[test]
    fn cursor_atlassian_server_uses_native_remote_url() {
        let value =
            build_mcp_server_for_agent(Agent::Cursor, Mcp::Atlassian, &Credentials::default());

        assert_eq!(
            value,
            serde_json::json!({
                "url": "https://mcp.atlassian.com/v1/sse"
            })
        );
    }

    #[test]
    fn codex_atlassian_config_has_startup_timeout() {
        let config = codex_mcp_value(Mcp::Atlassian, &Credentials::default()).to_string();

        assert!(config.contains("url = \"https://mcp.atlassian.com/v1/sse\""));
        assert!(!config.contains("mcp-remote"));
    }

    #[test]
    fn codex_ready_requires_non_login_auth_state() {
        let not_ready = r#"[{"name":"atlassian","auth_status":"not_logged_in"}]"#;
        let ready = r#"[{"name":"atlassian","auth_status":"authenticated"}]"#;

        assert!(!codex_atlassian_ready(not_ready).unwrap());
        assert!(codex_atlassian_ready(ready).unwrap());
    }

    #[test]
    fn cursor_ready_rejects_needs_approval_and_accepts_loaded_state() {
        assert!(!cursor_atlassian_ready(
            "atlassian: not loaded (needs approval)\n"
        ));
        assert!(cursor_atlassian_ready("atlassian: enabled\n"));
    }

    #[test]
    fn codex_orchestration_block_mentions_local_runtime_and_state_glob() {
        let block = render_codex_orchestration_block();

        assert!(block.contains(".ai/vms-orchestration/pipeline/v1.yaml"));
        assert!(block.contains(ORCHESTRATION_STATE_GLOB));
    }

    #[test]
    fn cursor_orchestration_rule_points_to_role_prompt() {
        let rule =
            render_cursor_orchestration_rule("planner", ".ai/vms-orchestration/prompts/planner.md");

        assert!(rule.contains("VMS orchestration planner wrapper"));
        assert!(rule.contains(".ai/vms-orchestration/prompts/planner.md"));
    }

    #[test]
    fn claude_orchestration_agent_mentions_gate_halts() {
        let rule = render_claude_orchestration_agent(
            "reviewer",
            ".ai/vms-orchestration/prompts/reviewer.md",
        );

        assert!(rule.contains("merge-approved"));
        assert!(rule.contains(".ai/vms-orchestration/prompts/reviewer.md"));
    }
}
