# VMS — AI Harness & Workflow Guide

This document maps every VMS standard to the workflow phase where it applies and the
skill or MCP that enforces it. Read this before starting any VMS feature work.

---

## Scope legend

| Symbol | Meaning |
|--------|---------|
| 🌐 | Fullstack — applies to all engineers |
| 🎨 | Frontend only — `vms-community-fe` and React/TypeScript repos |
| ⚙️ | Backend only — Go services (vms-api-go, vms-notification-center, etc.) |

---

## Agentic governance mandates

These apply to **every agent session** regardless of role or tool.

| Mandate | Rule |
|---------|------|
| **Skill-First** | Invoke a relevant skill BEFORE any response or action on a repeatable task |
| **No Ghost Code** | Code written without a preceding failing test MUST be deleted |
| **OODA Loop** | Observe existing context → Orient to the task → Act via TDD → Validate with evidence |
| **Transparency** | Post a status table every 5 minutes of autonomous work |
| **Scientific Debugging** | No fix is proposed until the root cause is proven via logs, traces, or a reproducing test |
| **Jira Alignment** | ALWAYS update Jira task status and progress when done or if changes occur during development |
| **Plan Mode** | When `[[PLAN]]` is active or user says "proceed/start/implement": invoke `skill-plan-mode-execution` BEFORE writing any code. FE path: Plan→Jira→Branch→Implement→Build verify→Visual QA→PR. BE path: Plan→Jira→Branch→TDD→Implement→Verify→PR. |
| **Knowledge Contribution** | When you discover something novel and undocumented (workaround, pattern, gotcha), check the 3 gates then offer to contribute it back via `skill-knowledge-contribution`. Only inside `teams-to-share/vms/`. |

## Plan mode execution

When a user activates `[[PLAN]]` mode or transitions from a plan to implementation,
the agent **MUST** invoke `skill-plan-mode-execution` before touching any file.

### Frontend path (vms-community-fe)
```
PLAN → Jira Story → Branch from develop → Implement → Build verify (npm run build + lint) → Visual QA (human) → PR
```

### Backend path (Go services)
```
PLAN → Jira Story → Branch from develop → TDD (failing test first) → Implement → Verify (go test + lint) → PR
```

Key rules:
- No Jira ticket = no branch. No branch = no code change.
- FE: `npm run build` must exit 0 before PR. Visual QA is the human reviewer's responsibility.
- BE: A failing test (`_test.go`) must exist and be verified RED before any implementation.
- Scope boundaries must be stated explicitly (in scope / out of scope) before any implementation begins.

**Skill:** `skill-plan-mode-execution`

## Multi-tool orchestration

For Codex, Cursor, and Claude, VMS also defines a shared orchestration source at
`teams-to-share/vms/orchestration/`.

v1 uses a fixed three-role flow:

```text
Planner -> Gate 1 (scope-approved) -> Developer -> Reviewer -> Gate 2 (merge-approved)
```

Rules:
- The orchestration layer reuses existing VMS skills; it does not replace them
- Planner owns scope clarity and approval readiness
- Developer owns branch/worktree, implementation, and verification
- Reviewer owns severity-based findings and verdict
- Human approval is required before implementation starts and before merge/closure

## Agent session discipline

Before starting any session:

1. **Branch first** — feature branch exists before the agent touches any file
2. **State the intent** — what to change, what *not* to change, and the success criteria
3. **Define boundaries** — list out-of-scope paths: generated code (`sqlc/`, `openapi/`), vendor, production-only configs
4. **Label the PR** — mark agent-generated vs human-edited sections so reviewers know where to focus

After every session:
- Re-read the full diff — agents can miss context or duplicate patterns
- Remove debug prints, temp files, and dead code the agent introduced
- If output was poor quality, update the relevant skill in `skills/shared/` so the next session improves

**Use agent mode when:** change touches more than 2 files, or is a multi-file feature/refactor.
**Skip agent mode when:** single-line fix, architecture-only discussion, or any change requiring a narrow security scope.

---

## VMS workflow — phase by phase

### Phase 1 — PLAN 🌐

**Standard:** VMS Agentic Collaboration Standard — Golden TDD + Jira hierarchy

**Skill:** `skill-project-planning`
**MCP:** Atlassian (required)

