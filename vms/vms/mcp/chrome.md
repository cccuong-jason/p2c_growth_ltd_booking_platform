# Chrome MCP (Playwright) — Setup & Usage Guide

## Scope: Frontend only

> **Backend engineers: skip this.** Chrome MCP is used exclusively for visual UI
> verification in `vms-community-fe`. Do not install it for Go service repositories.

Frontend engineers invoke this MCP during `skill-ui-design` (Step 7) and
`skill-verification` (Step 4) to produce screenshot evidence before claiming any
UI task complete.

---

## What it does

Controls a real Chromium browser via Playwright:
- Navigate to pages and capture screenshots (dark + light mode)
- Inspect the DOM and computed CSS
- Run accessibility audits (aria-labels, focus rings, contrast)
- Simulate user interactions to test dynamic states
- Capture console errors that don't appear in the terminal

## When to use

| Situation | Action |
|-----------|--------|
| After implementing a UI component | Screenshot dark + light mode; compare with Figma spec |
| Accessibility check | Audit for missing `aria-label`, contrast failures, focus ring |
| Debugging a visual bug | Inspect DOM, computed styles, console errors live |
| Verifying loading/empty/error states | Simulate state and screenshot as evidence |
| Pre-PR visual check | Navigate full changed page flow; screenshots become PR evidence |

---

## Prerequisites

- Node.js 18+ and `npx` on PATH
- A running local dev server (`npm run dev` or `docker compose up`) before invoking

---

## Installation

### Claude Code

```bash
claude mcp add chrome -- npx -y @playwright/mcp --browser chromium
```

Or add to `~/.claude/claude_mcp_settings.json`:

```json
{
  "mcpServers": {
    "chrome": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp", "--browser", "chromium"]
    }
  }
}
```

### Cursor

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "chrome": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp", "--browser", "chromium"]
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
      "chrome": {
        "command": "npx",
        "args": ["-y", "@playwright/mcp", "--browser", "chromium"]
      }
    }
  }
}
```

---

## Dark mode toggle

Dark mode is the primary VMS experience. Always screenshot dark mode first.

```
[Chrome MCP] Navigate to http://localhost:5173/<route>
Screenshot → dark mode evidence

[Chrome MCP] Evaluate: document.documentElement.classList.remove('dark')
Screenshot → light mode evidence
```

## Verify installation

```
Ask your agent: "Navigate to http://localhost:5173 and take a screenshot"
Expected: a screenshot of the local dev server
```
