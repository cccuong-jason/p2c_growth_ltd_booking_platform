# VMS AI Toolkit — Quick Install

The VMS AI toolkit gives your AI agent the skills and MCP connections it needs to
follow VMS standards at every phase of feature delivery. For Codex, Cursor, and
Claude, it also points the runtime at the shared Planner -> Developer ->
Reviewer orchestration source under `teams-to-share/vms/orchestration/`.

---

## ⚡ Fastest path — one-liner installer (recommended)

**Prerequisites:** `gh` CLI installed and authenticated (`gh auth login`).
Access to `opswat-eng/ai-playbook` is required — the script will not run without it.

```bash
bash <(gh api repos/opswat-eng/ai-playbook/contents/teams-to-share/vms/install/install.sh --jq '.content' | base64 -d)
```

The script will ask for your agent (Claude Code / Copilot / Cursor / Codex CLI / Gemini CLI) and role
(backend / frontend / fullstack), then install all 11 skills and create the
agent-specific instruction file automatically.

**To update skills at any time**, re-run with `--update`:

```bash
bash <(gh api repos/opswat-eng/ai-playbook/contents/teams-to-share/vms/install/install.sh --jq '.content' | base64 -d) --agent claude-code --role backend --update
```

Replace `claude-code` with one of: `claude-code|copilot|cursor|codex|gemini`.

> **Security note:** The installer is gated behind your GitHub authentication.
> Only members with access to `opswat-eng/ai-playbook` can download or run it —
> no tokens to share, no leakage risk.

After the script completes, follow the **MCP setup** instructions it prints
(credentials are personal and cannot be automated).

---

## Manual install — agent prompts

If you prefer to let your AI agent do the install from inside the cloned repo,
pick your role and agent below and paste the prompt. The agent installs all 11 skills and configures the right MCP servers automatically.

### Step 0 — Know your role

| Role | Skills to install | MCPs to install |
|------|-------------------|-----------------|
| **Backend engineer** | All 11 skills (fullstack + backend) | Atlassian + DBHub |
| **Frontend engineer** | All 11 skills (fullstack + frontend) | Atlassian + Figma + Chrome |
| **Fullstack engineer** | All 11 skills | All 4 MCPs |

> `skill-ui-design` is included for all roles because backend engineers still need to
> understand the frontend standards for cross-team code review.

---

## Claude Code

### Backend engineer
```
Read teams-to-share/vms/install/for-claude-code.md, follow all steps, and at the MCP
section install only: Atlassian and DBHub.
```

### Frontend engineer
```
Read teams-to-share/vms/install/for-claude-code.md, follow all steps, and at the MCP
section install only: Atlassian, Figma, and Chrome.
```

### Fullstack engineer
```
Read teams-to-share/vms/install/for-claude-code.md and follow all steps including all 4 MCPs.
```

---

## Cursor (Agent mode)

### Backend engineer
```
Read teams-to-share/vms/install/for-cursor.md, follow all steps, and at the MCP
section install only: Atlassian and DBHub.
```

### Frontend engineer
```
Read teams-to-share/vms/install/for-cursor.md, follow all steps, and at the MCP
section install only: Atlassian, Figma, and Chrome.
```

### Fullstack engineer
```
Read teams-to-share/vms/install/for-cursor.md and follow all steps including all 4 MCPs.
```

---

## GitHub Copilot (VS Code — Agent mode)

### Backend engineer
```
Read teams-to-share/vms/install/for-copilot.md, follow all steps, and at the MCP
section install only: Atlassian and DBHub.
```

### Frontend engineer
```
Read teams-to-share/vms/install/for-copilot.md, follow all steps, and at the MCP
section install only: Atlassian, Figma, and Chrome.
```

### Fullstack engineer
```
Read teams-to-share/vms/install/for-copilot.md and follow all steps including all 4 MCPs.
```

---

## Codex CLI

### Backend engineer
```
Read teams-to-share/vms/install/for-codex.md, follow all steps, and at the MCP
section install only: Atlassian and DBHub.
```

