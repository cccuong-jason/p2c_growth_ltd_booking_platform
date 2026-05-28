---
name: skill-tdd
scope: fullstack
description: >
  Use when implementing any feature or bugfix, before writing implementation code.
  Enforces the Red-Green-Refactor TDD cycle. A failing test must exist BEFORE
  any implementation code is written. Applies to Go (backend) and
  TypeScript/React (frontend) — test commands and patterns differ by stack.
---

# Skill — Test-Driven Development (TDD)

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-tdd.md` |
| Cursor | `.cursor/rules/skill-tdd.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## When to use

- Before implementing any feature or bugfix
- When fixing a regression — write a test that reproduces the bug first
- After a plan from `skill-writing-plans` is approved

## The TDD cycle

```
RED → verify RED → GREEN → verify GREEN → REFACTOR → verify still GREEN
```

Never skip or reorder steps.

---

## Instructions

### 1. RED — Write the failing test

Write a test that describes the **exact behavior** you want, before any implementation.

Go example:
```go
func TestDispatcher_Send_WritesDeliveryLog(t *testing.T) {
    repo := &fakeLogRepo{}
    d := NewDispatcher(repo)
    err := d.Send(context.Background(), DispatchCommand{DispatchID: "abc"})
    require.NoError(t, err)
    require.Len(t, repo.inserted, 1)
}
```

TypeScript example:
```typescript
it('should return results sorted by severity', async () => {
    const { result } = renderHook(() => useVulnerabilities({ page: 1 }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data[0].severity).toBe('critical');
});
```

### 2. Verify RED — confirm it fails for the right reason

```bash
# Go
go test ./... -run TestDispatcher_Send_WritesDeliveryLog
# Expected: FAIL — "NewDispatcher undefined" or assertion failure
# NOT: a build error unrelated to the missing behavior

# TypeScript / Node
npm test -- --testNamePattern "should return results"
# Expected: 1 failing — missing export or assertion error
```

If it fails for the wrong reason, fix the test first.

### 3. GREEN — write minimum code to pass

Write only what the test demands. No extras, no speculative code.

### 4. Verify GREEN

```bash
<test-cmd> -run <TestName>   # target test passes
<test-cmd>                   # full suite — no regressions
```

### 5. REFACTOR — clean up without changing behavior

Improve structure, naming, and clarity. Then re-run the full suite to confirm GREEN.

---

## Hard rules

- **No implementation before a failing test.** Period.
- A test that was never RED is not a test.
- Debug prints are not a substitute for a test.
- Run `skill-verification` before claiming the task complete.

## Related team docs

- Atomic planning before TDD: `skills/shared/skill-writing-plans/SKILL.md`
- Evidence gate after TDD: `skills/shared/skill-verification/SKILL.md`
