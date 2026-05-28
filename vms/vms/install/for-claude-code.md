# VMS AI Toolkit — Claude Code Installation Script

You are Claude Code. Execute every step below in order. Confirm each step before
moving to the next. Do not skip steps or combine them.

---

## Part 1 — Skills (all roles)

### Step 1 — Create the shared skills directory

```bash
mkdir -p ~/.agents/skills
```

### Step 2 — Install each skill

For each skill below, read the source SKILL.md and write it to
`~/.agents/skills/<skill-name>/SKILL.md`. Create the subdirectory if it does not exist.

| # | Read from | Write to |
|---|-----------|---------|
| 1 | `teams-to-share/vms/skills/shared/skill-plan-mode-execution/SKILL.md` | `~/.agents/skills/skill-plan-mode-execution/SKILL.md` |
| 2 | `teams-to-share/vms/skills/shared/skill-project-planning/SKILL.md` | `~/.agents/skills/skill-project-planning/SKILL.md` |
| 3 | `teams-to-share/vms/skills/shared/skill-github-manager/SKILL.md` | `~/.agents/skills/skill-github-manager/SKILL.md` |
| 4 | `teams-to-share/vms/skills/shared/skill-git-worktrees/SKILL.md` | `~/.agents/skills/skill-git-worktrees/SKILL.md` |
| 5 | `teams-to-share/vms/skills/shared/skill-writing-plans/SKILL.md` | `~/.agents/skills/skill-writing-plans/SKILL.md` |
| 6 | `teams-to-share/vms/skills/shared/skill-tdd/SKILL.md` | `~/.agents/skills/skill-tdd/SKILL.md` |
| 7 | `teams-to-share/vms/skills/shared/skill-ui-design/SKILL.md` | `~/.agents/skills/skill-ui-design/SKILL.md` |
| 8 | `teams-to-share/vms/skills/shared/skill-verification/SKILL.md` | `~/.agents/skills/skill-verification/SKILL.md` |
| 9 | `teams-to-share/vms/skills/shared/skill-code-review/SKILL.md` | `~/.agents/skills/skill-code-review/SKILL.md` |
| 10 | `teams-to-share/vms/skills/shared/skill-branch-finalize/SKILL.md` | `~/.agents/skills/skill-branch-finalize/SKILL.md` |
| 11 | `teams-to-share/vms/skills/shared/skill-knowledge-contribution/SKILL.md` | `~/.agents/skills/skill-knowledge-contribution/SKILL.md` |

### Step 3 — Sync to Claude Code

```bash
mkdir -p ~/.claude/skills
rsync -av ~/.agents/skills/ ~/.claude/skills/
```

### Step 4 — Verify skills

```bash
ls ~/.claude/skills/
```

Confirm all 10 directories are present before continuing.

---

### Step 5 — Install PR template

Read `teams-to-share/vms/shared-assets/pull_request_template.md` and write it to
`.github/pull_request_template.md` in the current VMS service repo root.

If `.github/pull_request_template.md` already exists, **skip this step** — do not overwrite.

> This template is the unified VMS PR template. GitHub uses it automatically when
> opening any pull request in the repo.

---

## Part 2 — Create CLAUDE.md (instruction file)

Create or update `CLAUDE.md` in the **current VMS service repo root**. This is the always-on
instruction file Claude Code reads at the start of every session.

If a `CLAUDE.md` already exists, append the VMS block below under a `## VMS AI Standards`
heading. Do not overwrite existing content.