What happens:
1. Search Confluence and Jira for related prior art
2. Draft the **Confluence TDD** using the Golden Template (Front Matter → Overview → Scope → Architecture → Flows → DB Design → NFRs → Phasing)
3. Get human approval on the TDD before creating any Jira issues
4. Manage Jira hierarchy: **Epic → User Stories → Subtasks** (Find existing first; create new if not exist)
5. Cross-link Stories to the TDD and build `implements`/`blocks` relations

**Confluence document writing standard:**
- Every page starts with ToC macro → Document Information table (Version | Date | Author | Summary | Status) → horizontal rule
- Version starts at 1, Status = DRAFT. Never increment without explicit instruction.
- Date = Confluence date macro (never plain text). Author = mention macro (never plain text).

---

### Phase 2 — BRANCH 🌐

**Standard:** VMS Branch Convention & Hierarchy

**Skill:** `skill-github-manager`

**Branch Hierarchy:** `Epic → Story → Subtasks`

**Branch Creation Order:**
1. Create a unique **Story branch** from the latest default branch (`main` or `develop`).
2. Create all **Sub-task branches** from that story branch.
3. Proceed with work on sub-task branches.

**Branch naming:**
```
feat/<VMS-TICKET>-<short-desc>    new features
fix/<VMS-TICKET>-<short-desc>     bug fixes
chore/<VMS-TICKET>-<short-desc>   maintenance
```
(Apply the relevant prefix to both Story and Sub-task branches)

**Commit format:**
```
<type>(<scope>): <summary in present tense>

<body: what and why>

Refs: VMS-<TICKET>
```

**Rules:**
- Branch must exist **before** any code change.
- Sub-tasks MUST branch from their parent Story branch.
- Ticket must exist before branch.

---

### Phase 3 — ISOLATE 🌐

**Skill:** `skill-git-worktrees`

Create a dedicated worktree before starting implementation:
```bash
git worktree add .worktrees/<VMS-TICKET>-desc feat/<VMS-TICKET>-desc
```

Run baseline tests in the worktree before writing any code. Never work directly on
`main` or `develop` in agent mode.

---

### Phase 4 — PLAN IMPLEMENTATION 🌐

**Skill:** `skill-writing-plans`

Before touching code, produce an atomic plan:
- Each task: 2–5 minutes, exact file path, exact test command, no placeholders
- Follow Red-Green-Refactor order: test before implementation in every task
- No task depends on a task listed below it

---

### Phase 5A — BUILD (Backend) ⚙️

**Mandatory Standards Alignment:** Before implementing, read and align with:
- [Go Infrastructure Mandates](@teams-to-share/vms/conventions/go/infrastructure.md)
- [Go Best Practices](@teams-to-share/vms/conventions/go/best-practices.md)

**Stack:** Go — `vms-api-go`, `vms-notification-center`, and other Go microservices

**Skill:** `skill-tdd`
**MCP:** DBHub (for tasks with DB changes)

Before any DB migration:
- Use DBHub MCP to inspect the live schema
- Verify Go struct fields match live column types and constraints
- Write the migration only after confirming the delta

Go-specific rules:
- `gofmt` and `goimports` are mandatory — no style debates
- Accept interfaces, return structs. Keep interfaces 1–3 methods.
- Always wrap errors: `fmt.Errorf("context: %w", err)`
- Prefer sqlc-generated queries — never string-concatenated SQL
- Respect OpenAPI/proto contracts when changing HTTP or gRPC surfaces

---

### Phase 5B — BUILD (Frontend) 🎨

**Mandatory Standards Alignment:** Before implementing, read and align with:
- [Frontend Conventions](@teams-to-share/vms/conventions/typescript/frontend.md)
- [TS/React Best Practices](@teams-to-share/vms/conventions/typescript/best-practices.md)

**Stack:** React 18 + TypeScript + Tailwind CSS + shadcn/ui — `vms-community-fe`

**Skills:** `skill-tdd` + `skill-ui-design`
**MCPs:** Figma (before code) + Chrome (after implementation)

Before writing any component:
1. Read the Figma spec via Figma MCP — extract tokens, layout, spacing
2. Map every Figma color to a VMS CSS token from `src/index.css`
3. Run `skill-ui-design` checklist before writing a line of UI code

**When no Figma spec exists — Blue Line fallback workflow:**