### Frontend engineer
```
Read teams-to-share/vms/install/for-codex.md, follow all steps, and at the MCP
section install only: Atlassian, Figma, and Chrome.
```

### Fullstack engineer
```
Read teams-to-share/vms/install/for-codex.md and follow all steps including all 4 MCPs.
```

---

## Gemini CLI

### Backend engineer
```
Read teams-to-share/vms/install/for-gemini.md, follow all steps, and at the MCP
section install only: Atlassian and DBHub.
```

### Frontend engineer
```
Read teams-to-share/vms/install/for-gemini.md, follow all steps, and at the MCP
section install only: Atlassian, Figma, and Chrome.
```

### Fullstack engineer
```
Read teams-to-share/vms/install/for-gemini.md and follow all steps including all 4 MCPs.
```

---

## What gets installed

### Instruction files (agent-specific)

| Agent | File created | What it does |
|-------|-------------|--------------|
| Claude Code | `CLAUDE.md` in service repo root | Always-on VMS mandates + skill index loaded every session |
| Cursor | `.cursor/rules/vms-standards.mdc` (`alwaysApply: true`) | Always-on rule enforcing mandates + skill index |
| Copilot | `.github/copilot-instructions.md` in service repo root | Always-on context file Copilot reads for every request |
| Codex CLI | `AGENTS.md` in service repo root | Always-on VMS mandates + skill index loaded every session |
| Gemini CLI | `GEMINI.md` in service repo root | Always-on context file Gemini reads for every request |


| Skill | Scope | Covers |
|-------|-------|--------|
| `skill-plan-mode-execution` | Fullstack | Plan mode workflow — FE/BE development process from plan to PR |
| `skill-project-planning` | Fullstack | Project planning hierarchy + TDD, Confluence document standard |
| `skill-github-manager` | Fullstack | Branch naming, PR template, commit format |
| `skill-git-worktrees` | Fullstack | Isolated workspace creation and cleanup |
| `skill-writing-plans` | Fullstack | Atomic plans before touching code |
| `skill-tdd` | Fullstack | Red → Green → Refactor (Go + TypeScript examples) |
| `skill-ui-design` | **Frontend** | VMS design system — Tailwind tokens, shadcn/ui, severity colors |
| `skill-verification` | Fullstack | Evidence gate before claiming done |
| `skill-code-review` | Fullstack | PR review with Critical / Medium / Minor severity |
| `skill-branch-finalize` | Fullstack | 4-option integration workflow |
| `skill-knowledge-contribution` | Fullstack | Feedback loop — contribute novel discoveries back to the shared playbook |

### Shared orchestration layer

| Asset | Audience | What it does |
|-------|----------|--------------|
| `orchestration/README.md` | Codex, Cursor, Claude | Canonical Planner -> Developer -> Reviewer flow and gates |
| `orchestration/pipeline/v1.yaml` | Codex, Cursor, Claude | Tool-agnostic role roster, contract checks, and defaults |
| `orchestration/prompts/*.md` | Codex, Cursor, Claude | Thin-wrapper source for role activation and orchestration dispatch |

### Shared assets

| Asset | File installed | What it does |
|-------|---------------|--------------|
| PR template | `.github/pull_request_template.md` in service repo root | Unified VMS PR template (stack-agnostic; FE/BE sections optional) |

### MCP servers (by role)

| MCP | Scope | Purpose |
|-----|-------|---------|
| Atlassian | **Fullstack** | Jira + Confluence read/write |
| Figma | **Frontend only** | Design spec inspection before writing components |
| Chrome (Playwright) | **Frontend only** | Visual dark-mode check and accessibility audit |
| DBHub | **Backend only** | Read-only schema inspection before migrations |

---

## After installation

- Read `instructions/vms-ai-harness.md` for the full VMS workflow map
- If you use Codex, Cursor, or Claude, read `orchestration/README.md` for the role pipeline and gate model
- Read `mcp/README.md` for the phase-by-phase MCP usage guide
- Start a feature: invoke `skill-project-planning`
