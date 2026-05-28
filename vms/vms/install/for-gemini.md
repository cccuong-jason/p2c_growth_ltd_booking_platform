# VMS AI Toolkit — Gemini CLI Installation Script

You are Gemini CLI. Execute every step below in order. Confirm each step before
moving to the next. Do not skip steps or combine them.

---

## Part 1 — Skills (all roles)

### Step 1 — Create the skills directory

```bash
mkdir -p ~/.gemini/skills
```

### Step 2 — Install each skill

For each skill below, read the source SKILL.md and write it to
`~/.gemini/skills/<skill-name>/SKILL.md`. Create the subdirectory if it does not exist.

| # | Read from | Write to |
|---|-----------|---------|
| 1 | `teams-to-share/vms/skills/shared/skill-plan-mode-execution/SKILL.md` | `~/.gemini/skills/skill-plan-mode-execution/SKILL.md` |
| 2 | `teams-to-share/vms/skills/shared/skill-project-planning/SKILL.md` | `~/.gemini/skills/skill-project-planning/SKILL.md` |
| 3 | `teams-to-share/vms/skills/shared/skill-github-manager/SKILL.md` | `~/.gemini/skills/skill-github-manager/SKILL.md` |
| 4 | `teams-to-share/vms/skills/shared/skill-git-worktrees/SKILL.md` | `~/.gemini/skills/skill-git-worktrees/SKILL.md` |
| 5 | `teams-to-share/vms/skills/shared/skill-writing-plans/SKILL.md` | `~/.gemini/skills/skill-writing-plans/SKILL.md` |
| 6 | `teams-to-share/vms/skills/shared/skill-tdd/SKILL.md` | `~/.gemini/skills/skill-tdd/SKILL.md` |
| 7 | `teams-to-share/vms/skills/shared/skill-ui-design/SKILL.md` | `~/.gemini/skills/skill-ui-design/SKILL.md` |
| 8 | `teams-to-share/vms/skills/shared/skill-verification/SKILL.md` | `~/.gemini/skills/skill-verification/SKILL.md` |
| 9 | `teams-to-share/vms/skills/shared/skill-code-review/SKILL.md` | `~/.gemini/skills/skill-code-review/SKILL.md` |
| 10 | `teams-to-share/vms/skills/shared/skill-branch-finalize/SKILL.md` | `~/.gemini/skills/skill-branch-finalize/SKILL.md` |
| 11 | `teams-to-share/vms/skills/shared/skill-knowledge-contribution/SKILL.md` | `~/.gemini/skills/skill-knowledge-contribution/SKILL.md` |

### Step 3 — Verify skills

```bash
ls ~/.gemini/skills/
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

## Part 2 — Create GEMINI.md (instruction file)

Create or update `GEMINI.md` in the **current VMS service repo root**. This is the
project-level file Gemini CLI reads in addition to the global instruction file.

If `GEMINI.md` already exists, append the VMS block below under a `## VMS AI Standards`
heading. Do not overwrite existing content.

The `vms-sync` installer also fetches and writes
`teams-to-share/vms/instructions/global-gemini.md` to `~/.gemini/GEMINI.md`
(the Gemini CLI global path).

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

### Skills available (~/.gemini/skills/)

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

Tip: Inject a skill inline when needed with `@~/.gemini/skills/<skill-name>/SKILL.md`.

### Security gate

Never commit secrets, tokens, API keys, or customer data. Validate all external input at
trust boundaries. Stop and escalate on any security doubt.

### Full workflow

See `teams-to-share/vms/instructions/vms-ai-harness.md` for the 8-phase VMS workflow.
```

---

## Part 3 — MCP Servers (role-dependent)

Read the user's role from the install prompt (backend / frontend / fullstack) and
install only the MCPs listed for that role. Skip the others.

Add each MCP to `~/.gemini/settings.json`. If the file does not exist, create it
with `{ "mcpServers": {} }` first, then add each server entry.

JSON structure: `{ "mcpServers": { ... } }` — same servers as the other agents.
Restart Gemini CLI after saving so the new MCP config is loaded.

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
VMS AI Toolkit — Gemini CLI Installation Complete

GLOBAL INSTRUCTION FILE:
  ✅ ~/.gemini/GEMINI.md (full VMS AI harness — Gemini CLI global)

PROJECT FILE:
  ✅ GEMINI.md (VMS AI Standards block appended in service repo root)

SKILLS (11/11 installed in ~/.gemini/skills/):
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

MCP SERVERS (in ~/.gemini/settings.json — restart Gemini CLI to apply):
  ✅ Atlassian   [fullstack]
  ✅/— Figma     [frontend only]
  ✅/— Chrome    [frontend only]
  ✅/— DBHub     [backend only]

Next: Read instructions/global-gemini.md for the full workflow.
Start a feature: invoke skill-project-planning.
```
