# VMS AI Toolkit — Cursor Installation Script

You are Cursor agent. Execute every step below in order. Confirm each step before
moving to the next. Do not skip steps or combine them.

---

## Part 1 — Skills (all roles)

### Step 1 — Create the rules directory

```bash
mkdir -p .cursor/rules
```

Run this in the VMS service repo root where you want the skills installed.

### Step 2 — Install each skill as a Cursor rule

For each skill below, read the source SKILL.md and write it to
`.cursor/rules/<skill-name>.mdc` in the current repo.

| # | Read from | Write to |
|---|-----------|---------|
| 1 | `teams-to-share/vms/skills/shared/skill-plan-mode-execution/SKILL.md` | `.cursor/rules/skill-plan-mode-execution.mdc` |
| 2 | `teams-to-share/vms/skills/shared/skill-project-planning/SKILL.md` | `.cursor/rules/skill-project-planning.mdc` |
| 3 | `teams-to-share/vms/skills/shared/skill-github-manager/SKILL.md` | `.cursor/rules/skill-github-manager.mdc` |
| 4 | `teams-to-share/vms/skills/shared/skill-git-worktrees/SKILL.md` | `.cursor/rules/skill-git-worktrees.mdc` |
| 5 | `teams-to-share/vms/skills/shared/skill-writing-plans/SKILL.md` | `.cursor/rules/skill-writing-plans.mdc` |
| 6 | `teams-to-share/vms/skills/shared/skill-tdd/SKILL.md` | `.cursor/rules/skill-tdd.mdc` |
| 7 | `teams-to-share/vms/skills/shared/skill-ui-design/SKILL.md` | `.cursor/rules/skill-ui-design.mdc` |
| 8 | `teams-to-share/vms/skills/shared/skill-verification/SKILL.md` | `.cursor/rules/skill-verification.mdc` |
| 9 | `teams-to-share/vms/skills/shared/skill-code-review/SKILL.md` | `.cursor/rules/skill-code-review.mdc` |
| 10 | `teams-to-share/vms/skills/shared/skill-branch-finalize/SKILL.md` | `.cursor/rules/skill-branch-finalize.mdc` |
| 11 | `teams-to-share/vms/skills/shared/skill-knowledge-contribution/SKILL.md` | `.cursor/rules/skill-knowledge-contribution.mdc` |

### Step 3 — Verify skills

```bash
ls .cursor/rules/
```

Confirm all 10 `.mdc` files are present before continuing.

> Commit `.cursor/rules/` to the service repo so all Cursor users on the team share
> the same standards automatically.

---

### Step 4 — Install PR template

Read `teams-to-share/vms/shared-assets/pull_request_template.md` and write it to
`.github/pull_request_template.md` in the current VMS service repo root.

If `.github/pull_request_template.md` already exists, **skip this step** — do not overwrite.

> This template is the unified VMS PR template. GitHub uses it automatically when
> opening any pull request in the repo.

---

## Part 2 — Create always-on VMS standards rule

Create `.cursor/rules/vms-standards.mdc` in the current VMS service repo root.
This rule is loaded automatically on every file match and enforces the core VMS mandates.

```markdown
---
description: "VMS team AI standards — always-on mandates and skill index"
globs: ["**/*"]
alwaysApply: true
---

# VMS AI Standards

You are working on a VMS service. Apply these standards to every session.

## Agentic mandates

| Mandate | Rule |
|---------|------|
| **Skill-First** | Invoke a relevant skill BEFORE any action on a repeatable task |
| **No Ghost Code** | Code written without a preceding failing test MUST be deleted |
| **Evidence Before Assertions** | Run tests/lint and show output before claiming any task done |
| **Branch First** | Feature branch must exist before the agent touches any file |

## Skills available (.cursor/rules/)

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

## Security gate

Never commit secrets, tokens, API keys, or customer data. Validate all external input at
trust boundaries. Stop and escalate on any security doubt.

## Full workflow

See `teams-to-share/vms/instructions/vms-ai-harness.md` for the 8-phase VMS workflow.

### Orchestration projection for Cursor

Create `.cursor/rules/vms-orchestration.mdc` with `alwaysApply: false` and point it to:

- `teams-to-share/vms/orchestration/README.md`
- `teams-to-share/vms/orchestration/pipeline/v1.yaml`
- `teams-to-share/vms/orchestration/pipeline/state-schema.md`
- `teams-to-share/vms/orchestration/prompts/planner.md`
- `teams-to-share/vms/orchestration/prompts/developer.md`
- `teams-to-share/vms/orchestration/prompts/reviewer.md`
- `teams-to-share/vms/orchestration/prompts/orchestrator.md`

If your team uses Cursor commands, also create thin wrappers under `.cursor/commands/`
for `role-planner`, `role-developer`, `role-reviewer`, and `vms-orchestrator`. The
wrapper body should reference the canonical prompt file rather than duplicating it.

---

## Part 3 — MCP Servers (role-dependent)

Read the user's role from the install prompt (backend / frontend / fullstack).
Install only the MCPs listed for that role.

Create or update `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project-scoped).
Add only the servers for the user's role.

### Atlassian — ALL roles

```json
"atlassian": {
  "url": "https://mcp.atlassian.com/v1/sse"
}
```

No local credentials are written by this installer for Atlassian. Authentication is handled by the hosted Atlassian MCP flow. Cursor supports native remote MCP servers, so use the direct `url` form instead of wrapping Atlassian with `mcp-remote`.
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

Ask the user for their Figma personal access token.
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

Ask the user for their DBHub API key and dev DSN.
Note: dev/staging DSN only — never production.
Guide: `mcp/dbhub.md`

Tell the user to **restart Cursor** after saving `mcp.json`.

---

## Part 4 — Report to the user

```
VMS AI Toolkit — Cursor Installation Complete

INSTRUCTION FILE:
  ✅ .cursor/rules/vms-standards.mdc (always-on VMS mandates + skill index)

SKILLS (11/11 installed in .cursor/rules/):
  ✅ skill-plan-mode-execution.mdc [fullstack]
  ✅ skill-project-planning.mdc     [fullstack]
  ✅ skill-github-manager.mdc    [fullstack]
  ✅ skill-git-worktrees.mdc     [fullstack]
  ✅ skill-writing-plans.mdc     [fullstack]
  ✅ skill-tdd.mdc               [fullstack]
  ✅ skill-ui-design.mdc         [frontend]
  ✅ skill-verification.mdc      [fullstack]
  ✅ skill-code-review.mdc       [fullstack]
  ✅ skill-branch-finalize.mdc   [fullstack]
  ✅ skill-knowledge-contribution.mdc [fullstack]

MCP SERVERS (in ~/.cursor/mcp.json — restart Cursor to apply):
  ✅ Atlassian   [fullstack]
  ✅/— Figma     [frontend only]
  ✅/— Chrome    [frontend only]
  ✅/— DBHub     [backend only]

Next: Read instructions/vms-ai-harness.md for the full workflow.
Start a feature: invoke `skill-project-planning` or enter the orchestration flow through Planner.
```
