## Summary

<!-- One-line TL;DR for the PR title / list views (optional if **What changed** is enough). -->

## What changed

<!-- New packages, public API, behavior fixes, refactors. Point to key paths (e.g. `pkg/kafka/...`). -->

## Why

<!-- Bug, requirement, or follow-up. Links go in **Links** below. -->

## Type of change

<!-- Uncomment or adjust as needed. -->

- [ ] Bug fix (no breaking change to public behavior)
- [ ] Feature / public API or contract change
- [ ] Refactor / performance (no behavior change)
- [ ] Docs / CI or tooling only

**AI PR % (informational):** If materially AI-assisted, use label `ai-generated` / `ai-driven` / `claude` / `claude:done` or `#AIDriven` / `#ai-driven` / `#ai_driven` in title/body — `opswat-automated-coder` is auto-counted. **Metadefender TRI** (kiosk esp.): tag when applicable.

## Links

<!-- Jira ticket, issue, design doc — or write "None". -->

-

## Public API & versioning

<!-- This repo is a shared Go module; consumers pin semver tags. -->

- [ ] N/A — no public surface change
- [ ] **Breaking:** import path, exported types, or behavior changed — describe migration for consumers and bump guidance (semver major / minor).
- [ ] **Non-breaking:** new optional API or additive behavior only

## Testing

<!-- Prefer tests that lock behavior before or with the change (TDD-friendly). -->

- [ ] New or updated **unit tests** for the code paths touched
- [ ] **Integration / E2E** (Kafka, etc.) — if added, document how to run (`go test -tags=...`, env vars, compose) or link to CI job
- [ ] Edge cases / error paths covered where reviewers care (nil inputs, validation, context cancellation)

## Security

<!-- Libraries still handle untrusted config and must not leak secrets. -->

- [ ] N/A — no trust-boundary or sensitive changes
- [ ] Inputs validated at boundaries; errors and logs avoid sensitive data; no hardcoded secrets

## Local verification

<!-- Match `.github/workflows/ci.yml` when this repo adds or updates CI. -->

- [ ] `gofmt -l .` prints no files
- [ ] `go vet ./...`
- [ ] `go test ./... -count=1 -race -timeout=5m` (use `CGO_ENABLED=1` locally if `-race` requires it)

## CHANGELOG

<!-- Update [CHANGELOG.md](CHANGELOG.md) when cutting a release or when the team asks for release notes in the PR; small follow-ups on the same initiative may skip per team convention. -->

- [ ] N/A or deferred
- [ ] CHANGELOG updated under `[Unreleased]` (or version section) with accurate **Added** / **Changed** / **Fixed** / **Removed**

## Manual testing

<!-- Optional: steps beyond `go test`, e.g. local Kafka, consumer/producer smoke. -->

## Notes for reviewers

<!-- Risks, rollout, feature flags, follow-up tickets. -->
