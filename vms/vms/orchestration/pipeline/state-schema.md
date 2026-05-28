# VMS Orchestration Run State

The orchestration layer writes a tool-agnostic JSON state file after each role
handoff and each gate decision. This allows a run started in one tool to resume
in another without relying on hidden session state.

## Storage

Recommended path:

```text
.ai/vms-orchestration/<ticket-or-topic>.json
```

The path is repo-local and should be gitignored by service repos that use the
orchestration projection.

## Schema

```json
{
  "schemaVersion": 1,
  "topic": "VMS-1234 or short-topic-slug",
  "mode": "planning | implementation",
  "tool": "codex | cursor | claude",
  "currentStep": "planner | gate:scope-approved | developer | reviewer | gate:merge-approved | done",
  "artifacts": {
    "scopeSummary": {
      "summary": "one-line description",
      "jiraKey": "VMS-1234",
      "tddUrl": "https://...",
      "status": "draft | approved"
    },
    "developer": {
      "branch": "feat/VMS-1234-short-desc",
      "worktree": ".worktrees/VMS-1234-short-desc",
      "verification": "tests, lint, build summary",
      "prUrl": "https://..."
    },
    "reviewer": {
      "verdict": "approve | request-changes",
      "summary": "one-line description"
    }
  },
  "gates": {
    "scope-approved": {
      "status": "pending | approved",
      "approvedBy": "human-handle | null",
      "approvedAt": "ISO-8601 | null"
    },
    "merge-approved": {
      "status": "pending | approved",
      "approvedBy": "human-handle | null",
      "approvedAt": "ISO-8601 | null"
    }
  },
  "history": [
    {
      "step": "planner",
      "iteration": 1,
      "result": "released | bounced | failed",
      "summary": "one-line description",
      "startedAt": "ISO-8601",
      "endedAt": "ISO-8601",
      "tool": "codex | cursor | claude"
    }
  ],
  "plan": [
    { "step": "planner", "status": "done | current | pending" },
    { "step": "gate:scope-approved", "status": "approved | pending" },
    { "step": "developer", "status": "done | current | pending" },
    { "step": "reviewer", "status": "done | current | pending" },
    { "step": "gate:merge-approved", "status": "approved | pending" }
  ],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## Rules

1. History is append-only.
2. Only the active orchestrator writes the state file.
3. State stores references and summaries, not full documents or diffs.
4. Gate approval must be explicit; chat sentiment never mutates gate state.
5. `request-changes` returns ownership to the Developer with the next iteration number.

## Rendering

Every orchestrator projection should render the same checklist from `plan`:

```markdown
## VMS orchestration plan

- [x] Planner
- [x] Gate 1 — scope-approved
- [ ] Developer
- [ ] Reviewer
- [ ] Gate 2 — merge-approved
```
