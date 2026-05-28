---
name: skill-branch-finalize
scope: fullstack
description: >
  Use when implementation is complete and all verification passes. Guides branch
  finalization with 4 structured integration options: PR, merge, keep, or discard.
  Always run after skill-verification succeeds. Applies to both frontend and backend.
---

# Skill — Finishing a Development Branch

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-branch-finalize.md` |
| Cursor | `.cursor/rules/skill-branch-finalize.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## When to use

After `skill-verification` passes, use this skill to decide how to integrate and
clean up. Do not skip to merge without running verification first.

---

## Instructions

### 1. Final checklist

- [ ] Full test suite passes — 0 failures
- [ ] Lint — 0 errors
- [ ] Build — succeeds
- [ ] No TODO/FIXME left in changed files
- [ ] Ticket updated to reflect completion

### 2. Present integration options

Always present these 4 options to the human before acting:

| Option | When to use |
|--------|-------------|
| **A. Open PR** | Work ready for team review. Default for all shared repos. |
| **B. Local merge** | Small personal repo or pre-approved solo merge. |
| **C. Keep branch** | Work in progress; checkpoint only, nothing to merge yet. |
| **D. Discard** | Experiment failed; clean up entirely. |

### 3. Execute the choice

**Option A — Open PR**
```bash
git push origin <branch-name>
# Create PR using the repo's PR template
# Link ticket. Label AI-assisted if applicable. Request review.
```

**Option B — Local merge**
```bash
git checkout main
git merge --no-ff <branch-name>
git push origin main
```

**Option D — Discard**
```bash
git checkout main
git branch -D <branch-name>
```

### 4. Worktree cleanup

If a worktree was used (`skill-git-worktrees`), always remove it after integration:

```bash
git worktree list
git worktree remove .worktrees/<dir>
git branch -d feat/<branch-name>
```

---

## Related team docs

- Evidence gate before this step: `skills/shared/skill-verification/SKILL.md`
- Workspace isolation setup: `skills/shared/skill-git-worktrees/SKILL.md`
- Code review: `skills/shared/skill-code-review/SKILL.md`
