---
name: skill-plan-mode-execution
scope: fullstack
description: >
  Use when starting any planned task in [[PLAN]] mode or when a user asks to
  implement a feature, fix, or migration. Enforces the VMS end-to-end development
  workflow: Plan → Jira → Branch → Implement → Verify → PR. FE and BE paths
  diverge at the implementation and verification phases.
---

# Skill — Plan Mode Execution Workflow

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-plan-mode-execution.md` |
| Cursor | `.cursor/rules/skill-plan-mode-execution.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## When to use

- When the user activates `[[PLAN]]` mode for any feature, fix, or migration
- When transitioning from a completed plan to active implementation
- When the user says "proceed", "start", "implement it", or similar after a plan is approved

---

## The VMS Development Workflow

### Frontend (FE) — `vms-community-fe` (React + TypeScript + Tailwind)

```
PLAN → JIRA → BRANCH → IMPLEMENT → VERIFY (build + visual QA) → PR
```

### Backend (BE) — Go services (`vms-api-go`, `vms-notification-center`, etc.)

```
PLAN → JIRA → BRANCH → TDD (failing test first) → IMPLEMENT → VERIFY → PR
```

---

## Phase-by-phase instructions

### 1. PLAN — Confirm scope before anything else

Before creating a Jira issue or touching any file:

1. **Present a plan summary** to the user with:
   - What will change (exact files and components)
   - What will NOT change (explicitly list out-of-scope paths)
   - Success criteria (what "done" looks like)
   - Risk level (Low / Medium / High) with rationale
2. **For high-risk changes**, include a rollback approach (e.g., feature flag, revert commit, DB migration down script)
3. **Wait for explicit approval** before proceeding — never assume silence is consent

**Scope boundary template:**
```
✅ IN SCOPE:   src/components/Layout.tsx, src/App.tsx, src/hooks/use-toast.ts
❌ OUT OF SCOPE: src/pages/**, src/api/**, generated files (sqlc/, openapi/)
```

**Do NOT proceed if:**
- The scope is ambiguous
- The plan touches more than 5 files and no breakdown exists
- A DB schema change is involved without a reviewed migration plan

---

### 2. JIRA — Create tickets before any code

**Skill:** `skill-project-planning`
**MCP:** Atlassian (required)

Rules:
- Every implementation must have a Jira Story (or at minimum a Task) created **before branching**
- Story summary format: `[<Area>] <verb> <object>` (e.g., `[Blue Line Migration] Replace Layout sidebar with SidebarLayout`)
- Story description must include: scope, affected files, acceptance criteria
- If a parent Epic exists, set the `parent` field
- Note the Story key (e.g., `VMS-302`) — it becomes the branch name prefix

**Skip Jira creation only if:**
- An existing ticket already covers the exact scope (link it)
- The change is a hotfix tracked under an existing incident ticket

---

### 3. BRANCH — Branch before any code change

**Skill:** `skill-github-manager`

Rules:
- Branch from the **latest default branch** (`develop`) — never from a feature branch unless explicitly approved
- Branch must be created **before the first file edit** — no exceptions
- Branch naming:

```
feat/<VMS-TICKET>-<short-desc>    new features
fix/<VMS-TICKET>-<short-desc>     bug fixes
chore/<VMS-TICKET>-<short-desc>   maintenance / refactors
```

Commands:
```bash
git checkout develop
git pull origin develop
git checkout -b feat/VMS-302-blueline-app-shell
```

**Do NOT work on `develop` or `main`** — all agent work happens on feature branches.

---

### 4A. IMPLEMENT (Frontend)

**Skills:** `skill-writing-plans` + `skill-ui-design`
**MCPs:** Figma (before code) + Chrome (after implementation)

Steps:
1. **Read the design spec** via Figma MCP before writing any component code
   - If no Figma spec: navigate to the Blue Line Storybook and screenshot component props
2. **Produce an atomic task list** with `skill-writing-plans` — no task should take more than 5 minutes
3. **Implement component by component** — not file by file
4. **Tailwind + token rules** (from `skill-ui-design`):
   - Dark mode is primary — verify it first
   - No raw Radix primitives, no hardcoded hex/HSL
   - Only `lucide-react` icons
   - Only semantic tokens from `src/index.css`
5. After each component: run `npm run build` to catch type errors immediately — do not batch errors

**No test framework present?**
If no test framework (Vitest/Jest) exists in the repo, document this explicitly in the PR description and fall back to:
- `npm run build` — 0 errors, 0 type errors (TypeScript strict)
- `npm run lint` — 0 warnings
- Visual QA — performed by the human reviewer (see Phase 5A)

---

### 4B. IMPLEMENT (Backend)

**Skills:** `skill-tdd` + `skill-writing-plans`
**MCP:** DBHub (required for any DB schema change)

Steps:
1. **Before any DB migration**: use DBHub MCP to read the live schema — no migration without confirmed delta
2. **Produce an atomic task list** with `skill-writing-plans`
3. **For each task: RED first**
   - Write the failing test (`_test.go`) before implementation
   - Run `go test ./... -run <TestName>` — it MUST fail for the right reason
4. **GREEN**: write minimum code to pass the test
5. **REFACTOR**: clean up, then re-run full suite
6. **Never write implementation before a failing test** — violating this rule requires the implementation code to be deleted and rewritten TDD-style

Go rules:
- `gofmt` and `goimports` before every commit
- Accept interfaces, return structs
- Always wrap errors: `fmt.Errorf("context: %w", err)`
- Prefer sqlc queries — no string-concatenated SQL

