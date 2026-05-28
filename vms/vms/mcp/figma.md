# Figma MCP — Setup & Usage Guide

## Scope: Frontend only

> **Backend engineers: skip this.** Figma MCP is only relevant for React/TypeScript
> work in `vms-community-fe`. Do not install it for Go service repositories.

Frontend engineers invoke this MCP at the start of every UI task, before writing
any component code. Used by `skill-ui-design` Step 1.

---

## What it does

- Read Figma file component trees and node details (dimensions, colors, typography, spacing)
- Extract design token values from Figma styles
- Validate that a component spec matches the VMS design system tokens in `src/index.css`

## When to use

| Situation | Action |
|-----------|--------|
| Starting any UI component or page | Read the Figma frame — extract layout, tokens, spacing |
| Before writing component code | Map Figma color → VMS CSS token (never hardcode HSL) |
| During TDD for UI | Use the Figma spec to write assertions with correct values |
| Reviewing a UI PR | Confirm the implementation matches the design spec |

**Never write UI code for a component that has a Figma spec without reading it first.**

---

## Prerequisites

- Figma personal access token — generate at: https://www.figma.com/settings → Personal access tokens
- The Figma file URL or node link for the VMS design system

---

## Installation

### Claude Code

```bash
claude mcp add figma \
  -e FIGMA_API_TOKEN=<your-figma-token> \
  -- npx -y figma-mcp
```

Or add to `~/.claude/claude_mcp_settings.json`:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-mcp"],
      "env": {
        "FIGMA_API_TOKEN": "<your-figma-personal-access-token>"
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
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-mcp"],
      "env": {
        "FIGMA_API_TOKEN": "<your-figma-personal-access-token>"
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
      "figma": {
        "command": "npx",
        "args": ["-y", "figma-mcp"],
        "env": {
          "FIGMA_API_TOKEN": "<your-figma-personal-access-token>"
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
| Read file components | Get the full component tree from a Figma file |
| Get node details | Extract dimensions, colors, border-radius, typography for a frame |
| List styles | Read all design tokens (color, text, effect styles) |

---

## Verify installation

```
Ask your agent: "Read the component list from [Figma file URL]"
Expected: a list of component names from the file
```
