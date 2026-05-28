# Pull request templates (VMS)

Canonical copies of `.github/pull_request_template.md` from Go/backend repos that use them. Edit here when you want **team-wide** wording (AI disclosure, Links, shared checklists), then paste or copy into each repository’s `.github/pull_request_template.md` so Bitbucket/GitHub stays aligned. **Ownership:** whoever changes shared wording updates this folder first, then copies into the target repos in the same PR cycle (or opens follow-up PRs) so the playbook does not drift from production `.github` files.

| File | Source repository | Notes |
|------|-------------------|--------|
| [vms-api-go.md](vms-api-go.md) | `vms-api-go` | OpenAPI, sqlc, proto, migration repo pointer, `viper_bind_struct` tests, `[claude-review]` |
| [vms-common-go.md](vms-common-go.md) | `vms-common-go` | Shared module: semver / breaking API, CHANGELOG, `go test -race` |
| [vms-notification-center.md](vms-notification-center.md) | `vms-notification-center` | Proto/sqlc/migrations in-repo, NC crypto/HMAC checklist |

**Repos in the workspace without a dedicated template today:** `vms-db-migration`, `vms-workflows-sample` (add a file here when you introduce one).

**Suggested sync command** (from a clone of `ai-playbook`, adjust paths):

```bash
cp teams-to-share/vms/pull-request-templates/vms-api-go.md ../vms-api-go/.github/pull_request_template.md
cp teams-to-share/vms/pull-request-templates/vms-common-go.md ../vms-common-go/.github/pull_request_template.md
cp teams-to-share/vms/pull-request-templates/vms-notification-center.md ../vms-notification-center/.github/pull_request_template.md
```