---

### 5A. VERIFY (Frontend)

**Skill:** `skill-verification`

Evidence required (all must pass before opening a PR):

| Check | Command | Expected |
|-------|---------|----------|
| TypeScript | `npm run build` | 0 type errors, 0 build errors |
| Lint | `npm run lint` | 0 errors |
| Visual QA | Chrome MCP screenshot (dark + light) | **Assigned to human reviewer** — agent requests this explicitly |

**Visual QA handoff — agent MUST say:**
> "Build and lint pass. Please perform visual QA in dark and light mode before this PR is merged. Key areas to check: [list the components/pages changed]."

Do NOT open the PR until build + lint pass. Visual QA can happen async after PR is opened.

---

### 5B. VERIFY (Backend)

**Skill:** `skill-verification`

Evidence required:

| Check | Command | Expected |
|-------|---------|----------|
| Tests | `go test ./...` | 0 FAIL |
| Race detector | `go test -race ./...` | 0 DATA RACE |
| Lint | `golangci-lint run` | 0 errors |
| Build | `go build ./...` | exits 0 |

Never claim "tests should pass." Run it. Paste the output.

---

### 6. REVIEW — Self-review before opening PR

**Skill:** `skill-code-review`

Before pushing the PR, the agent performs a self-review of the full diff:

Checklist:
- [ ] No debug prints, `console.log`, `fmt.Println` left behind
- [ ] No TODO/FIXME without a linked Jira ticket
- [ ] No hardcoded secrets, credentials, or environment-specific values
- [ ] No dead code or unused imports
- [ ] PR title follows: `<type>(<scope>): <summary>` (e.g., `feat(layout): replace sidebar with SidebarLayout`)
- [ ] PR description includes: what changed, why, how to test, Jira link, visual QA status
- [ ] All Acceptance Criteria from the Jira Story are addressed

**Frontend pre-PR extras:**
- [ ] No hardcoded colors (hex, HSL, RGB)
- [ ] No raw Radix primitives
- [ ] No custom z-index values outside the design system
- [ ] Dark mode verified (via Chrome MCP screenshot or explicit visual QA request)

**Backend pre-PR extras:**
- [ ] All new public functions have tests
- [ ] No `interface{}` or `any` unless unavoidable (document why)
- [ ] DB migrations are reversible (down migration exists)

---

### 7. PR — Open pull request

**Skill:** `skill-branch-finalize`

```bash
gh pr create \
  --base develop \
  --title "feat(scope): what changed" \
  --body "$(cat pr_body.md)"
```

PR description must include:

```markdown
## Summary
What changed and why.

## Jira
Refs: VMS-<TICKET>

## Changes
- `src/file.tsx` — what was changed

## How to test
Steps for a reviewer to verify the change works.

## Visual QA
- [ ] Dark mode verified
- [ ] Light mode verified
- [ ] No layout regressions on mobile

## Checklist
- [ ] Build passes (`npm run build` / `go build ./...`)
- [ ] Lint passes
- [ ] Self-review completed
```

---

## Hard rules

These rules are non-negotiable and apply in every session:

1. **No Jira, no branch** — a ticket must exist before any branch is created
2. **No branch, no code** — a feature branch must exist before the first file edit
3. **FE: No ship without passing build** — `npm run build` must exit 0 before PR
4. **BE: No implementation before a failing test** — RED phase is mandatory
5. **No scope creep** — if implementation reveals new issues, open a separate ticket
6. **No silent failures** — if a step fails, stop and report before continuing
7. **PR against `develop`** — never merge directly to `main` or `develop` without a PR review

---

## Workflow quick reference

```
[[PLAN]] activated
       │
       ▼
  Present plan + scope boundaries → wait for approval
       │
       ▼ (approved)
  Create tracking Story (skill-project-planning)
       │
       ▼
  Branch from develop (skill-github-manager)
  git checkout -b feat/VMS-XXX-desc
       │
       ├──── Frontend ──────────────────────────────────────────────┐
       │     Read Figma/Storybook → Write plan (skill-writing-plans)│
       │     Implement component by component                       │
       │     npm run build (after each component)                   │
       │     npm run lint                                            │
       │     Request visual QA from human reviewer                  │
       └──── Backend ───────────────────────────────────────────────┤
             DBHub schema check (if DB change)                      │
             Write plan (skill-writing-plans)                       │
             RED: write failing test                                 │
             GREEN: implement minimum code                           │
             go test -race ./...                                     │
             golangci-lint run                                       │
                                                                     ▼
                                                        Self-review checklist
                                                               │
                                                               ▼
                                                        gh pr create → develop
                                                               │
                                                               ▼
                                                        Transition Jira → In Review
```

---

## Related skills

| Skill | When |
|-------|------|
| `skill-project-planning` | Creating project tracking hierarchy with Confluence TDD |
| `skill-github-manager` | Branch naming, commit format, PR template |
| `skill-writing-plans` | Atomic task breakdown before implementation |
| `skill-tdd` | Red → Green → Refactor (BE required, FE when framework exists) |
| `skill-ui-design` | FE design system compliance (tokens, dark mode, shadcn/ui) |
| `skill-verification` | Evidence gate — build, lint, test output |
| `skill-code-review` | Pre-PR self-review with Critical/Medium/Minor severity |
| `skill-branch-finalize` | PR options: open / merge / keep / discard |
