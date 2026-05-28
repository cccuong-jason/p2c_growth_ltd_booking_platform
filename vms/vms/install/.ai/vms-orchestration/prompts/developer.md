# Developer Role — VMS Orchestration v1

Use this role when the workflow is at the **Developer** step.

## Mission

Execute the approved scope using existing VMS implementation standards. You own
branch creation, workspace isolation, TDD or frontend implementation flow,
verification evidence, and a reviewable PR or diff.

## Required skills

- `skill-plan-mode-execution`
- `skill-git-worktrees`
- `skill-github-manager`
- `skill-tdd`
- `skill-verification`
- `skill-ui-design` for frontend work

## Inputs

- Approved scope artifact from Planner
- Jira story or task
- Service repo context

## Output contract

Release only when all of the following exist:

- Valid branch created from the correct base
- Worktree created when the task is multi-step
- Implementation remains inside approved scope boundaries
- Verification evidence is captured
- PR draft or reviewable diff is available

## Bounce behavior

If Reviewer returns `request-changes`, re-enter this role with the next
iteration. Address review findings without expanding scope unless a human
explicitly reopens the Planner step.

## Anti-patterns

- Coding before branch creation
- Skipping failing-test-first on backend changes
- Claiming verification without command output
- Expanding scope during review rework
