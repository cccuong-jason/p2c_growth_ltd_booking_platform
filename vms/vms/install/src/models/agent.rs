use serde::{Deserialize, Serialize};
use std::fmt;
use std::path::{Path, PathBuf};

pub const GLOBAL_SRC_CLAUDE: &str = "teams-to-share/vms/instructions/global-claude.md";
pub const GLOBAL_SRC_COPILOT: &str = "teams-to-share/vms/instructions/global-copilot.md";
pub const GLOBAL_SRC_CURSOR: &str = "teams-to-share/vms/instructions/global-cursor.md";
pub const GLOBAL_SRC_CODEX: &str = "teams-to-share/vms/instructions/global-codex.md";
pub const GLOBAL_SRC_GEMINI: &str = "teams-to-share/vms/instructions/global-gemini.md";

#[derive(
    Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, clap::ValueEnum,
)]
#[serde(rename_all = "kebab-case")]
pub enum Agent {
    ClaudeCode,
    Copilot,
    Cursor,
    Codex,
    Gemini,
}

impl Agent {
    pub fn parse(input: &str) -> Result<Self, String> {
        match input {
            "claude-code" => Ok(Self::ClaudeCode),
            "copilot" => Ok(Self::Copilot),
            "cursor" => Ok(Self::Cursor),
            "codex" => Ok(Self::Codex),
            "gemini" => Ok(Self::Gemini),
            other => Err(format!("Invalid agent '{other}'")),
        }
    }

    pub fn cli_name(self) -> &'static str {
        match self {
            Self::ClaudeCode => "claude-code",
            Self::Copilot => "copilot",
            Self::Cursor => "cursor",
            Self::Codex => "codex",
            Self::Gemini => "gemini",
        }
    }

    pub fn label(self) -> &'static str {
        match self {
            Self::ClaudeCode => "Claude Code",
            Self::Copilot => "GitHub Copilot",
            Self::Cursor => "Cursor",
            Self::Codex => "Codex CLI",
            Self::Gemini => "Gemini CLI",
        }
    }

    pub fn instruction_path(self, home: &Path) -> PathBuf {
        match self {
            Self::ClaudeCode => home.join(".claude/CLAUDE.md"),
            Self::Copilot => home.join(".copilot/copilot-instructions.md"),
            Self::Cursor => home.join(".cursor/rules/vms-standards.mdc"),
            Self::Codex => home.join(".codex/AGENTS.md"),
            Self::Gemini => home.join(".gemini/GEMINI.md"),
        }
    }

    pub fn skill_dest(self, home: &Path, skill: &str) -> PathBuf {
        match self {
            Self::ClaudeCode => home.join(".claude/skills").join(skill).join("SKILL.md"),
            Self::Copilot => home.join(".copilot/skills").join(skill).join("SKILL.md"),
            Self::Cursor => home.join(".cursor/rules").join(format!("{skill}.mdc")),
            Self::Codex => home.join(".codex/skills").join(skill).join("SKILL.md"),
            Self::Gemini => home.join(".gemini/skills").join(skill).join("SKILL.md"),
        }
    }

    pub fn mcp_config_path(self, home: &Path) -> PathBuf {
        match self {
            Self::ClaudeCode => home.join(".claude/claude_mcp_settings.json"),
            Self::Copilot => home.join(".copilot/mcp-config.json"),
            Self::Cursor => home.join(".cursor/mcp.json"),
            Self::Codex => home.join(".codex/config.toml"),
            Self::Gemini => home.join(".gemini/settings.json"),
        }
    }

    pub fn global_instruction_src(self) -> &'static str {
        match self {
            Self::ClaudeCode => GLOBAL_SRC_CLAUDE,
            Self::Copilot => GLOBAL_SRC_COPILOT,
            Self::Cursor => GLOBAL_SRC_CURSOR,
            Self::Codex => GLOBAL_SRC_CODEX,
            Self::Gemini => GLOBAL_SRC_GEMINI,
        }
    }
}

impl fmt::Display for Agent {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.cli_name())
    }
}
