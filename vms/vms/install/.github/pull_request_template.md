## Summary

<!-- One-line TL;DR. -->

## What changed

<!-- Describe this PR: new behavior, fixes, added components, updated docs, or refactors. Call out key files if helpful. -->

## Why

<!-- Motivation: bug, requirement, follow-up, or migration step. (Links to tickets go in **Links** below.) -->

## Type of change

- [ ] Bug fix (no breaking change to public behavior)
- [ ] Feature / API or contract change
- [ ] Refactor / performance (no behavior change)
- [ ] Docs / CI or tooling only

## Links

<!-- Jira ticket, issue, design doc — or write "None". -->

-

## Verification

### Automated checks

- [ ] Tests pass
- [ ] Lint passes
- [ ] Build passes (no errors, no type errors)

### Frontend (skip if not applicable)

- [ ] `npm run build` exits 0 (0 type errors)
- [ ] `npm run lint` exits 0
- [ ] Visual QA requested — dark mode + light mode verified by reviewer

### Backend — Go (skip if not applicable)

- [ ] `gofmt -l .` prints no files
- [ ] `golangci-lint run` (same major version as CI)
- [ ] `go test ./... -count=1 -race -timeout=5m`
- [ ] After SQL/OpenAPI/proto edits: `make sqlc && make swagger && make proto` — clean working tree

### Database / API contract (skip if not applicable)

- [ ] Schema/migration is reversible (down migration exists) and tracked in the migration repo
- [ ] OpenAPI spec updated and regenerated if HTTP contract changed
- [ ] gRPC proto updated and regenerated if gRPC contract changed

## Security & authorization

<!-- Skip if this PR does not touch auth, cookies, IAM, secrets, or client input. -->

- [ ] N/A — no trust-boundary changes
- [ ] Authz reviewed for new or changed routes; inputs validated; no sensitive data in logs or error responses

## Manual testing

<!-- Optional: steps or scenarios you exercised beyond automated checks. -->

## Notes for reviewers

<!-- Risks, edge cases, deployment notes, feature flags, rollback plan. -->

