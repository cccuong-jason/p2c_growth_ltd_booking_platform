# DBHub MCP — Setup & Usage Guide

## Scope: Backend only

> **Frontend engineers: skip this.** DBHub MCP is only relevant for Go service work
> that involves database schema changes, migrations, or repository layer implementation.
> Do not install it for `vms-community-fe` or React/TypeScript repositories.

Backend engineers invoke this MCP during `skill-writing-plans` when a plan includes
DB changes, and during `skill-tdd` Step 1 for tests that touch the database layer.

---

## What it does

Read-only access to live database schemas in the VMS dev environment:
- List tables and inspect column definitions (types, nullability, defaults, constraints)
- Compare Go struct fields against live DB columns
- Run safe `SELECT` queries to validate data shape
- Explain query execution plans before shipping

**DBHub MCP is read-only by policy. It will refuse INSERT, UPDATE, DELETE, and DDL.**

## When to use

| Situation | Action |
|-----------|--------|
| Before writing a migration | Inspect live schema — confirm column types and constraints |
| Before implementing a repository | Verify Go struct fields match live DB columns |
| Debugging a query issue | Run SELECT and compare result shape to handler expectations |
| Reviewing a migration PR | Validate migration SQL matches the live schema delta |

**Always run this before drafting migration SQL.** Schema drift between the model and live DB
is one of the most common sources of production incidents.

---

## Prerequisites

- DBHub API key — request from the VMS infrastructure team
- Dev/staging DSN — request from the VMS infrastructure team (never use production)
- VPN access to the OPSWAT dev database endpoint

---

## Installation

### Claude Code

```bash
claude mcp add dbhub \
  -e DBHUB_API_KEY=<your-api-key> \
  -e DBHUB_DSN=<dev-connection-string> \
  -- npx -y dbhub-mcp
```

Or add to `~/.claude/claude_mcp_settings.json`:

```json
{
  "mcpServers": {
    "dbhub": {
      "command": "npx",
      "args": ["-y", "dbhub-mcp"],
      "env": {
        "DBHUB_API_KEY": "<your-dbhub-api-key>",
        "DBHUB_DSN": "<dev-database-connection-string>"
      }
    }
  }
}
```

### Cursor

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "dbhub": {
      "command": "npx",
      "args": ["-y", "dbhub-mcp"],
      "env": {
        "DBHUB_API_KEY": "<your-dbhub-api-key>",
        "DBHUB_DSN": "<dev-database-connection-string>"
      }
    }
  }
}
```

### GitHub Copilot (VS Code)

Add to VS Code `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "dbhub": {
        "command": "npx",
        "args": ["-y", "dbhub-mcp"],
        "env": {
          "DBHUB_API_KEY": "<your-dbhub-api-key>",
          "DBHUB_DSN": "<dev-database-connection-string>"
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
| List tables | Inventory all tables in the target schema |
| Describe table | Get columns, types, nullability, defaults, indexes |
| Compare struct | Map Go struct fields against live column definitions |
| Run SELECT | Fetch sample rows to validate data shape |
| Explain query | Check index usage before shipping a query |

---

## Safety rules

- **Only connect to dev or staging** — never configure a production DSN.
- If the agent proposes a mutation, reject it — DBHub MCP will refuse it anyway, but stop the agent.
- Do not paste the DSN into prompts — use environment variables only.

## Verify installation

```
Ask your agent: "List all tables in the database"
Expected: a list of table names from the dev schema
```
