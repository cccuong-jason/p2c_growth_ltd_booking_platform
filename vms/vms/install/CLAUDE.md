## VMS AI Standards

You are working on a VMS service. Apply these standards to every session.

### Agentic mandates

| Mandate | Rule |
|---------|------|
| **Skill-First** | Invoke a relevant skill BEFORE any action on a repeatable task |
| **No Ghost Code** | Code written without a preceding failing test MUST be deleted |
| **Evidence Before Assertions** | Run tests/lint and show output before claiming any task done |
| **Branch First** | Feature branch must exist before the agent touches any file |

### Skills available (~/.claude/skills/)

| Skill | Scope | Invoke when |
|-------|-------|------------|
| `skill-project-planning` | Fullstack | Starting any feature — project planning hierarchy + Golden TDD |
| `skill-github-manager` | Fullstack | Creating branches, commits, or PRs |
| `skill-git-worktrees` | Fullstack | Starting multi-step feature work |
| `skill-writing-plans` | Fullstack | Before touching code on any task with 2+ actions |
| `skill-tdd` | Fullstack | Implementing any feature or bugfix |
| `skill-ui-design` | Frontend | Any UI component or page work |
| `skill-verification` | Fullstack | Before claiming any task complete |
| `skill-code-review` | Fullstack | Reviewing any PR or diff |
| `skill-branch-finalize` | Fullstack | After verification passes — integrating work |

### Security gate

Never commit secrets, tokens, API keys, or customer data. Validate all external input at
trust boundaries. Stop and escalate on any security doubt.
