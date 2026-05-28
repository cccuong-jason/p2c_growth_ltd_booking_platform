# Atlassian MCP — Setup & Usage Guide

## Scope: Fullstack

Every VMS engineer — frontend and backend — uses this MCP for Jira and Confluence
interaction. It is required by `skill-project-planning` and used at the Ship phase by
`skill-branch-finalize` to close tickets and update TDD status.

---

## What it does

- **Jira** — create/update Epics, Stories, Subtasks; transition status; add comments; set links
- **Confluence** — create/update pages, search with CQL, post inline comments

## When to use

| Situation | Action |
|-----------|--------|
| Starting a feature | Create Epic → Stories → Subtasks from the TDD |
| Drafting or updating a TDD | Write/update a Confluence page with the Golden Template |
| During review | Confirm the Jira ticket's AC matches the implementation |
| After merging | Transition issue to Done; update Confluence TDD status to Published |
| Searching for prior art | CQL search for related BRDs, TDDs, or meeting notes |

---

## Prerequisites

- Atlassian API token — generate at: https://id.atlassian.com/manage-profile/security/api-tokens
- OPSWAT Cloud ID: `caf9a347-db64-460f-ac57-28628888a1c0`
- Your email: `<your.name>@opswat.com`
- Jira project key: `VMS`

---

## Installation

### Claude Code

```bash
claude mcp add atlassian \
  -e ATLASSIAN_URL=https://opswat.atlassian.net \
  -e ATLASSIAN_USERNAME=<your.name@opswat.com> \
  -e ATLASSIAN_API_TOKEN=<your-api-token> \
  -- npx -y @anthropic-labs/mcp-atlassian
```

Or add to `~/.claude/claude_mcp_settings.json`:

```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "@anthropic-labs/mcp-atlassian"],
      "env": {
        "ATLASSIAN_URL": "https://opswat.atlassian.net",
        "ATLASSIAN_USERNAME": "<your.name@opswat.com>",
        "ATLASSIAN_API_TOKEN": "<your-api-token>"
      }
    }
  }
}
```

### Cursor

Add to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project):

```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "@anthropic-labs/mcp-atlassian"],
      "env": {
        "ATLASSIAN_URL": "https://opswat.atlassian.net",
        "ATLASSIAN_USERNAME": "<your.name@opswat.com>",
        "ATLASSIAN_API_TOKEN": "<your-api-token>"
      }
    }
  }
}
```

Restart Cursor after saving.

### GitHub Copilot (VS Code)

Add to VS Code `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "atlassian": {
        "command": "npx",
        "args": ["-y", "@anthropic-labs/mcp-atlassian"],
        "env": {
          "ATLASSIAN_URL": "https://opswat.atlassian.net",
          "ATLASSIAN_USERNAME": "<your.name@opswat.com>",
          "ATLASSIAN_API_TOKEN": "<your-api-token>"
        }
      }
    }
  }
}
```

---

## Key capabilities

| Tool | When used |
|------|-----------|
| `createJiraIssue` | Creating Epic, Story, or Subtask during feature planning |
| `editJiraIssue` | Updating AC, description, or assignee |
| `transitionJiraIssue` | Moving issue to In Progress / In Review / Done |
| `addCommentToJiraIssue` | Posting status updates or blockers |
| `createConfluencePage` | Creating a new TDD with the Golden Template |
| `updateConfluencePage` | Updating TDD after design review |
| `searchJiraIssuesUsingJql` | Finding related tickets |
| `searchConfluenceUsingCql` | Finding existing TDDs or BRDs |
| `getJiraIssue` | Reading ticket details for context during implementation |

---

## Verify installation

```
Ask your agent: "List my open Jira issues in project VMS"
Expected: a list of VMS tickets assigned to you
```
