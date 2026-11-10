# Playwright and TypeScript QA Portfolio

[![Playwright CI](https://github.com/anakarlaorret-lang/playwright/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/anakarlaorret-lang/playwright/actions/workflows/ci.yml)

This portfolio uses Playwright Test and TypeScript to demonstrate UI automation against the [Movelo landing page](https://movelo.com.uy/) and API testing against the [Practice Software Testing (Toolshop) API](https://api.practicesoftwaretesting.com/). The UI and API targets are intentionally separate: Movelo exposes a public marketing experience, while Toolshop supplies a documented API and sample accounts.

## Coverage

- Movelo landing page rendering and in-page navigation.
- Read-only validation of WhatsApp quote links and prefilled messages; tests inspect link targets but never open or send a message.
- FAQ disclosure behavior, responsive viewport checks, and an automated axe scan of the landing page.
- A small Playwright-BDD scenario for a prepared furniture-move quote link.
- Toolshop API health, product and category response shapes, customer/admin authentication, protected profile access, and invalid-credential rejection.
- TypeScript compilation, Chromium UI/API tests on pushes and pull requests, and optional Firefox/WebKit smoke tests.

The UI suite does not claim coverage of Movelo's WhatsApp service, operational backend, customer data, or database. No form submissions or state-changing workflows are part of this suite.
The accessibility scan retains a documented baseline of existing color-contrast findings in the public page; additional findings fail the check.

## Requirements and local runs

- Node.js 20.18 or newer
- npm

```bash
npm ci
npx playwright install chromium
npm run build
npm test
npx playwright show-report
```

Run the Gherkin scenario by itself:

```bash
npm run test:gherkin
```

Run the selected homepage checks in Firefox and WebKit:

```bash
npx playwright install firefox webkit
npm run test:cross-browser
```

The public targets can be overridden with `WEB_BASE_URL` and `API_BASE_URL` for authorized compatible environments. `WEB_BASE_URL` defaults to Movelo; `API_BASE_URL` defaults to Toolshop.

## CI and external dependencies

GitHub Actions runs the TypeScript build, Toolshop API checks, and Movelo Chromium UI tests on pushes and pull requests. Firefox/WebKit smoke tests remain opt-in through `workflow_dispatch`. The UI target is still a public hosted site: a self-hosted Movelo environment cannot be configured until its source or deployment instructions are available. CI does not package or publish a copy of the site.

The Movelo site is an external dependency, so a service outage can fail UI checks. Tests are read-only and deliberately avoid following WhatsApp links. Playwright retains HTML/JSON reports and failure screenshots/traces for seven days; video recording is disabled.

The Toolshop sample accounts are documented public training credentials in [testData.json](utils/testData.json). Bearer tokens are created in memory for API checks and must not be logged, attached, or committed.

## Repository layout

```text
tests/                    Movelo UI and Toolshop API tests
tests/features/           Executable Gherkin scenarios
tests/steps/              Playwright-BDD step definitions
pages/                    Movelo page object
utils/testData.json       Toolshop sample accounts and invalid-login data
docs/TEST_STRATEGY.md     Targets, risks, scope, and execution approach
docs/TEST_PLAN.md         Prioritized scenarios and implementation status
playwright.config.ts      Playwright Test and browser-project configuration
```

See [TEST_STRATEGY.md](docs/TEST_STRATEGY.md) and [TEST_PLAN.md](docs/TEST_PLAN.md) for boundaries and traceability.
