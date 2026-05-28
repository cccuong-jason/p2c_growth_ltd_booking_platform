---
name: skill-code-review
scope: fullstack
description: >
  Use when the user asks for PR review, code review, pre-merge review, or
  feedback on a branch or patch. Focuses on logic correctness, error potential,
  and business impact. Every comment carries a severity: Critical, Medium, or Minor.
  Applies to both Go (backend) and TypeScript/React (frontend) codebases.
---

# Skill — Code Review

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-code-review.md` |
| Cursor | `.cursor/rules/skill-code-review.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## When to use

- Reviewing a PR or branch before merge
- Pre-review before opening a PR
- Spot-checking AI-generated output before committing

---

## Severity scale

Every review comment MUST be prefixed with its severity so the owner can triage and focus.

| Severity | Meaning | Action required |
|----------|---------|-----------------|
| 🔴 **Critical** | Correctness failure, data loss risk, security vulnerability, or business logic collapse. Blocks merge. | Must be fixed before merge. |
| 🟡 **Medium** | Subtle bug, missing error handling on a recoverable path, or a design choice that will hurt the team later. Should be fixed before merge. | Fix before merge unless reviewer explicitly accepts the trade-off. |
| 🟢 **Minor** | Low-risk improvement — a safer API, a clearer variable name in a complex function, a missing edge case with low probability. Non-blocking. | Owner decides; acceptable to defer or decline. |

**Comment format:**
```
🔴 Critical — <concise description of the problem and why it matters>
Suggestion: <concrete fix>

🟡 Medium — <description>
Suggestion: <concrete fix>

🟢 Minor — <description>
Suggestion: <concrete fix or leave as-is>
```

---

## Review criteria

Focus **only** on the following. Do not comment on anything outside this list.

### 1. Logic correctness
- Does the implementation match the stated intent and the ticket/spec?
- Are conditional branches correct? Are boundary conditions handled?
- Is shared or concurrent state accessed safely?

### 2. Error handling and failure modes
- Are errors propagated with enough context to diagnose in production?
- Are partial failures handled — what happens if step 2 fails after step 1 succeeds?
- Are external calls (HTTP, DB, Kafka, gRPC) guarded against timeouts and transient errors?

### 3. Business logic and data integrity
- Could this change cause incorrect data to be stored, surfaced, or deleted?
- Are invariants preserved (e.g., idempotency, ordering guarantees, state machine transitions)?
- Does the change respect existing contracts — API shape, event schema, DB constraints?

### 4. Security
- Is external input validated at trust boundaries before use?
- Are there injection risks (SQL, shell, template)?
- Are secrets, tokens, or PII handled safely — not logged, not exposed in errors?
- Are authorization checks present and correctly scoped?

### 5. Test coverage
- Does the change have tests that would catch a regression?
- Are critical paths (error branches, edge cases) tested, not just the happy path?
- Do tests verify behavior, not implementation details?

---

## What to skip

Do not comment on:
- Spelling or grammar in comments or strings
- Code formatting or whitespace — that is the linter's job
- Naming style (camelCase vs snake_case) — defer to project conventions unless it causes real confusion
- Personal preferences with no correctness or safety implication

---

## Review summary format

End every review with a summary table:

```
## Review summary

| Severity | Count | Blocking? |
|----------|-------|-----------|
| 🔴 Critical | N | Yes |
| 🟡 Medium | N | Yes (unless accepted) |
| 🟢 Minor | N | No |

**Verdict:** APPROVE / REQUEST CHANGES / NEEDS DISCUSSION
```

---

## Related team docs

- TDD cycle for any fixes: `skills/shared/skill-tdd/SKILL.md`
- Evidence gate before merge: `skills/shared/skill-verification/SKILL.md`
- Harness and PR safety: `instructions/vms-ai-harness.md`
