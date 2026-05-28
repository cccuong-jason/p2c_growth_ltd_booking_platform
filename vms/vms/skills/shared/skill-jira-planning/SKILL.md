---
name: skill-jira-planning
scope: fullstack
description: >
  Use when starting a new feature or significant change. Orchestrates the full
  planning flow: Confluence TDD draft (Golden Template), Jira hierarchy
  (Epic → Story → Subtask), and cross-linking. Requires Atlassian MCP.
  Applies to both frontend and backend features.
---

# Skill — Jira Planning & TDD Authoring

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-jira-planning.md` |
| Cursor | `.cursor/rules/skill-jira-planning.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## Scope

**Fullstack** — covers all VMS features regardless of stack.

## Requires

**Atlassian MCP** — see `mcp/atlassian.md` for setup.

## When to use

- Starting any feature that needs a TDD and Jira breakdown
- Updating an existing TDD after a design review or grooming session
- Breaking an approved TDD into Jira Epics, Stories, and Subtasks

---

## Instructions

### Phase 1 — Analysis (do this before writing anything)

1. Search Confluence for related BRDs, TDDs, or meeting notes:
   ```
   [Atlassian MCP] searchConfluenceUsingCql: title ~ "<feature>" AND space = "VMS"
   ```
2. Search Jira for related existing tickets:
   ```
   [Atlassian MCP] searchJiraIssuesUsingJql: project = VMS AND text ~ "<feature>"
   ```
3. Identify ambiguous requirements. Ask the human for clarification before proceeding.

### Phase 2 — Confluence TDD (Golden Template)

Create or update the Confluence TDD using **exactly** this structure.
Do not deviate. Do not simplify sections.

```markdown
## 1. Front Matter
### 1.1 Identity
- Title, Product (VMS), Feature name
### 1.2 Purpose
One paragraph describing what this document defines.
### 1.3 Status & Version
| Version | Date | Author | Summary | Status |

## 2. Overview & Objectives
### 2.1 Context — business and technical background
### 2.2 Problem — the pain point being solved
### 2.3 Goals — measurable success criteria

## 3. Scope & Architecture
### 3.1 In Scope / Out of Scope
### 3.2 Visual Architecture (C4 Model)
- L1 System Context
- L2 Container Diagram
- L3 Component Diagram
- Sequence Diagram
### 3.3 Technical Stack & Containers

## 4. Behaviour & Flows
### 4.1 Core Flows — step-by-step interactions
### 4.2 Key Rules — business rules, deduplication, etc.

## 5. Database Design (backend features only)
### 5.1 Schema Design (ERD)
### 5.2 Migrations

## 6. Non-Functional Requirements
- Performance, Security (HMAC/Encryption), Observability

## 7. Phasing & Risks
### 7.1 Phase breakdown
### 7.2 Open Questions
```

**Gate:** Present the TDD to the human for approval before creating any Jira issues.

### Phase 3 — Jira hierarchy

After TDD approval, create in this order — do NOT create out of order:

1. **Epic** — strategic objective. Link the Confluence TDD page.
2. **User Story** — functional chunks from the user's perspective.

   Format:
   ```
   Narrative:
   - As a [role]
   - I want to [action]
   - So that [value]

   Acceptance Criteria:
   1. Given/When/Then
   2. Given/When/Then

   Technical Constraints:
   - DB tables, API endpoints, security requirements (HMAC, RBAC)
   ```

3. **Subtask** — discrete technical steps per story.

### Phase 4 — Linkage

- Link every Story to its parent Epic (`implements`)
- Define technical dependencies between Subtasks (`blocks / is blocked by`)
- Link all Stories to the relevant Confluence TDD section

---

## Confluence document writing standard

Every Confluence page written by an agent MUST:
1. Start with a **Table of Contents** macro
2. Include a **Document Information table**: Version | Date (date macro) | Author (mention) | Summary | Status (status macro)
3. Use a horizontal rule after the info table
4. Begin at Version 1, Status = DRAFT
5. Never increment version without explicit user instruction

---

## Related team docs

- Atlassian MCP setup: `mcp/atlassian.md`
- Branch creation after planning: `skills/shared/skill-github-manager/SKILL.md`
- Implementation planning: `skills/shared/skill-writing-plans/SKILL.md`
