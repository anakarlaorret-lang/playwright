# Practice Software Testing — Playwright Portfolio

[![Playwright CI](https://github.com/anakarlaorret-lang/playwright/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/anakarlaorret-lang/playwright/actions/workflows/ci.yml)

Playwright Test and TypeScript portfolio framework for the [Practice Software Testing Toolshop](https://practicesoftwaretesting.com/) web application and its documented REST API.

## Project goals

- Demonstrate risk-based QA planning across UI and API.
- Practice maintainable Playwright, TypeScript, Page Object Model, and test fixtures.
- Validate documented sample-account authentication, including customer/admin roles and bearer-token protected profile access.
- Validate the TypeScript build and Chromium suite locally and in GitHub Actions CI.
- Keep external-service limitations and test boundaries explicit.

## Current status

Implemented coverage:

- Toolshop home page smoke check and automated axe accessibility scans of the home and login pages.
- Catalog search and category filtering.
- Customer login through the UI, including invalid credentials and malformed-email validation.
- Product detail navigation; mobile, tablet, desktop, touch, and landscape viewport emulation.
- Read-only API health, products, and categories checks.
- Customer/admin API login that obtains bearer tokens in memory, checks their role claims, and validates protected `/users/me` profile responses.
- A mocked empty-catalog boundary scenario and an executable Gherkin pilot for unmatched catalog search.
- Automated axe scans of home/login pages, with known upstream findings documented and new findings reported.

Selected read-only catalog/product UI tests can be run manually in Firefox and WebKit. `fullyParallel` remains disabled: two-worker tests against the shared hosted service showed intermittent failures. Cart workflows remain deferred until an isolated environment with reliable cleanup is available. The hosted demo suite remains read-only except for authentication attempts.

The public environment is shared. Current tests avoid creating or modifying persistent resources and do not run load, stress, security, or destructive tests.

## Prerequisites

- Node.js 20.18 or newer.
- npm.

## Install and run

```bash
npm ci
npx playwright install chromium
npm test
npx playwright show-report
```

For the selected Firefox/WebKit smoke tests:

```bash
npx playwright install firefox webkit
npm run test:cross-browser
```

Run TypeScript compilation:

```bash
npm run build
```

The unmatched-product catalog scenario is a small executable Gherkin pilot:

```bash
npm run test:gherkin
```

To evaluate fully parallel execution without enabling it by default:

```bash
npm run test:parallel-check
```

GitHub Actions runs the TypeScript build and API tests on pushes and pull requests. The CI badge reflects those checks; UI and selected Firefox/WebKit runs are manual because the hosted site has not reliably rendered from GitHub-hosted runners. A green default CI run does not mean UI tests ran. HTML/JSON reports and failure diagnostics are retained as workflow artifacts for seven days; video recording is disabled to keep artifacts small.

Dependabot checks npm and GitHub Actions dependencies weekly, grouping updates by ecosystem to reduce PR noise. No lint or code-scanning workflow is configured yet; do not treat TypeScript compilation as a substitute for formatting, lint, or security analysis.

Playwright uses two workers locally and one worker in CI. Full parallel execution (`fullyParallel`) is intentionally deferred until tests and data isolation are proven stable.

## Configuration and sample accounts

The web and API targets are the public hosted Toolshop services. Sample customer/admin credentials are documented by the upstream project and stored in [testData.json](utils/testData.json); these are public training credentials, not private account secrets. Do not put personal credentials or generated bearer tokens in the repository.

The targets can be overridden with `WEB_BASE_URL` and `API_BASE_URL` environment variables, for example when running against an authorized local instance.

The upstream application publishes its [API specification](https://api.practicesoftwaretesting.com/api/documentation) and [source repository](https://github.com/testsmith-io/practice-software-testing). Review the upstream license and terms before downloading, redistributing, hosting, or packaging source code or images. This portfolio targets the hosted training service and does not include or redistribute the application.

## Repository layout

```text
tests/                    Active UI and API tests
tests/fixtures.ts         API clients and in-memory bearer-token fixtures
pages/                    Shared and page-specific objects
utils/testData.json       Public sample accounts and test inputs
docs/TEST_STRATEGY.md     Scope, approach, risks, and boundaries
docs/TEST_PLAN.md         Prioritized scenarios and implementation status
tests/features/           Executable Gherkin behavior scenarios
tests/steps/              Playwright-BDD step definitions
.github/ISSUE_TEMPLATE/  Bug report form
playwright.config.ts      Playwright Test configuration
```

## Scope and limitations

The hosted app and API are external shared dependencies. Public-host tests are limited to read-only checks and authentication. Data-changing workflows, database verification, and performance tests require an isolated local or explicitly authorized environment with reliable cleanup. Playwright device profiles validate browser emulation, not physical-device behavior.

See [TEST_STRATEGY.md](docs/TEST_STRATEGY.md) and [TEST_PLAN.md](docs/TEST_PLAN.md) for details.

## Portfolio publication checklist

- [x] Publish the framework scope, test strategy, and prioritized test plan.
- [x] Keep the live demo read-only apart from intended authentication attempts.
- [ ] After publishing the Dependabot grouping configuration, close the existing individual update PRs and review the consolidated updates before merging.
- [ ] Add a concise project entry and repository link to the portfolio/CV, and describe the CI badge as build/API coverage rather than full UI CI.
