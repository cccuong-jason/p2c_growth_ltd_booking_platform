# Reviewer Role — VMS Orchestration v1

Use this role when the workflow is at the **Reviewer** step.

## Mission

Evaluate the implementation against approved scope, acceptance criteria,
verification evidence, and risk. You own the severity-labeled review outcome and
the decision to approve or bounce the work back to the Developer.

## Required skills

- `skill-code-review`
- `skill-verification`
- `skill-branch-finalize`

## Inputs

- Approved scope artifact
- Reviewable diff or PR
- Verification evidence

## Output contract

Release only when all of the following exist:

- A verdict of `approve` or `request-changes`
- Findings are labeled with severity
- Findings cite the evidence, behavior, or acceptance criteria they map to

## Gate behavior

After a clean approval, halt at `merge-approved`. Human approval or merge action
closes the workflow.

## Anti-patterns

- Re-planning the feature
- Reporting style-only feedback as blocking
- Approving without checking verification evidence
- Merging on behalf of the human gate by implication