> Blue Line is OPSWAT's company-wide Storybook: `http://ds-react-storybook-opswat-ui.s3-website-us-west-2.amazonaws.com/`
> It is a **static S3 site** — `@storybook/mcp` CANNOT be used (no running server, no manifest files).

Use this workflow instead:
1. Open Chrome MCP → navigate to `?path=/docs/components-<COMPONENT>--docs`
2. Screenshot the ArgsTable to capture prop names and types
3. Map Blue Line component to VMS shadcn/ui equivalent (full mapping in `skill-ui-design §8`)
4. Use VMS CSS token vars from `src/index.css` — **never** hardcode Blue Line HSL values inline
5. **Do NOT re-scan the full Storybook index** — use §8 of `skill-ui-design` as the offline reference

Frontend-specific rules:
- Dark mode is the **primary** experience — verify it first
- Only `shadcn/ui` wrappers from `@/components/ui/` — no raw Radix, no raw HTML elements
- Only `lucide-react` for icons
- Only semantic Tailwind tokens — no hardcoded hex/HSL
- Severity badges use the exact severity color system (see `skill-ui-design`)

After implementation:
- Use Chrome MCP to screenshot dark + light mode
- Use Chrome MCP accessibility tree to check `aria-label` and focus rings

---

### Phase 6 — VERIFY 🌐

**Testing Framework Standards:**
- [Go Testing](@teams-to-share/vms/conventions/go/testing.md)
- [TS/Frontend Testing](@teams-to-share/vms/conventions/typescript/testing.md)
- [Python Testing](@teams-to-share/vms/conventions/python/testing.md)

**Skill:** `skill-verification`

Evidence required before claiming any task complete:

| Check | Backend (Go) | Frontend (TypeScript) |
|-------|-------------|----------------------|
| Tests | `go test ./...` — 0 FAIL | `npm test` — 0 failing |
| Lint | `golangci-lint run` — 0 errors | `npm run lint` — 0 errors |
| Build | `go build ./...` | `npm run build` |
| Visual | — | Dark + light mode screenshots via Chrome MCP |

Never say "should work" or "should pass." Run it. Show the output.

---

### Phase 7 — REVIEW 🌐

**Skill:** `skill-code-review`
**MCP:** Atlassian (confirm Jira ticket AC matches implementation)

Every review comment MUST carry a severity:

| Severity | Meaning | Blocks merge? |
|----------|---------|--------------|
| 🔴 **Critical** | Correctness failure, data loss, security issue, business logic collapse | Yes |
| 🟡 **Medium** | Subtle bug, missing error handling, design choice that hurts the team | Yes (unless accepted) |
| 🟢 **Minor** | Low-risk improvement, non-blocking | No |

Review focuses on: logic correctness, error handling, business integrity, security, test coverage.
**Skip:** typos, formatting, personal style preferences — those belong to linters.

---

### Phase 8 — SHIP 🌐

**Skill:** `skill-branch-finalize`
**MCP:** Atlassian (update Jira + Confluence)

**Merge Order:**
1. Merge **Sub-task branches** back into their parent **Story branch**.
2. Merge the **Story branch** into the **Default branch**.

Present the 4-option integration decision:

| Option | When |
|--------|------|
| **A. Open PR** | Default for all team repos |
| **B. Local merge** | Pre-approved solo merge only |
| **C. Keep branch** | Work in progress, checkpoint only |
| **D. Discard** | Experiment failed |

After merge:
- Transition Jira issue to Done via Atlassian MCP (ALWAYS verify status alignment)
- Remove the git worktree: `git worktree remove .worktrees/<dir>`

---

## MCP quick reference

| MCP | Scope | Install guide |
|-----|-------|--------------|
| Atlassian | 🌐 Fullstack | `mcp/atlassian.md` |
| Figma | 🎨 Frontend only | `mcp/figma.md` |
| Chrome (Playwright) | 🎨 Frontend only | `mcp/chrome.md` |
| DBHub | ⚙️ Backend only | `mcp/dbhub.md` |

---

## Hooks and Claude Code specifics

- Place `CLAUDE.md` in the **service repo root** — loaded automatically every session.
- For interactive CLI auth (e.g. `gcloud auth login`, `gh auth login`), use the `!` prefix:
  ```
  ! gh auth login
  ```
- Hooks run shell commands around tool use. Read any hook before enabling it.
  Prefer fewer hooks — noisy hooks train people to ignore them.
