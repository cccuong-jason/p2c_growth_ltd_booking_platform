# VMS Orchestration v1

Use the repo-local orchestration runtime when a task should move through
`planner -> developer -> reviewer`.

## Local runtime

- `.ai/vms-orchestration/README.md`
- `.ai/vms-orchestration/project-context.md`
- `.ai/vms-orchestration/pipeline/v1.yaml`
- `.ai/vms-orchestration/pipeline/state-schema.md`

## Role prompts

- Planner: `.ai/vms-orchestration/prompts/planner.md`
- Developer: `.ai/vms-orchestration/prompts/developer.md`
- Reviewer: `.ai/vms-orchestration/prompts/reviewer.md`
- Orchestrator: `.ai/vms-orchestration/prompts/orchestrator.md`

## Run-state convention

- Store run state at `.ai/vms-orchestration/*.json`
- Read or create the state file before dispatching a role
- Keep history append-only and halt at `scope-approved` and `merge-approved`

## Operating rules

1. Skills remain authoritative for how work is executed.
2. The orchestrator only selects the next role, validates the contract, and updates run state.
3. Do not infer gate approval from sentiment in chat; require explicit human approval.
