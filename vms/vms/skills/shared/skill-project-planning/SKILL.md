---
name: skill-project-planning
scope: fullstack
description: >
  Use when starting a new feature or significant change. Orchestrates the full
  planning flow: Confluence TDD draft (Golden Template), project tracking hierarchy
  (Epic → Story → Subtask in Jira or equivalent), and cross-linking. Requires
  Atlassian MCP. Applies to both frontend and backend features.
---

# Skill — Project Planning & TDD Authoring

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-project-planning.md` |
| Cursor | `.cursor/rules/skill-project-planning.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## Scope

**Fullstack** — covers all VMS features regardless of stack.

## Requires

**Atlassian MCP** — see `mcp/atlassian.md` for setup.

## When to use

- Starting any feature that needs a TDD and project tracking breakdown
- Updating an existing TDD after a design review or grooming session
- Breaking an approved TDD into Epics, Stories, and Subtasks (Jira or equivalent)

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

**Always call `createConfluencePage` or `updateConfluencePage` with `contentFormat: "adf"`.**
Pass the `body` as a JSON string matching the ADF doc schema. See the
**Confluence document writing standard** section below for required ADF patterns.
Never use `contentFormat: "markdown"` — Confluence macros (TOC, status, draw.io) will not render.

```
Section outline (map to ADF heading nodes):
  1. Front Matter
     1.1 Identity — Title, Product (VMS), Feature name
     1.2 Purpose — one paragraph describing what this document defines
     1.3 Status & Version — version table + status macro
  2. Overview & Objectives
     2.1 Context — business and technical background
     2.2 Problem — the pain point being solved
     2.3 Goals — measurable success criteria
  3. Scope & Architecture
     3.1 In Scope / Out of Scope
     3.2 Visual Architecture (C4 Model) — diagrams embedded via draw.io macro
       - L1 System Context
       - L2 Container Diagram
       - L3 Component Diagram
       - Sequence Diagram
     3.3 Technical Stack & Containers
  4. Behaviour & Flows
     4.1 Core Flows — step-by-step interactions
     4.2 Key Rules — business rules, deduplication, etc.
  5. Database Design (backend features only)
     5.1 Schema Design (ERD)
     5.2 Migrations
  6. Non-Functional Requirements
     Performance, Security (HMAC/Encryption), Observability
  7. Phasing & Risks
     7.1 Phase breakdown
     7.2 Open Questions
```

**Gate:** Present the TDD to the human for approval before creating any Jira issues.

### Phase 3 — Project tracking hierarchy

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

Every Confluence page written by an agent MUST use **ADF format** (`contentFormat: "adf"`).
Use the ADF node patterns below. Never substitute raw markdown — macros will not render.

### Document rules

1. Always call `createConfluencePage` / `updateConfluencePage` with `contentFormat: "adf"`
2. Body must be a JSON string: `{ "version": 1, "type": "doc", "content": [...] }`
3. First node: TOC macro (`extension`). Second: Document Information table. Third: horizontal rule (`rule`).
4. Begin at Version 1.0, Status = DRAFT
5. Never increment version without explicit user instruction

### ADF skeleton for a TDD page

```json
{
  "version": 1,
  "type": "doc",
  "content": [
    {
      "type": "extension",
      "attrs": {
        "extensionType": "com.atlassian.confluence.macro.core",
        "extensionKey": "toc",
        "parameters": { "macroParams": { "maxLevel": { "value": "3" } } },
        "layout": "default"
      }
    },
    {
      "type": "table",
      "attrs": { "isNumberColumnEnabled": false, "layout": "default" },
      "content": [
        {
          "type": "tableRow",
          "content": [
            { "type": "tableHeader", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Version" }] }] },
            { "type": "tableHeader", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Date" }] }] },
            { "type": "tableHeader", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Author" }] }] },
            { "type": "tableHeader", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Summary" }] }] },
            { "type": "tableHeader", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Status" }] }] }
          ]
        },
        {
          "type": "tableRow",
          "content": [
            { "type": "tableCell", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "1.0" }] }] },
            { "type": "tableCell", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "YYYY-MM-DD" }] }] },
            { "type": "tableCell", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "<Author Name>" }] }] },
            { "type": "tableCell", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Initial draft" }] }] },
            {
              "type": "tableCell",
              "content": [{
                "type": "paragraph",
                "content": [{
                  "type": "inlineExtension",
                  "attrs": {
                    "extensionType": "com.atlassian.confluence.macro.core",
                    "extensionKey": "status",
                    "parameters": {
                      "macroParams": {
                        "title": { "value": "DRAFT" },
                        "colour": { "value": "Yellow" }
                      }
                    }
                  }
                }]
              }]
            }
          ]
        }
      ]
    },
    { "type": "rule" },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "1. Front Matter" }]
    }
  ]
}
```

