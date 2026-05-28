# VMS AI Toolkit — GitHub Copilot Installation Script

You are GitHub Copilot in agent mode. Execute every step below in order.
Confirm each step before moving to the next.

---

## Part 1 — Skills (all roles)

### Step 1 — Create the skills directory

```bash
mkdir -p .github/copilot/skills
```

Run this in the VMS service repo root.

### Step 2 — Install each skill

For each skill below, read the source SKILL.md and write it to
`.github/copilot/skills/<skill-name>.md` in the current repo.

| # | Read from | Write to |
|---|-----------|---------|
| 1 | `teams-to-share/vms/skills/shared/skill-plan-mode-execution/SKILL.md` | `.github/copilot/skills/skill-plan-mode-execution.md` |
| 2 | `teams-to-share/vms/skills/shared/skill-project-planning/SKILL.md` | `.github/copilot/skills/skill-project-planning.md` |
| 3 | `teams-to-share/vms/skills/shared/skill-github-manager/SKILL.md` | `.github/copilot/skills/skill-github-manager.md` |
| 4 | `teams-to-share/vms/skills/shared/skill-git-worktrees/SKILL.md` | `.github/copilot/skills/skill-git-worktrees.md` |
| 5 | `teams-to-share/vms/skills/shared/skill-writing-plans/SKILL.md` | `.github/copilot/skills/skill-writing-plans.md` |
| 6 | `teams-to-share/vms/skills/shared/skill-tdd/SKILL.md` | `.github/copilot/skills/skill-tdd.md` |
| 7 | `teams-to-share/vms/skills/shared/skill-ui-design/SKILL.md` | `.github/copilot/skills/skill-ui-design.md` |
| 8 | `teams-to-share/vms/skills/shared/skill-verification/SKILL.md` | `.github/copilot/skills/skill-verification.md` |
| 9 | `teams-to-share/vms/skills/shared/skill-code-review/SKILL.md` | `.github/copilot/skills/skill-code-review.md` |
| 10 | `teams-to-share/vms/skills/shared/skill-branch-finalize/SKILL.md` | `.github/copilot/skills/skill-branch-finalize.md` |
| 11 | `teams-to-share/vms/skills/shared/skill-knowledge-contribution/SKILL.md` | `.github/copilot/skills/skill-knowledge-contribution.md` |

### Step 3 — Verify skills

```bash
ls .github/copilot/skills/
```

Confirm all 10 `.md` files are present.

> Commit `.github/copilot/skills/` to the service repo so all Copilot users share
> the same standards automatically.

---

### Step 4 — Install PR template

Read `teams-to-share/vms/shared-assets/pull_request_template.md` and write it to
`.github/pull_request_template.md` in the current VMS service repo root.

If `.github/pull_request_template.md` already exists, **skip this step** — do not overwrite.

> This template is the unified VMS PR template. GitHub uses it automatically when
> opening any pull request in the repo.

---

## Part 2 — Global instruction file (auto-installed by `vms-sync`)

The `vms-sync` installer now automatically fetches and writes
`teams-to-share/vms/instructions/global-copilot.md` to
`~/.copilot/copilot-instructions.md` (the Copilot CLI global path).

**If the file already exists**, the installer will warn you, show the file size,
and ask for explicit confirmation before overwriting. A timestamped backup
(`.vms-backup-YYYYMMDD-HHMMSS`) is created automatically if you accept.

You are responsible for reviewing what will be overwritten. The installer
will never silently replace your existing content.

### Repo-specific instructions (optional, manual)

You may also create `.github/copilot-instructions.md` in each service repo for
project-specific rules. This is layered on top of the global file — Copilot
reads both. The `vms-sync` installer does **not** touch repo-specific files.

If the file already exists, append the VMS block below under a `## VMS AI Standards`
heading. Do not overwrite existing repo-specific content.

```markdown
## VMS AI Standards

You are working on a VMS service. Apply these standards to every response.

### Agentic mandates

| Mandate | Rule |
|---------|------|
| **Skill-First** | Invoke a relevant skill BEFORE any action on a repeatable task |
| **No Ghost Code** | Code written without a preceding failing test MUST be deleted |
| **Evidence Before Assertions** | Run tests/lint and show output before claiming any task done |
| **Branch First** | Feature branch must exist before the agent touches any file |

### Skills available (~/.copilot/skills/)

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

See `teams-to-share/vms/instructions/global-copilot.md` for the 8-phase VMS workflow.
```

---

## Part 3 — MCP Servers (role-dependent)

Read the user's role from the install prompt (backend / frontend / fullstack).
Add only the MCPs for that role to VS Code `settings.json`
(open with: Command Palette → "Open User Settings (JSON)").

### Atlassian — ALL roles

```json
"mcp": {
  "servers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"]
    }
  }
}
```

No local credentials are written by this installer for Atlassian. Authentication is handled by the hosted Atlassian MCP flow.
Guide: `mcp/atlassian.md`

### Figma — Frontend and Fullstack only

Add inside the `"servers"` block:

```json
"figma": {
  "command": "npx",
  "args": ["-y", "figma-mcp"],
  "env": {
    "FIGMA_API_TOKEN": "<your-figma-token>"
  }
}
```

Guide: `mcp/figma.md`

### Chrome (Playwright) — Frontend and Fullstack only

```json
"chrome": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp", "--browser", "chromium"]
}
```

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

Guide: `mcp/dbhub.md`

Tell the user to **reload VS Code** after saving settings.

---

## Part 4 — Report to the user

```
VMS AI Toolkit — Copilot Installation Complete

GLOBAL INSTRUCTION FILE:
  ✅ ~/.copilot/copilot-instructions.md (full VMS AI harness — Copilot CLI global)

SKILLS (11/11 installed in ~/.copilot/skills/):
  ✅ skill-plan-mode-execution.md [fullstack]
  ✅ skill-project-planning.md     [fullstack]
  ✅ skill-github-manager.md    [fullstack]
  ✅ skill-git-worktrees.md     [fullstack]
  ✅ skill-writing-plans.md     [fullstack]
  ✅ skill-tdd.md               [fullstack]
  ✅ skill-ui-design.md         [frontend]
  ✅ skill-verification.md      [fullstack]
  ✅ skill-code-review.md       [fullstack]
  ✅ skill-branch-finalize.md   [fullstack]
  ✅ skill-knowledge-contribution.md [fullstack]

MCP SERVERS (in VS Code settings.json — reload VS Code to apply):
  ✅ Atlassian   [fullstack]
  ✅/— Figma     [frontend only]
  ✅/— Chrome    [frontend only]
  ✅/— DBHub     [backend only]

Note: Repo-specific .github/copilot-instructions.md is NOT touched by the installer.
      Add project-specific rules there manually (architecture, test patterns, commands).

Next: Read instructions/global-copilot.md for the full workflow.
Start a feature: invoke skill-project-planning.
```
