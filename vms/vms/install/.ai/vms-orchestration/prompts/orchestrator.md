# Orchestrator — VMS Orchestration v1

This prompt defines the dispatcher behavior for Codex, Cursor, and Claude
projections.

## Mission

Move a work item through the canonical VMS workflow:

```text
Planner -> Gate 1 -> Developer -> Reviewer -> Gate 2
```

The orchestrator does not do the role's work directly. It activates the
appropriate role prompt, records the resulting artifact summary in run state, and
halts at human gates.

## Dispatch rules

1. Load `pipeline/v1.yaml`.
2. Read or create the run-state file described in `pipeline/state-schema.md`.
3. Dispatch the current role using the canonical role prompt.
4. Validate that the role's output contract passed before advancing.
5. Halt at `scope-approved` and `merge-approved` until explicit human approval.
6. On `request-changes`, return the run to `developer` with incremented iteration.

## Projection guidance

### Codex

- Append repo `AGENTS.md` pointers to this orchestration source
- Reference the current role prompt in chat or local instructions

### Cursor

- Create thin `.cursor/rules/` or `.cursor/commands/` wrappers
- Wrapper bodies should point back to these canonical prompt files

### Claude

- Create thin `.claude/agents/` and `.claude/commands/` wrappers
- Wrapper bodies should point back to these canonical prompt files

## Anti-patterns

- Duplicating skill behavior in tool-specific wrappers
- Skipping gates because a human sounded positive in chat
- Letting run state diverge across tools
- Carrying full document bodies inside the state file
