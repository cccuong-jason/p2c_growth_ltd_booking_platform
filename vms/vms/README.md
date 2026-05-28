# Team: VMS

## Metadata

| Field | Value |
|-------|--------|
| **Team slug** | `vms` |
| **Primary contact** | `hieu.h.nguyen@opswat.com` |
| **Repositories** | `vms-api-go`, `vms-common-go`, `vms-notification-center`, `vms-community-fe`, `vms-cve-api`, `vms-crawl-worker` |

Also used across VMS work: **`vms-db-migration`** (schema), **`vms-workflows-sample`** (shared GitHub Actions).

## Tools in use

- [x] Cursor
- [x] GitHub Copilot
- [x] Claude Code
- [x] Codex CLI
- [x] Gemini CLI
- [ ] Other: *…*

## Start here

**New team member? Install everything with one prompt:**

→ Read `INSTALL.md`, pick your role (backend / frontend / fullstack) and your agent,
  copy the prompt, and paste it. The agent installs all 11 skills and configures the right
  MCP servers automatically.

Then read:
- `instructions/vms-ai-harness.md` — full VMS workflow map, Go rules, agent session discipline
- `orchestration/README.md` — canonical Planner → Developer → Reviewer workflow for Codex, Cursor, and Claude
- `mcp/README.md` — which MCP servers to use at each workflow phase

## What we are sharing

- [x] **Install guide** — `INSTALL.md` (one-prompt setup for Claude Code, Cursor, Copilot, Codex CLI, Gemini CLI)
- [x] **Skills** — `skills/shared/` (11 agent-agnostic skills, scoped Frontend/Backend/Fullstack)
- [x] **MCP guides** — `mcp/` (Atlassian, Figma, Chrome, DBHub — setup + usage per role)
- [x] **Harness** — `instructions/vms-ai-harness.md` (8-phase VMS workflow, Go rules, agent session discipline)
- [x] **Orchestration** — `orchestration/` (canonical multi-tool role pipeline, prompts, and run-state model)
- [x] **Pull request templates** — `pull-request-templates/` (per-repo `.github` copies for shared edits)

## Team instructions

- **Single source of truth per repo:** stack layout, OpenAPI/sqlc workflows, and CI commands
  live in that service repository's `README.md` and `CLAUDE.md`. This folder describes
  **how we use AI**, not duplicate full stack docs.
- **Generated code:** Do not hand-edit generated packages (e.g. sqlc/OpenAPI outputs) unless
  your repo explicitly allows it; change sources and regenerate per repo process.
- **Quality bar:** AI output is a draft. You own the merge; run tests and linters before
  requesting review.

## Shared context for every work item

| Input | Minimum expectation |
|-------|---------------------|
| **Product / ticket** | Jira ticket, acceptance criteria, edge cases, and rollout notes |
| **Repo context** | Service `README.md`, relevant handlers/services/repositories for the code path you touch |
| **Definition of done** | Tests added or updated, no new linter violations, docs/specs updated when behavior or APIs change |

## Pre-PR security gate

These rules apply before any pull request is opened on VMS services.

1. Do not commit secrets (tokens, API keys, passwords, private certificates, customer data, internal-only credentials).
2. Redact sensitive values from code, config, logs, screenshots, test fixtures, and AI prompts before they enter the repository.
3. Treat external input as untrusted; validate at trust boundaries.
4. Use parameterized queries and safe APIs — no string-concatenated SQL or shell from user-controlled data.
5. Do not log secrets, full customer payloads, or security-sensitive internals.
6. For auth, permissions, networking, or storage changes, add an explicit security note in the PR description.
7. If there is any security doubt, stop and escalate before opening the PR.

## Folder guide

| Path | Purpose |
|------|---------|
| `INSTALL.md` | One-prompt install entry point — start here |
| `install/` | Per-agent install scripts (Claude Code, Cursor, Copilot, Codex CLI, Gemini CLI) |
| `skills/shared/` | All 11 VMS skills — agent-agnostic, scoped Frontend/Backend/Fullstack |
| `orchestration/` | Canonical Planner/Developer/Reviewer orchestration source for Codex, Cursor, and Claude |
| `mcp/` | MCP server setup guides (Atlassian, Figma, Chrome, DBHub) |
| `instructions/` | VMS workflow harness — 8-phase workflow, Go rules, agent session discipline |
| `pull-request-templates/` | PR description templates by repo — [README](pull-request-templates/README.md) for sync |

Do not commit secrets or customer-specific URLs in this pack. Redact before sharing excerpts from internal repos.
