---
name: skill-github-manager
scope: fullstack
description: >
  Use when creating branches, opening PRs, writing commits, or doing any git
  workflow task on a VMS repository. Enforces branch naming conventions,
  commit message format, PR template usage, and mandatory self-review.
  Applies to both frontend (vms-community-fe) and backend (vms-api-go, etc.) repos.
---

# Skill — GitHub & Branch Management

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-github-manager.md` |
| Cursor | `.cursor/rules/skill-github-manager.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## Critical — Non-Negotiable

Before opening **any** PR:

1. Run: `cat .github/pull_request_template.md` (lowercase filename — actual file on disk)
2. Use that file **verbatim** as the `--body` skeleton — fill in each section.
3. **NEVER** write a custom body format. **NEVER** omit sections.

```bash
# Correct pattern every time:
BODY=$(cat .github/pull_request_template.md)
gh pr create --title "..." --body "$BODY"
```

> These rules apply to every repo, every PR, every agent (Claude, Copilot, Cursor, Gemini).

---

## Scope

**Fullstack** — applies identically to frontend and backend repos.

## When to use

- Before creating any branch (ticket must exist first)
- Before writing a commit message
- Before opening a PR

---

## Instructions

### 1. Branch naming convention

```
feat/<VMS-TICKET>-<short-desc>    — new features
fix/<VMS-TICKET>-<short-desc>     — bug fixes
chore/<VMS-TICKET>-<short-desc>   — maintenance, deps, config
```

Examples:
- `feat/VMS-124-webhook-delivery`
- `fix/VMS-301-null-pointer-on-empty-payload`
- `chore/VMS-089-update-go-deps`

### 2. Branch creation protocol

**Mandatory:** Create the branch BEFORE any code changes.

1. Identify the Jira ticket (`VMS-<ID>`). If none exists, create one via `skill-project-planning` first.
2. Create the branch: `git checkout -b feat/VMS-<ID>-<short-desc>`
3. If using worktrees, use `skill-git-worktrees` to set up the isolated workspace.

### 3. Commit message format

```
<type>(<scope>): <short summary in present tense>

<body — what and why, not how. Wrap at 72 chars.>

Refs: VMS-<TICKET-ID>
```

Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`

Scope (optional): service or package name, e.g. `dispatcher`, `watch-list`, `auth`

### 4. Pre-PR self-review checklist

Before opening the PR, the agent MUST verify:

- [ ] No secrets, tokens, or `.env` values in the diff
- [ ] No debug prints or temporary code left in changed files
- [ ] External inputs validated at trust boundaries
- [ ] No N+1 queries or blocking calls in hot paths (backend)
- [ ] No hardcoded colors, raw Radix primitives, or custom z-index (frontend)
- [ ] Tests added or updated for changed behavior

### 5. PR description

Always use the repo's `.github/pull_request_template.md` (lowercase). Never write a PR description
from scratch. Link the Jira ticket in the description. Request at least one human reviewer.

---

## Related team docs

- Ticket creation: `skills/shared/skill-jira-planning/SKILL.md`
- Workspace isolation: `skills/shared/skill-git-worktrees/SKILL.md`
- Evidence gate: `skills/shared/skill-verification/SKILL.md`
- MCP for Jira: `mcp/atlassian.md`
