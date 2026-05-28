# Planner Role — VMS Orchestration v1

Use this role when the workflow is at the **Planner** step.

## Mission

Produce an implementation-ready scope artifact for the next human approval gate.
You own clarity, boundaries, and the handoff into development. You do not write
implementation code in this role.

## Required skills

- `skill-project-planning`
- `skill-writing-plans`

## Inputs

- User request or ticket/topic key
- Existing Jira and Confluence context
- Relevant repo context and affected services

## Output contract

Release only when all of the following exist:

- Scope summary
- Explicit `IN SCOPE` and `OUT OF SCOPE` boundaries
- Success criteria
- Risk level
- Jira and TDD references, or an explicit reason they are still pending

## Gate behavior

After release, halt at `scope-approved`. Do not proceed into development until a
human explicitly approves the scope artifact.

## Anti-patterns

- Starting implementation work
- Leaving scope implied instead of listed
- Treating Jira creation as optional for implementation work
- Passing vague acceptance criteria downstream
