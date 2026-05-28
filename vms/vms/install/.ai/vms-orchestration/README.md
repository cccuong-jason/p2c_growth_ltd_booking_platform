# VMS Orchestration v1

This directory is the canonical source for the VMS multi-tool orchestration layer.
It sequences existing VMS skills into a role-based workflow for **Planner**,
**Developer**, and **Reviewer** without duplicating implementation standards.

The workflow is:

```text
Planner -> Gate 1 (scope-approved) -> Developer -> Reviewer -> Gate 2 (merge-approved) -> done
```

## Purpose

- Keep orchestration logic in one shared place under `teams-to-share/vms/`
- Reuse existing VMS skills as the behavioral authority
- Allow Codex, Cursor, and Claude to project thin wrappers from the same source
- Persist run state so a workflow can be resumed across tools

## What lives here

| Path | Purpose |
|------|---------|
| `project-context.md` | Shared project defaults resolved by every role |
| `pipeline/v1.yaml` | Role roster, gates, contract checks, and default commands |
| `pipeline/state-schema.md` | Tool-agnostic run-state file format |
| `prompts/planner.md` | Canonical Planner role prompt |
| `prompts/developer.md` | Canonical Developer role prompt |
| `prompts/reviewer.md` | Canonical Reviewer role prompt |
| `prompts/orchestrator.md` | Canonical dispatcher prompt |

## Role bindings

| Role | Owns | Primary VMS skills |
|------|------|--------------------|
| `planner` | Scope, plan artifact, Jira/Confluence alignment | `skill-project-planning`, `skill-writing-plans` |
| `developer` | Branch/worktree, TDD, implementation, verification, PR draft | `skill-plan-mode-execution`, `skill-git-worktrees`, `skill-github-manager`, `skill-tdd`, `skill-verification` |
| `reviewer` | Severity-based review, verdict, bounce decision | `skill-code-review`, `skill-verification`, `skill-branch-finalize` |

Frontend-specific work additionally invokes `skill-ui-design`.

## Gates

| Gate | Position | Meaning |
|------|----------|---------|
| `scope-approved` | After Planner | Human approves scope, in-scope and out-of-scope boundaries, and success criteria before implementation starts |
| `merge-approved` | After Reviewer | Human accepts the review outcome and approves merge or closure |

## Design rules

1. Skills remain the authority for how work is performed.
2. Orchestration only decides who owns the next step and what artifact must exist.
3. Run state stores references and summaries, not full document bodies.
4. No gate is inferred from chat text; approval must be explicit.
5. v1 supports Codex, Cursor, and Claude projections first. Other tools may reference the canonical docs without a dedicated projection yet.
