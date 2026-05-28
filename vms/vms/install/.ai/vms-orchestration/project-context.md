# VMS Orchestration Project Context

This file defines the project-level values the orchestration layer resolves at
runtime. Skills and tool projections should reference these values instead of
hardcoding repo names, branch names, or command defaults.

## Repository identity

| Key | Value |
|-----|-------|
| Team | `vms` |
| Shared playbook root | `teams-to-share/vms/` |
| Supported orchestration projections (v1) | `codex`, `cursor`, `claude` |
| Default ticket prefix | `VMS` |

## Repo classes

| Repo class | Match | Defaults |
|------------|-------|----------|
| `frontend` | `vms-community-fe` | Requires `skill-ui-design`, Figma, Chrome, `npm run build`, `npm run lint` |
| `go-backend` | `vms-api-go`, `vms-notification-center`, `vms-common-go`, `vms-cve-api`, `vms-crawl-worker` | Requires `skill-tdd`, `go test ./...`, `go build ./...`, `golangci-lint run` |
| `other-backend` | Any non-frontend VMS service | Follows service-local build/test commands, still uses Planner -> Developer -> Reviewer orchestration |

## Tool projections

| Tool | Thin projection target |
|------|------------------------|
| Codex | Repo `AGENTS.md` pointers to canonical prompts and pipeline docs |
| Cursor | `.cursor/rules/` and `.cursor/commands/` wrappers referencing canonical prompts |
| Claude | `CLAUDE.md`, `.claude/agents/`, and `.claude/commands/` wrappers referencing canonical prompts |

## Required MCP classes

| Role | MCPs |
|------|------|
| Planner | Atlassian |
| Developer (frontend) | Atlassian, Figma, Chrome |
| Developer (backend with DB changes) | Atlassian, DBHub |
| Reviewer | Atlassian for Jira alignment, Git host tooling if the runtime supports it |

## Required artifacts by role

| Role | Minimum release artifacts |
|------|---------------------------|
| Planner | Scope summary, explicit in-scope and out-of-scope list, success criteria, risk level, Jira or TDD references |
| Developer | Branch name, verification evidence, changed paths summary, PR draft or reviewable diff |
| Reviewer | Severity-labeled findings or explicit approve verdict, evidence tied to AC or verification output |

## Defaults and assumptions

- Branch naming follows `feat/<VMS-TICKET>-<short-desc>`, `fix/<VMS-TICKET>-<short-desc>`, or `chore/<VMS-TICKET>-<short-desc>`
- Human approval is required before implementation starts
- Human approval is required before the workflow is considered merged or closed
- Service-specific commands may override stack defaults, but the orchestration state model stays stable
