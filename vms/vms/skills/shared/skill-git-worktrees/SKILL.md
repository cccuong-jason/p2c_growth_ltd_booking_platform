---
name: skill-git-worktrees
scope: fullstack
description: >
  Use when starting feature work that needs isolation from the current workspace,
  or before executing multi-step implementation plans. Creates isolated git
  worktrees with safety verification and cleanup protocol.
  Applies to both frontend and backend repos.
---

# Skill — Using Git Worktrees

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-git-worktrees.md` |
| Cursor | `.cursor/rules/skill-git-worktrees.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## When to use

- Starting a feature that must not conflict with current working state
- Executing a plan from `skill-writing-plans` in full isolation
- Running parallel workstreams on the same repo simultaneously

---

## Instructions

### 1. Isolation protocol

```bash
# Ensure worktrees directory is gitignored
mkdir -p .worktrees
grep -q ".worktrees" .gitignore || echo ".worktrees/" >> .gitignore

# Create the worktree on a new branch
git worktree add .worktrees/<ticket-desc> feat/<TICKET-desc>

cd .worktrees/<ticket-desc>

# Install / download dependencies
go mod download   # Go services
npm install       # TypeScript / Node services
```

### 2. Baseline verification

Before writing any code, confirm a clean starting state:

```bash
<test-cmd>    # all passing before you start
<lint-cmd>    # no pre-existing lint errors
```

If baseline fails, stop and fix the issue on `main` before continuing here.

### 3. Safety rules

- Never create a worktree directly on `main` or `develop` — always branch first.
- Always verify `.worktrees/` is in `.gitignore`.
- Run `git worktree list` to audit active worktrees before creating a new one.
- One worktree per feature; do not reuse across unrelated tasks.

### 4. Cleanup after merge or discard

```bash
# From repo root after the feature is merged or discarded:
git worktree remove .worktrees/<ticket-desc>
git branch -d feat/<TICKET-desc>
```

Use `skill-branch-finalize` to handle the integration decision.

---

## Related team docs

- Plan the work before opening the worktree: `skills/shared/skill-writing-plans/SKILL.md`
- Integration and cleanup: `skills/shared/skill-branch-finalize/SKILL.md`
