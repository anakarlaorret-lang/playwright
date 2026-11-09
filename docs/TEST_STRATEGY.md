# Test Strategy — Practice Software Testing Portfolio

## 1. Purpose

This project is a professional portfolio and learning exercise for designing and maintaining a Playwright and TypeScript automation framework. The system under test is Practice Software Testing (Toolshop), a public training application with a browser UI and a documented REST API.

The portfolio aims to demonstrate practical QA judgment across UI and API layers, role-aware authentication, responsive browser testing, diagnostics, and maintainable automation. The public service is an external dependency, so tests must remain small, predictable, and respectful of shared state.

## 2. System under test and assumptions

- Web application: [Practice Software Testing](https://practicesoftwaretesting.com/).
- API: [Toolshop REST API](https://api.practicesoftwaretesting.com/).
- API specification: [Swagger documentation](https://api.practicesoftwaretesting.com/api/documentation).
- The live endpoints and sample accounts are supplied for software-testing practice. Their availability, data, and behavior may change.
- Published sample accounts, including `user` and `admin` roles, may be used for intended authentication and read-only checks. They are public demo credentials, not private secrets.
- The project does not assume ownership or control of the hosted service.
- The upstream project documents a self-hosted Docker environment. Review its current license and terms before downloading, redistributing, hosting, or using its source or images beyond permitted training use.

## 3. Objectives

- Validate high-value Toolshop user journeys in the browser.
- Exercise the documented REST API with response, schema-shape, and authentication checks.
- Demonstrate successful authentication for user and admin sample roles without exposing tokens in logs or reports.
- Keep tests isolated, readable, repeatable, and explicit about external dependencies.
- Use generated data only when it can be safely isolated and cleaned up.
- Produce actionable reports and evidence, and prepare the framework for CI execution.

## 4. Scope

### In scope

- Application smoke checks for the Toolshop home/catalog page.
- UI login for documented user and admin sample accounts, including destination and role-appropriate account navigation where verified.
- API health, product, category, authentication, and current-user/profile checks against documented endpoints.
- Bearer-token handling in test fixtures, with tokens kept in memory and never logged or committed.
- Representative responsive UI checks at mobile and desktop viewport sizes.
- Chromium execution in GitHub Actions CI; additional browser compatibility coverage can be added after the baseline is stable.
- Risk-based test planning, issue tracking, and failure diagnostics.

### Out of scope for the shared hosted environment

- Creating, editing, or deleting persistent users, products, categories, brands, carts, orders, favorites, invoices, or messages.
- Tests that depend on data another user or test can modify.
- Load, stress, soak, or performance tests.
- Penetration testing, vulnerability scanning, or security claims beyond documented authentication/authorization behavior.
- Database assertions against the hosted service.
- Native mobile application or physical-device certification.

Destructive or state-changing API workflows may be considered only against a local or explicitly authorized isolated environment with reliable setup and teardown. Do not silently skip cleanup failures.

## 5. Risk-based test approach

Prioritize scenarios by customer impact and likelihood of failure:

1. **P0 — Critical:** application availability, documented sample-account authentication, and protected current-user access.
2. **P1 — Important:** product/category API response integrity, account navigation, role distinction, and responsive usability.
3. **P2 — Supporting:** additional filters, sorting, validation, and browser coverage when stable and valuable.

Assertions should verify documented contracts and user-visible outcomes. Avoid asserting volatile shared catalog totals or undocumented implementation details.

## 6. Automation design

- Use Playwright Test with TypeScript, built-in fixtures, API request contexts, and web-first assertions.
- Keep UI and API base URLs independently configurable.
- Use accessible UI locators and Page Objects for page-specific interactions; keep business expectations in the tests.
- Keep each test independent. Do not rely on shared browser storage state or execution order.
- Acquire authorization tokens through the documented login endpoint in a scoped fixture. Keep tokens in memory, attach them only to the API context that needs them, and never print them.
- Validate API response status and relevant response fields. Parse JSON as untrusted input and fail explicitly if required fields are missing.
- Avoid fixed sleeps. Local runs do not retry failed tests; CI retries once to mitigate transient failures while preserving the original attempt in the report. Investigate recurring instability rather than relying on retries.
- Configure two Playwright workers for local runs and one worker in CI to limit concurrent traffic against the shared public application/API. Increase parallelism only after the target and tests have demonstrated stable behavior.
- Use generated data only for an authorized target where cleanup is possible. The hosted target's persistent resources must not be modified by this suite.

### Test setup and cleanup

- Use `test.beforeEach` in a spec or `test.describe` when its tests share a UI starting state, such as opening the catalog or login page. Keep test-specific actions and assertions in the test itself.
- Use fixtures for reusable resources with a lifecycle, such as API request contexts and authenticated sessions. Put setup before `await use(resource)` and guaranteed cleanup in `finally` after it.
- Do not add empty or duplicate `afterEach` hooks when a fixture already owns and disposes the resource. Use an `afterEach` hook only for genuinely shared post-test behavior that is not resource teardown.

## 7. Execution, environments, and diagnostics

- **Local primary target:** public Toolshop web app and API, using only small read-only requests and published demo accounts.
- **Local isolated alternative:** upstream Docker environment for state-changing tests, subject to its license and setup requirements.
- **CI:** GitHub Actions runs the TypeScript build and API suite on pushes and pull requests. UI tests against the public demo are manually dispatchable because the hosted site did not reliably render pages from GitHub-hosted runners. CodeQL scans the TypeScript project and Dependabot checks npm and GitHub Actions dependencies. Artifacts retain reports and failure traces/screenshots, not videos.
- **Parallelism:** use two workers locally and one worker in CI. Do not enable `fullyParallel` until test independence, fixture/data isolation, and repeated parallel stability have been demonstrated; account for rate limits of the shared hosted target.
- **Browsers:** start with Chromium; add Firefox and WebKit for high-priority flows after the baseline is reliable.
- **Responsive:** use representative Playwright viewport/device emulation. Describe it as emulation, not physical-device coverage.
- Publish Playwright HTML reports and retain traces/screenshots on failure where useful. Do not include bearer tokens, authentication state, or unnecessary personal data in artifacts.
- Distinguish application failures from public service outages or shared-data changes.

## 8. Entry and exit criteria

### Entry

- The web application and API health endpoint are reachable.
- The active OpenAPI specification and documented sample accounts have been checked.
- Dependencies and required Playwright browsers are installed.
- The test has a documented expected result and does not mutate shared hosted data.

### Exit

- All in-scope P0 scenarios pass, or failures are triaged and their cause documented.
- API tests validate successful responses and essential fields without depending on unstable global counts.
- Tokens are not present in logs, screenshots, traces, committed files, or report attachments.
- Tests are independent and repeatable; public-environment limitations are reported honestly.

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Public application/API downtime or contract changes | Record the target version/status; distinguish service availability from a test regression and review the published OpenAPI spec. |
| Shared demo data changes | Prefer read-only API calls and assertions about shape/relationships rather than exact totals. |
| Token leakage | Keep tokens scoped to fixtures and memory; never attach authorization headers or token values to test output. |
| Accidental persistent writes | Keep public-host tests read-only except login; reserve writes for an authorized isolated environment. |
| Role assumptions drift | Verify user/admin behavior against current published documentation and application behavior; do not infer permissions from labels alone. |
| Mobile emulation overstated | Report viewport/device emulation separately from physical device testing. |
| Upstream source/license constraints | Review upstream terms before self-hosting, redistributing, or packaging source/images. |

## 10. Measures of success

- Coverage of documented P0 UI and API scenarios.
- Stable outcome and response-shape checks for each API scenario.
- Verified user/admin identity and role behavior without exposing tokens.
- Flaky-test and repeat-failure trends.
- CI status, run time, and useful failure artifact publication; distinguish API CI results from manually triggered public-site UI checks.
- Responsive viewport and browser coverage accurately represented.

Passing tests do not prove the absence of defects or validate behavior outside the documented scope.

## 11. Deliverables

- This strategy and a prioritized test plan.
- Playwright and TypeScript framework configuration for the web app and API.
- UI and API tests for documented, non-destructive Toolshop scenarios.
- Reusable Page Objects, API fixtures, and test data.
- GitHub Actions CI, CodeQL analysis, Dependabot update configuration, and Playwright diagnostic reports.
- README with verified setup, run commands, scope, limitations, and upstream references.
