---
name: skill-verification
scope: fullstack
description: >
  Use when about to claim work is complete, fixed, or passing — before committing
  or creating PRs. Run verification commands and confirm output before making
  any success claims. Evidence before assertions, always. Frontend adds a visual
  dark-mode check; backend adds integration/smoke tests.
---

# Skill — Verification Before Completion

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-verification.md` |
| Cursor | `.cursor/rules/skill-verification.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## The rule

**Never claim success without evidence.** Run verification commands first, read the
output, then state the result with evidence attached.

---

## Verification gate — run in order

### 1. Tests

```bash
# Go
go test ./...
# Required: ok for all packages, zero FAIL lines

# TypeScript / Node
npm test
# Required: X passing, 0 failing
```

### 2. Lint

```bash
# Go
golangci-lint run

# TypeScript
npm run lint

# Required: 0 errors (pre-existing warnings acceptable)
```

### 3. Build

```bash
# Go
go build ./...

# TypeScript
npm run build

# Required: exits 0, no type errors, no compilation errors
```

### 4. Integration / smoke (when applicable)

Run integration tests or a local smoke check before claiming environment-dependent
behavior works.

---

## How to report completion

**Correct format:**
> "All 23 tests pass (`go test ./...`: ok in 3 packages, 0 FAIL). Lint clean. Build succeeds."

**Never say:**
> "The implementation is complete and should work."
> "Tests should pass now."
> "I believe this is correct."

## If verification fails

1. Read the full failure output
2. Identify the root cause — not just the symptom
3. Fix the root cause
4. Re-run verification from Step 1

---

## Related team docs

- Branch finalization after verification: `skills/shared/skill-branch-finalize/SKILL.md`
- Code review before merge: `skills/shared/skill-code-review/SKILL.md`
