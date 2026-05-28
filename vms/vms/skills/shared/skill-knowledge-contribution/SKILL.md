---
name: skill-knowledge-contribution
scope: fullstack
description: >
  Feedback loop for contributing new insights, patterns, and discoveries back
  to the shared VMS AI playbook. Triggered proactively when the agent spots
  something genuinely novel and undocumented. Always user-confirmed before any
  change or PR is created.
---

# Skill — Knowledge Contribution

## Agent Installation

| Agent | Install location |
|-------|-----------------|
| Claude Code | Append to `CLAUDE.md` in the service repo root |
| GitHub Copilot | `.github/copilot/skills/skill-knowledge-contribution.md` |
| Cursor | `.cursor/rules/skill-knowledge-contribution.mdc` |
| Gemini CLI | Append to `GEMINI.md` in the service repo root |

## Purpose

This skill closes the feedback loop: when you discover something useful in the
course of a task — a workaround, a pattern, a gotcha, a missing tool flag —
you offer to contribute it back to the shared VMS playbook so the whole team
benefits, not just this session.

---

## Scope boundary

**ALL contributions are strictly limited to `teams-to-share/vms/`.**
The `ai-playbook` repository is shared with other OPSWAT teams. Never touch
any file outside that subtree, including the repo root, `.github/`, or other
teams' `teams-to-share/<team>/` directories.

| Allowed targets | Forbidden |
|----------------|-----------|
| `teams-to-share/vms/skills/shared/<skill>/SKILL.md` | Anything outside `teams-to-share/vms/` |
| `teams-to-share/vms/instructions/vms-ai-harness.md` | Other teams' skill directories |
| New file under `teams-to-share/vms/skills/shared/skill-<name>/` | Repo root files (`README.md`, `.github/`, etc.) |
| `teams-to-share/vms/install/` docs (if skill indexes need updating) | |

---

## Trigger gates — all three must pass before surfacing a suggestion

| Gate | Condition |
|------|-----------|
| **Observed** | Encountered at least twice **or** directly caused a failure/confusion/blocked task |
| **Novel** | Not already covered in the target file (check before suggesting) |
| **Generalizable** | Applicable beyond this repo, this ticket, or this specific environment |

Identify the exact target file before prompting. If any gate fails, skip silently.

---

## Agent prompt protocol

Once the gates pass, surface a single callout:

```
💡 I noticed [concise observation].
   [One sentence on why it would help the team.]
   Want me to contribute this back to the shared playbook?  (yes / no / later)
```

- **yes** → follow the contribution workflow below
- **no** → acknowledge once, do not resurface
- **later** → re-surface at the natural end of the current task

**Anti-spam rule:** one unsolicited suggestion per task/workstream. Reset when:
- the user accepts and completes a contribution, or
- the user explicitly says "keep flagging things like this"

---

## Contribution workflow

### 1. Draft the change inline

Show the proposed diff or new content in the chat **before** touching any file.
Keep it minimal — only what the discovery actually covers, no speculative additions.

### 2. Confirm with user

Ask: *"Does this look right? I'll create a draft PR when you say go."*

Do not write any files until the user confirms the content.

### 3. Branch and PR

Use `skill-github-manager` with these VMS playbook-specific parameters:

| Parameter | Value |
|-----------|-------|
| Repo | `opswat-eng/ai-playbook` |
| Base branch | `vms/add-gh-install-script` (the VMS integration branch) |
| Branch name | `fix/vms-knowledge-<short-slug>` |
| Jira ticket | **Not required** for doc-only playbook edits |
| PR status | **Draft** — title must start with `[Knowledge]` |
| PR description | Fill "What changed" and "Why" sections only |

### 4. Self-review before marking ready

- No broken markdown, no missing headers
- No service-repo-specific details leaked into shared guidance
- Change is self-contained; does not unintentionally alter other VMS files

---

## Self-reference guard

**Do not invoke this skill while already working on files under
`teams-to-share/vms/`.** Fold the discovery into the current change instead.

---

## Data safety — forbidden content

Never include in a contribution:
- Secrets, tokens, credentials, or API keys
- Service-repo-specific paths, environment names, or internal host names
- Jira ticket numbers or incident narratives (generalize instead)
- Customer data, PII, or sensitive business logic
- One-off workarounds specific to a single project (generalize or skip)

---

## Hard rules

- **Gates first.** Never prompt unless all three gates pass.
- **Scope boundary.** Only write inside `teams-to-share/vms/`.
- **Draft only.** Contributions are always draft PRs — never push directly.
- **User confirms content before any file is written.**
- **One unsolicited suggestion per task** unless user opts in for more.
- **No scope creep.** Contribution must match the discovery exactly.
- **No self-invocation** while already editing playbook files.

---

## Examples

**Good triggers:**

| Discovery | Target |
|-----------|--------|
| `set -e` + `[[ ]] && var=1` exits silently when condition is false | `skill-writing-plans` or harness tip |
| `mapfile` silently fails inside a `gum spin` subshell — use a temp file | Relevant skill or harness |
| Blue Line's global CSS reset breaks app layout; needs `@layer base` override | `skill-ui-design` |

**Bad triggers (skip silently):**

| Discovery | Why |
|-----------|-----|
| A bug specific to the current project | File a Jira ticket instead |
| Something already in the harness, differently worded | Not novel |
| Anything involving credentials or environment config | Data safety |
