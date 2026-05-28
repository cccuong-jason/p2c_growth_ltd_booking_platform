---
name: skill-writing-plans
scope: fullstack
description: >
  Use when you have a spec or requirements for a multi-step task, before touching
  code. Creates atomic, dependency-ordered implementation plans with no
  placeholders. Invoke BEFORE implementing any feature with more than 2 actions.
  Applies to both Go (backend) and TypeScript/React (frontend).
---

# Skill — Writing Implementation Plans

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-writing-plans.md` |
| Cursor | `.cursor/rules/skill-writing-plans.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## When to use

Invoke BEFORE implementing any multi-step feature, refactor, or investigation that
has more than 2 distinct actions. Do not touch code until the plan is approved.

---

## Instructions

### 1. Atomic granularity rules

Each task in the plan MUST be:
- A **single action** completable in 2–5 minutes
- Include the **exact file path** to create or modify
- Include **exact test command** to verify completion
- Have **NO placeholders** (no TODO, TBD, "implement X later")
- Follow Red-Green-Refactor — failing test before implementation code

### 2. Plan format

```markdown
## Plan: <Feature Name>

**Problem:** One sentence describing the gap.
**Approach:** One sentence on the solution strategy.

### Tasks

- [ ] 1. Create `<path/to/file.go>` with `<Type>` skeleton
      Verify: `<build-cmd>` exits 0
- [ ] 2. Write failing test in `<path/to/file_test.go>` for `<Behavior>()`
      Verify: `<test-cmd> -run <TestName>` RED — 1 failing
- [ ] 3. Implement `<Behavior>()` with minimal logic
      Verify: `<test-cmd> -run <TestName>` GREEN — 1 passing
- [ ] 4. Run full suite and lint
      Verify: `<test-cmd> && <lint-cmd>` clean
```

### 3. Before finalizing the plan

- Confirm all file paths exist or are created by a prior task
- Confirm test commands are runnable today (not blocked on a future task)
- Confirm no task depends on a task listed below it

---

## Related team docs

- TDD cycle for each task: `skills/shared/skill-tdd/SKILL.md`
- Workspace isolation before starting: `skills/shared/skill-git-worktrees/SKILL.md`
- Evidence gate after all tasks: `skills/shared/skill-verification/SKILL.md`