### Status macro colour reference

| Status | `colour` value |
|--------|---------------|
| DRAFT | `Yellow` |
| IN REVIEW | `Blue` |
| APPROVED | `Green` |
| DEPRECATED | `Red` |

### ADF node type reference

| Use case | Node type | Notes |
|----------|-----------|-------|
| Block macro (TOC, info panel) | `extension` | No body content |
| Macro with body (draw.io, expand) | `bodiedExtension` | Content array holds body |
| Inline macro (status in table cell) | `inlineExtension` | Inside `paragraph.content` |
| Heading | `heading` with `attrs.level` 1–6 | |
| Horizontal rule | `rule` | No attrs or content |
| Table | `table` → `tableRow` → `tableHeader`/`tableCell` | Each cell contains `paragraph` |
| Paragraph | `paragraph` with `content` array of `text` nodes | |
| Bold text | `text` with `marks: [{ "type": "strong" }]` | |

---

## Diagrams: draw.io + Confluence ADF embedding

**All architecture diagrams, flowcharts, sequence diagrams, and ERDs MUST be created
with draw.io and embedded in the Confluence page via the `drawio` ADF macro.**
Never paste diagram code as a raw code block or ASCII art in the page body.

### Workflow

1. **Generate** the diagram XML using the `drawio-open_drawio_xml` tool available in this session.
2. **Get the XML** — the full `<mxGraphModel>...</mxGraphModel>` string from the tool output.
3. **Embed** it in the Confluence page body using the ADF `bodiedExtension` node below.

### ADF node for an embedded draw.io diagram

```json
{
  "type": "bodiedExtension",
  "attrs": {
    "extensionType": "com.atlassian.confluence.macro.core",
    "extensionKey": "drawio",
    "parameters": {
      "macroParams": {
        "border": { "value": "1" },
        "fit": { "value": "1" }
      }
    },
    "layout": "default"
  },
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "<PASTE_MXGRAPHMODEL_XML_HERE>"
        }
      ]
    }
  ]
}
```

Replace `<PASTE_MXGRAPHMODEL_XML_HERE>` with the full `<mxGraphModel>...</mxGraphModel>` XML
string from the draw.io tool (single-line, no extra whitespace).

### Example: embedding a sequence diagram

```json
{
  "type": "heading",
  "attrs": { "level": 3 },
  "content": [{ "type": "text", "text": "3.2.4 Sequence Diagram — Authenticated Request Flow" }]
},
{
  "type": "bodiedExtension",
  "attrs": {
    "extensionType": "com.atlassian.confluence.macro.core",
    "extensionKey": "drawio",
    "parameters": {
      "macroParams": {
        "border": { "value": "1" },
        "fit": { "value": "1" }
      }
    },
    "layout": "default"
  },
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "<mxGraphModel><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/>...</mxCell></root></mxGraphModel>"
        }
      ]
    }
  ]
}
```

### C4 model diagram placement

| Diagram | Section | draw.io style |
|---------|---------|--------------|
| L1 System Context | 3.2.1 | Boxes + arrows, system boundary rectangle |
| L2 Container | 3.2.2 | Swim-lane containers with named services |
| L3 Component | 3.2.3 | Nested boxes within one container |
| Sequence | 3.2.4 | Sequence diagram (actor + lifelines + messages) |
| ERD | 5.1 | Entity-relationship with crow's-foot notation |

---

## Related team docs

- Atlassian MCP setup: `mcp/atlassian.md`
- Branch creation after planning: `skills/shared/skill-github-manager/SKILL.md`
- Implementation planning: `skills/shared/skill-writing-plans/SKILL.md`
