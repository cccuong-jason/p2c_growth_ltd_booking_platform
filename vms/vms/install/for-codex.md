# VMS AI Toolkit — Codex CLI Installation Script

You are Codex CLI. Execute every step below in order. Confirm each step before
moving to the next. Do not skip steps or combine them.

---

## Part 1 — Skills (all roles)

### Step 1 — Create the skills directory

```bash
mkdir -p ~/.codex/skills
```

### Step 2 — Install each skill

For each skill below, read the source SKILL.md and write it to
`~/.codex/skills/<skill-name>/SKILL.md`. Create the subdirectory if it does not exist.

| # | Read from | Write to |
|---|-----------|---------|
| 1 | `teams-to-share/vms/skills/shared/skill-plan-mode-execution/SKILL.md` | `~/.codex/skills/skill-plan-mode-execution/SKILL.md` |
| 2 | `teams-to-share/vms/skills/shared/skill-project-planning/SKILL.md` | `~/.codex/skills/skill-project-planning/SKILL.md` |
| 3 | `teams-to-share/vms/skills/shared/skill-github-manager/SKILL.md` | `~/.codex/skills/skill-github-manager/SKILL.md` |
| 4 | `teams-to-share/vms/skills/shared/skill-git-worktrees/SKILL.md` | `~/.codex/skills/skill-git-worktrees/SKILL.md` |
| 5 | `teams-to-share/vms/skills/shared/skill-writing-plans/SKILL.md` | `~/.codex/skills/skill-writing-plans/SKILL.md` |
| 6 | `teams-to-share/vms/skills/shared/skill-tdd/SKILL.md` | `~/.codex/skills/skill-tdd/SKILL.md` |
| 7 | `teams-to-share/vms/skills/shared/skill-ui-design/SKILL.md` | `~/.codex/skills/skill-ui-design/SKILL.md` |
| 8 | `teams-to-share/vms/skills/shared/skill-verification/SKILL.md` | `~/.codex/skills/skill-verification/SKILL.md` |
| 9 | `teams-to-share/vms/skills/shared/skill-code-review/SKILL.md` | `~/.codex/skills/skill-code-review/SKILL.md` |
| 10 | `teams-to-share/vms/skills/shared/skill-branch-finalize/SKILL.md` | `~/.codex/skills/skill-branch-finalize/SKILL.md` |
| 11 | `teams-to-share/vms/skills/shared/skill-knowledge-contribution/SKILL.md` | `~/.codex/skills/skill-knowledge-contribution/SKILL.md` |

### Step 3 — Verify skills

```bash
ls ~/.codex/skills/
```

Confirm all 11 directories are present before continuing.

---

### Step 4 — Install PR template

Read `teams-to-share/vms/shared-assets/pull_request_template.md` and write it to
`.github/pull_request_template.md` in the current VMS service repo root.

If `.github/pull_request_template.md` already exists, **skip this step** — do not overwrite.

> This template is the unified VMS PR template. GitHub uses it automatically when
> opening any pull request in the repo.

---

## Part 2 — Create AGENTS.md (instruction file)

Create or update `AGENTS.md` in the current VMS service repo root. This is the
project-level file Codex reads in addition to the global instruction file.

If `AGENTS.md` already exists, append the VMS block below under a `## VMS AI Standards`
heading. Do not overwrite existing content.

The `vms-sync` installer also fetches and writes
`teams-to-share/vms/instructions/global-codex.md` to `~/.codex/AGENTS.md`
(the Codex CLI global path).

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

### Skills available (~/.codex/skills/)

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
For Codex multi-role execution, also point the repo to `teams-to-share/vms/orchestration/README.md`
and use the canonical Planner → Developer → Reviewer prompts from `teams-to-share/vms/orchestration/prompts/`.

### Orchestration projection for Codex

Append these lines to the generated `AGENTS.md` VMS block:

```markdown
### Multi-tool orchestration

- Canonical workflow: `teams-to-share/vms/orchestration/README.md`
- Pipeline definition: `teams-to-share/vms/orchestration/pipeline/v1.yaml`
- Run state: `teams-to-share/vms/orchestration/pipeline/state-schema.md`
- Planner prompt: `teams-to-share/vms/orchestration/prompts/planner.md`
- Developer prompt: `teams-to-share/vms/orchestration/prompts/developer.md`
- Reviewer prompt: `teams-to-share/vms/orchestration/prompts/reviewer.md`
- Orchestrator prompt: `teams-to-share/vms/orchestration/prompts/orchestrator.md`
```

---

## Part 3 — MCP Servers (role-dependent)

Read the user's role from the install prompt (backend / frontend / fullstack) and
install only the MCPs listed for that role. Skip the others.

Register each MCP through `codex mcp add`, which persists the configuration in
`~/.codex/config.toml`.

If a server already exists, remove it first with `codex mcp remove <name>`, then
re-add it with the updated command/env settings.

Restart Codex CLI after saving so the new MCP config is loaded.

### Atlassian — ALL roles

```json
"atlassian": {
  "url": "https://mcp.atlassian.com/v1/sse"
}
```

No local credentials are written by this installer for Atlassian. Authentication is handled by the hosted Atlassian MCP flow. Codex supports native remote MCP servers, so use the direct `url` form instead of wrapping Atlassian with `mcp-remote`.
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
VMS AI Toolkit — Codex CLI Installation Complete

GLOBAL INSTRUCTION FILE:
  ✅ ~/.codex/AGENTS.md (full VMS AI harness — Codex CLI global)

PROJECT FILE:
  ✅ AGENTS.md (VMS AI Standards block appended in service repo root)

SKILLS (11/11 installed in ~/.codex/skills/):
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

MCP SERVERS (managed in ~/.codex/config.toml via `codex mcp` — restart Codex CLI to apply):
  ✅ Atlassian   [fullstack]
  ✅/— Figma     [frontend only]
  ✅/— Chrome    [frontend only]
  ✅/— DBHub     [backend only]

Next: Read instructions/global-codex.md for the full workflow.
Start a feature: invoke `skill-project-planning` or enter the orchestration flow through Planner.
```
