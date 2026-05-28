# VMS MCP Servers — Overview

MCP servers extend your AI agent with direct access to external tools. This page maps
each MCP to its scope and the workflow phase where it is required.

---

## The four VMS MCP servers

| MCP | Scope | What it unlocks |
|-----|-------|----------------|
| **Atlassian** | **Fullstack** | Jira ticket CRUD, Confluence page read/write, CQL/JQL search |
| **Figma** | **Frontend only** | Design spec inspection, token extraction, layout validation |
| **Chrome (Playwright)** | **Frontend only** | Visual dark-mode check, accessibility audit, screenshot evidence |
| **DBHub** | **Backend only** | Read-only schema inspection, model-to-DB alignment, safe SELECT |

> **Frontend engineers** install: Atlassian + Figma + Chrome
> **Backend engineers** install: Atlassian + DBHub
> **Fullstack engineers** install: all four

---

## Workflow phase map

| Phase | Skill | MCP | Scope |
|-------|-------|-----|-------|
| Plan — create TDD and project tracking hierarchy | `skill-project-planning` | **Atlassian** | Fullstack |
| Design — inspect Figma before writing components | `skill-ui-design` | **Figma** | Frontend |
| Build (DB) — verify schema before migration | `skill-writing-plans` | **DBHub** | Backend |
| Build (UI) — render and check component | `skill-tdd` + `skill-ui-design` | **Chrome** | Frontend |
| Verify — visual regression after UI changes | `skill-verification` | **Chrome** | Frontend |
| Review — confirm Jira/Confluence state | `skill-code-review` | **Atlassian** | Fullstack |
| Ship — update ticket status and TDD | `skill-branch-finalize` | **Atlassian** | Fullstack |

---

## Security rules for all MCPs

- Store all credentials (API tokens, DSNs) in **environment variables** — never in prompts or committed files.
- DBHub is **read-only** by policy. It cannot run INSERT/UPDATE/DELETE/DDL.
- Chrome MCP controls a real browser. Do not navigate to URLs containing production data or secrets.
- Disable any MCP you are not actively using in a session.

---

## Setup guides

| MCP | Guide | Scope |
|-----|-------|-------|
| Atlassian | [atlassian.md](atlassian.md) | Fullstack |
| Figma | [figma.md](figma.md) | Frontend only |
| Chrome (Playwright) | [chrome.md](chrome.md) | Frontend only |
| DBHub | [dbhub.md](dbhub.md) | Backend only |