```markdown
## VMS AI Standards

You are working on a VMS service. Apply these standards to every session.

### Agentic mandates

| Mandate | Rule |
|---------|------|
| **Skill-First** | Invoke a relevant skill BEFORE any action on a repeatable task |
| **No Ghost Code** | Code written without a preceding failing test MUST be deleted |
| **Evidence Before Assertions** | Run tests/lint and show output before claiming any task done |
| **Branch First** | Feature branch must exist before the agent touches any file |

### Skills available (~/.claude/skills/)

| Skill | Scope | Invoke when |
|-------|-------|------------|
| `skill-plan-mode-execution` | Fullstack | Plan mode workflow — FE/BE development process from plan to PR |
| `skill-project-planning` | Fullstack | Starting any feature — project planning hierarchy + Golden TDD |
| `skill-github-manager` | Fullstack | Creating branches, commits, or PRs |
| `skill-git-worktrees` | Fullstack | Starting multi-step feature work |
| `skill-writing-plans` | Fullstack | Before touching code on any task with 2+ actions |
| `skill-tdd` | Fullstack | Implementing any feature or bugfix |
| `skill-ui-design` | Frontend | Any UI component or page work |
| `skill-verification` | Fullstack | Before claiming any task complete |
| `skill-code-review` | Fullstack | Reviewing any PR or diff |
| `skill-branch-finalize` | Fullstack | After verification passes — integrating work |
| `skill-knowledge-contribution` | Fullstack | When a novel discovery should feed back to the shared playbook |

### Security gate

Never commit secrets, tokens, API keys, or customer data. Validate all external input at
trust boundaries. Stop and escalate on any security doubt.

### Full workflow

See `teams-to-share/vms/instructions/vms-ai-harness.md` for the 8-phase VMS workflow.

### Orchestration projection for Claude Code

Create thin wrappers that point back to the canonical orchestration source:

- `.claude/agents/planner.md`
- `.claude/agents/developer.md`
- `.claude/agents/reviewer.md`
- `.claude/commands/vms-orchestrator.md`

Each wrapper should reference:

- `teams-to-share/vms/orchestration/README.md`
- `teams-to-share/vms/orchestration/pipeline/v1.yaml`
- `teams-to-share/vms/orchestration/pipeline/state-schema.md`
- `teams-to-share/vms/orchestration/prompts/planner.md`
- `teams-to-share/vms/orchestration/prompts/developer.md`
- `teams-to-share/vms/orchestration/prompts/reviewer.md`
- `teams-to-share/vms/orchestration/prompts/orchestrator.md`

Do not duplicate the role logic in the wrapper files. The wrapper is only a local
entrypoint to the shared VMS source.

---

## Part 3 — MCP Servers (role-dependent)

Read the user's role from the install prompt (backend / frontend / fullstack) and
install only the MCPs listed for that role. Skip the others.

Add each MCP to `~/.claude/claude_mcp_settings.json`. If the file does not exist,
create it with `{ "mcpServers": {} }` first, then add each server entry.

### Atlassian — ALL roles

```json
"atlassian": {
  "command": "npx",
  "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"]
}
```

No local credentials are written by this installer for Atlassian. Authentication is handled by the hosted Atlassian MCP flow.
Guide: `mcp/atlassian.md`

### Figma — Frontend and Fullstack only

```json
"figma": {
  "command": "npx",
  "args": ["-y", "figma-mcp"],
  "env": {
    "FIGMA_API_TOKEN": "<your-figma-token>"
  }
}
```

Ask the user for their Figma personal access token before writing.
Guide: `mcp/figma.md`

### Chrome (Playwright) — Frontend and Fullstack only

```json
"chrome": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp", "--browser", "chromium"]
}
```

No credentials required.
Guide: `mcp/chrome.md`

### DBHub — Backend and Fullstack only

```json
"dbhub": {
  "command": "npx",
  "args": ["-y", "dbhub-mcp"],
  "env": {
    "DBHUB_API_KEY": "<your-dbhub-api-key>",
    "DBHUB_DSN": "<dev-connection-string>"
  }
}
```

Ask the user for their DBHub API key and dev DSN before writing.
Note: dev/staging DSN only — never production.
Guide: `mcp/dbhub.md`

---

## Part 4 — Report to the user

Print a summary:

```
VMS AI Toolkit — Claude Code Installation Complete

INSTRUCTION FILE:
  ✅ CLAUDE.md (VMS AI Standards block appended in service repo root)

SKILLS (11/11 installed):
  ✅ skill-plan-mode-execution [fullstack]
  ✅ skill-project-planning     [fullstack]
  ✅ skill-github-manager    [fullstack]
  ✅ skill-git-worktrees     [fullstack]
  ✅ skill-writing-plans     [fullstack]
  ✅ skill-tdd               [fullstack]
  ✅ skill-ui-design         [frontend]
  ✅ skill-verification      [fullstack]
  ✅ skill-code-review       [fullstack]
  ✅ skill-branch-finalize   [fullstack]
  ✅ skill-knowledge-contribution [fullstack]

MCP SERVERS:
  ✅ Atlassian   [fullstack]
  ✅/— Figma     [frontend only]
  ✅/— Chrome    [frontend only]
  ✅/— DBHub     [backend only]

Next: Read instructions/vms-ai-harness.md for the full workflow.
Start a feature: invoke `skill-project-planning` or enter the orchestration flow through Planner.
```
