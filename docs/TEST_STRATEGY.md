# Test Strategy — SauceDemo Playwright Portfolio

## 1. Purpose

This project is a professional portfolio and learning exercise for designing and maintaining an automated testing framework with Playwright and TypeScript. SauceDemo (Swag Labs) is the sole application under test for the initial project scope.

The framework should demonstrate sound QA judgment, readable and reliable automation, useful failure diagnostics, and repeatable execution locally and in CI. The quality of the strategy and evidence matters more than the number of tools or test cases.

## 2. Application and assumptions

- Application: [SauceDemo](https://www.saucedemo.com/), a public e-commerce demo provided by Sauce Labs.
- The application is an external dependency. Its availability, data, behavior, and UI may change without notice.
- Tests must use only the public demo as intended, with its documented practice accounts and normal user flows.
- The project does not assume access to SauceDemo's source code, internal API contract, infrastructure, or database.
- Do not run load, stress, security, or destructive tests against the public demo.

## 3. Objectives

- Validate the critical user journeys available in SauceDemo.
- Demonstrate risk-based test selection and clear expected outcomes.
- Keep tests understandable, independent, deterministic, and maintainable.
- Exercise TypeScript and Playwright capabilities using idiomatic patterns.
- Make failures diagnosable through reports and retained test evidence.
- Run the suite consistently on a developer machine and in continuous integration.

## 4. Scope

### In scope

- Smoke checks for the login page and the authenticated inventory page.
- Authentication scenarios, including valid and invalid login outcomes.
- Product catalog behavior, including sorting where supported.
- Cart operations: adding, reviewing, and removing products.
- Checkout validations and the successful checkout journey.
- Responsive web checks for representative mobile, tablet, and desktop viewport sizes.
- Critical regression coverage for the user journeys above.
- Browser and operating-system coverage, introduced incrementally after the primary suite is stable.
- CI execution, test reporting, and failure evidence.

### Out of scope

- Testing or asserting undocumented backend APIs or internal implementation details.
- Database testing or claims of data integrity beyond what the UI makes observable.
- Load, stress, soak, or performance testing against SauceDemo.
- Penetration testing, vulnerability scanning, or claims of comprehensive security coverage.
- Native Android or iOS application testing and testing on physical devices.
- Exhaustive visual-regression coverage across every device and viewport.
- Testing other production websites as part of this initial project.

Additional tools such as Postman, k6, SQL clients, Sauce Labs Cloud, AI-assisted QA, or test-management integrations (Jira with Xray or TestRail) may be considered later. They are not required to meet this strategy and must have a controlled, authorized target and a clear portfolio purpose before adoption. Before publishing, evaluate whether a small test-management integration would strengthen the portfolio; choose at most one test-case management approach and document the decision.

## 5. Test approach

### Risk-based coverage

Prioritize scenarios by user impact and likelihood of failure:

1. **P0 — Critical:** a user can authenticate, select a product, complete checkout, and see the expected completion state.
2. **P1 — Important:** invalid or incomplete inputs are rejected correctly; cart changes and catalog sorting behave as expected.
3. **P2 — Supporting:** less critical presentation or edge cases that add meaningful coverage without making the suite brittle.

Each automated test should have a focused purpose and a verifiable outcome. Prefer a small number of high-value checks over duplicating assertions across long end-to-end scripts.

### Automation design

- Use Playwright Test with TypeScript and its built-in fixtures, assertions, and auto-waiting.
- Prefer user-facing locators such as roles, labels, and visible text. Use stable test attributes when available and justified.
- Keep tests independent. A test must establish the state it needs and must not rely on another test's execution order or shared authenticated browser state.
- Keep test data explicit and non-sensitive. Do not commit personal credentials, live session state, or secrets.
- Use Page Objects or shared helpers where they reduce meaningful duplication; avoid adding layers that obscure the user flow.
- Avoid fixed sleeps and broad, success-shaped fallbacks. Failures should identify the unmet expectation.

### Execution and diagnostics

- Run the focused suite locally during development and the agreed regression suite in CI.
- Start with Chromium as the primary browser. Add Firefox and WebKit coverage once the core tests are stable; prioritize critical flows for cross-browser runs.
- Add representative responsive projects using Playwright device descriptors and viewport settings: at least one Android-sized profile, one iOS-sized profile, and desktop viewport coverage. Check key pages and the critical purchase flow for usable layout and interactions, not pixel-perfect equality.
- Treat Android/iOS device profiles as browser-context emulation. They help validate responsive web behavior but do not prove behavior on physical devices or fully reproduce each operating system.
- To claim Windows and macOS coverage, run selected browser tests on CI runners for those operating systems (or an authorized cloud device service). A viewport or device descriptor alone does not emulate Windows or macOS.
- Keep retries limited and visible. A retry must not be used to conceal flaky tests; investigate and track recurring instability.
- Produce a Playwright HTML report and retain useful failure evidence, such as traces and screenshots. Capture video only when it materially helps diagnosis.
- Keep CI artifacts free of secrets and unnecessary user data.

## 6. Test environments and data

- **Local:** developer workstation with the Node.js version and dependencies specified by the repository.
- **CI:** GitHub Actions, using a reproducible dependency installation and Playwright browser setup.
- **Responsive coverage:** representative Playwright device profiles and viewport sizes, with exact profiles selected to match the Playwright version in the repository.
- **Desktop OS coverage:** Windows first; macOS CI coverage can be added as a separate matrix job when practical. Record the OS/browser combination in results.
- **Target:** the public SauceDemo site; no private test environment or backend access is assumed.
- **Test data:** practice accounts and products provided by the demo. Avoid tests that depend on data left behind by a previous run.

Because the target is external, distinguish product regressions from environment or availability failures in reports and issue tracking.

## 7. Entry and exit criteria

### Entry

- The target site is reachable.
- Dependencies and required Playwright browsers are installed.
- The test scope and expected outcomes are documented.
- Tests use permitted demo accounts and do not require private credentials.

### Exit

- All in-scope P0 scenarios pass in the primary browser, or any failure is triaged with its cause documented.
- The planned responsive smoke checks pass at the selected mobile and desktop viewport sizes, or any layout limitation is documented.
- The regression run produces a readable report and failure evidence when applicable.
- Tests are repeatable and do not depend on execution order or leftover state.
- Known limitations, skipped coverage, and external-environment failures are reported honestly.

## 8. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Public demo downtime or behavior changes | Keep the external dependency explicit; distinguish target outages from test defects and avoid claiming guaranteed availability. |
| Brittle selectors or UI changes | Prefer accessible, user-facing locators and review failures against the actual UI before changing assertions. |
| Shared or residual state | Make tests independent and use only the demo's intended flows and data. |
| Flaky tests hidden by retries | Keep retries limited, monitor repeated failures, and fix root causes rather than increasing retry counts. |
| Emulated mobile coverage is mistaken for physical-device or OS validation | Label emulation accurately and use real-device/cloud or OS-specific CI runs only when those claims are required. |
| Browser/device matrix increases run time and maintenance | Begin with representative profiles and critical flows; expand the matrix based on risk and observed defects. |
| Scope expanding into unsupported API, database, or performance claims | Keep these areas out of scope until an authorized, controllable environment and measurable objectives exist. |
| Secrets or session data accidentally committed | Use only public practice credentials; review and exclude authentication state and sensitive artifacts. |

## 9. Measures of success

- P0 scenario coverage against the documented plan.
- Pass/fail and repeat-failure trends for critical scenarios.
- Flaky-test rate, with retries and their outcomes visible.
- CI execution time and successful artifact publication.
- Browser coverage for the critical journeys.
- Responsive coverage by selected viewport/device profile and, where configured, OS/browser combination.
- Defects and limitations documented with reproducible evidence.

These measures describe suite health and coverage; passing tests alone do not prove the absence of defects.

## 10. Deliverables

- This strategy and a prioritized test plan.
- Playwright and TypeScript framework configuration.
- Automated UI tests for the agreed SauceDemo journeys.
- CI workflow with reports and diagnostic artifacts.
- README with verified setup, run commands, scope, and limitations.