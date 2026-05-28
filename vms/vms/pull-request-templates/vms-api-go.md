## Summary

<!-- One-line TL;DR for the PR title / list views (optional if **What changed** is enough). -->

## What changed

<!-- Describe this PR: new behavior, fixes, endpoints, queries, or refactors. Call out key files or areas if helpful. -->

## Why

<!-- Motivation: bug, requirement, or follow-up. (Links to tickets go in **Links** below.) -->

## Type of change

<!-- Uncomment or adjust as needed. -->

- [ ] Bug fix (no breaking change to public behavior)
- [ ] Feature / API or contract change
- [ ] Refactor / performance (no behavior change)
- [ ] Docs / CI or tooling only

**AI PR % (informational):** If materially AI-assisted, use label `ai-generated` / `ai-driven` / `claude` / `claude:done` or `#AIDriven` / `#ai-driven` / `#ai_driven` in title/body — `opswat-automated-coder` is auto-counted. **Metadefender TRI** (kiosk esp.): tag when applicable.

## Links

<!-- Jira ticket, issue, design doc — or write "None". -->

-

## API & data contract

<!-- Skip if this PR does not touch HTTP, gRPC, or SQL. -->

- [ ] Updated `swagger/openapi.yaml` for HTTP contract changes and ran `make swagger`
- [ ] Updated `db/queries/*.sql` for query changes and ran `make sqlc`
- [ ] Ran `make proto` if `proto/` changed
- [ ] Schema/migration is tracked in the migration repo (vms-db-migration) — short note or link to migration PR:

## Security & authorization

<!-- Skip if this PR does not touch auth, cookies, IAM, or client input. -->

- [ ] N/A / no trust-boundary changes
- [ ] Authz reviewed for new or changed routes; inputs validated; no sensitive data in logs or error responses

## Local verification (matches CI)

- [ ] `gofmt -l .` prints no files
- [ ] `golangci-lint run` (same major version as CI)
- [ ] `go test -tags=viper_bind_struct ./... -count=1 -timeout=5m`
- [ ] After SQL/OpenAPI/proto edits: `make sqlc && make swagger && make proto` — clean working tree (`git status`)

## Manual testing

<!-- Optional: steps or scenarios you exercised beyond automated tests. -->

## Notes for reviewers

<!-- Risks, edge cases, manual test hints, feature flags. -->

<!--
  Claude Code PR review: add `[claude-review]` to the PR **title** to run the review workflow (see `.github/workflows/claude.yml` and `CLAUDE.md`).
-->
