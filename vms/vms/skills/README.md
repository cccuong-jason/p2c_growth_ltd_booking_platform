# Skills (VMS)

All VMS AI skills live in `shared/`. They are agent-agnostic and install into
Claude Code, GitHub Copilot, Cursor, and Gemini CLI from the same source file.
The shared orchestration layer lives separately under `../orchestration/` and
sequences these skills into Planner, Developer, and Reviewer ownership.

Each skill declares its **scope** in the YAML frontmatter:
- `fullstack` — applies to all engineers regardless of stack
- `frontend` — React/TypeScript work in `vms-community-fe` only
- `backend` — Go service work (vms-api-go, vms-notification-center, etc.) only

---

## Skills index

| Skill | Scope | When to invoke |
|-------|-------|---------------|
| [`skill-plan-mode-execution`](shared/skill-plan-mode-execution/SKILL.md) | **Fullstack** | Plan mode trigger — enforces FE/BE development workflow from plan to PR |
| [`skill-jira-planning`](shared/skill-jira-planning/SKILL.md) | **Fullstack** | Starting any feature — Jira hierarchy, Golden TDD, Confluence doc |
| [`skill-github-manager`](shared/skill-github-manager/SKILL.md) | **Fullstack** | Branch naming, commit format, pre-PR self-review |
| [`skill-git-worktrees`](shared/skill-git-worktrees/SKILL.md) | **Fullstack** | Isolated workspace before starting feature work |
| [`skill-writing-plans`](shared/skill-writing-plans/SKILL.md) | **Fullstack** | Atomic, dependency-ordered plan before any code |
| [`skill-tdd`](shared/skill-tdd/SKILL.md) | **Fullstack** | Red → Green → Refactor per task (Go + TypeScript examples) |
| [`skill-ui-design`](shared/skill-ui-design/SKILL.md) | **Frontend** | VMS design system — tokens, shadcn/ui, dark-first, severity colors |
| [`skill-verification`](shared/skill-verification/SKILL.md) | **Fullstack** | Evidence gate — tests + lint + build before claiming done |
| [`skill-code-review`](shared/skill-code-review/SKILL.md) | **Fullstack** | PR review with Critical / Medium / Minor severity on every comment |
| [`skill-branch-finalize`](shared/skill-branch-finalize/SKILL.md) | **Fullstack** | 4-option integration (PR / merge / keep / discard) |
| [`skill-knowledge-contribution`](shared/skill-knowledge-contribution/SKILL.md) | **Fullstack** | Feedback loop — contribute novel discoveries back to the shared playbook |

---

## Recommended invocation order

For the multi-tool role pipeline, see `../orchestration/README.md`.

```
skill-plan-mode-execution    ← [[PLAN]] mode: FE/BE workflow orchestrator
  → skill-project-planning          ← plan: TDD + project tracking hierarchy
  → skill-github-manager     ← branch: feat/VMS-XXX-desc
    → skill-git-worktrees    ← isolate: dedicated workspace
      → skill-writing-plans  ← plan: atomic tasks before code
        → skill-tdd          ← build: Red → Green → Refactor per task
        → skill-ui-design    ← build (frontend): design system compliance
      → skill-verification   ← verify: evidence before claiming done
      → skill-code-review    ← review: severity-graded PR review
    → skill-branch-finalize  ← ship: PR / merge / keep / discard
```

---

## Installing skills

See `../INSTALL.md` for one-prompt installation for Claude Code, Cursor, and Copilot.

Each skill's `SKILL.md` has an **Agent Installation** table at the top showing where
to place the file manually if needed.

---

## Adding new skills

1. Create `shared/<skill-name>/SKILL.md`
2. Include YAML frontmatter with `name`, `scope` (`fullstack`/`frontend`/`backend`), and `description`
3. Include an **Agent Installation** table
4. Add the skill to this README index
5. Add the skill to `../INSTALL.md` and the three `../install/for-*.md` scripts
