# Test Strategy — Movelo UI and Toolshop API

## 1. Purpose

This project is a professional portfolio and learning exercise for designing maintainable Playwright and TypeScript automation. The browser UI and API coverage intentionally target different systems because the public Movelo site is a landing page without a documented public API, while Toolshop provides a documented REST API and sample accounts.

## 2. Systems under test

- **UI:** [Movelo](https://movelo.com.uy/), an authorized public landing page for requesting moving quotes through WhatsApp.
- **API:** [Practice Software Testing (Toolshop)](https://api.practicesoftwaretesting.com/), using its published API and public sample accounts.
- **Self-hosting:** Movelo source or deployment configuration is not currently available in this workspace. The suite uses its public site and does not include or publish a copy. Revisit self-hosting only after the owner provides an authorized repository or deployment instructions.

The UI/API target split is explicit in environment configuration: `WEB_BASE_URL` points to Movelo and `API_BASE_URL` points to Toolshop by default. Both may be overridden for authorized compatible environments.

## 3. Objectives

- Verify Movelo's primary public landing-page experience, in-page navigation, FAQ, quote-link content, responsive layout, and selected accessibility rules.
- Validate Toolshop API response shapes, documented customer/admin authentication, protected profile access, and invalid-credential behavior.
- Keep external interactions read-only, tests independent, and reports useful without exposing credentials or tokens.
- Run the main Chromium UI/API suite in CI and use optional Firefox/WebKit runs for additional browser evidence.

## 4. Scope

### In scope

- Movelo landing-page heading, navigation to the moving-options section, and quote links with encoded WhatsApp message text.
- Native FAQ disclosure behavior, mobile/tablet/desktop viewport checks, and an automated axe scan of the landing page.
- One stakeholder-readable Gherkin scenario for a prepared furniture-move quote.
- Toolshop API status, product/category response shape, customer/admin profile authentication, and invalid login response.
- TypeScript compilation, CI reports, screenshots, traces, and retries limited to CI.

### Out of scope

- Sending messages, submitting forms, contacting providers, or initiating real moving requests through WhatsApp.
- Movelo backend, authentication, payment, operational workflows, database, or API testing; none is exposed through the public landing page.
- Toolshop browser UI tests; the existing UI checks against that shared demo were unreliable from GitHub-hosted runners and are no longer part of the active UI suite.
- Data-changing API calls, database assertions, load/performance testing, penetration testing, or claims of complete WCAG conformance.
- Physical-device certification; Playwright checks browser viewport and input emulation only.

## 5. Risk-based approach

1. **P0:** Render the public landing page and verify its primary quote link is correctly prepared.
2. **P1:** Verify in-page navigation, FAQ disclosure, responsive usability, and essential Toolshop API response shape.
3. **P2:** Check detailed quote-link templates, accessibility findings, and selected cross-browser behavior.

Assertions focus on user-visible behavior and documented response contracts. Avoid clicking external contact links or depending on volatile third-party data.

## 6. Automation design and safety

- Use Playwright Test with TypeScript, web-first assertions, accessible locators, and a small Movelo page object.
- Keep API tests and API authentication fixtures scoped to Toolshop. Tokens remain in memory and must not appear in reports or logs.
- Verify WhatsApp links by inspecting their `href` and target attributes. Do not follow these links or send messages.
- Use native `<details>`/`<summary>` interaction for FAQ coverage rather than implementation-specific event handlers.
- Keep Gherkin limited to the single business-readable quote-link scenario; retain lower-level assertions in regular Playwright tests.
- Run axe on the landing page and attach complete results. The baseline includes the documented Movelo contrast and label/name mismatch findings below; any finding with a different rule-and-selector pair fails the scan. These are known, temporarily accepted issues in an external site that this repository cannot modify, not evidence of WCAG conformance. Reassess the baseline when the site changes and remove entries when the owner resolves them.
- Keep two workers locally and one worker in CI. Do not increase parallelism or retries to hide instability.
- Store only reports and failure diagnostics for seven days; video is disabled to limit unnecessary artifacts.

### Known accessibility findings

The following findings were observed in the Movelo scan in [CI run #72](https://github.com/anakarlaorret-lang/playwright/actions/runs/42877625595) on 2026-11-10. They are tracked as external, temporarily accepted findings because the suite targets Movelo's public hosted site and does not have access to its source. The `label-content-name-mismatch` rule indicates that a control's accessible name does not match its visible label, which can affect users who rely on speech input or assistive technology.

- **Color contrast:** Existing findings in the navigation, CTA copy, and illustrative chat animation. Their exact rule-and-selector pairs are listed in the MOV-007 baseline in `tests/accessibility.spec.ts`.
- **Label/name mismatch (`label-content-name-mismatch`):** `.nav-btn`; `.hero-actions > .btn-main[target="_blank"][rel="noopener noreferrer"]`; `.fit-card[target="_blank"][rel="noopener noreferrer"]:nth-child(1)`, `:nth-child(2)`, and `:nth-child(3)`; `.carrier-copy > .btn-main[target="_blank"][rel="noopener noreferrer"]`.

The test excludes only these recorded rule-and-selector pairs. Any additional selector or violation rule remains unexpected and fails CI. Recheck the live page periodically; remove a baseline entry once the issue is resolved and do not describe the scan as an accessibility certification.

## 7. Environments and execution

- **Local:** Public Movelo UI and Toolshop API targets by default. `WEB_BASE_URL` and `API_BASE_URL` support authorized compatible environments.
- **CI:** Pushes and pull requests run the TypeScript build, Toolshop API tests, and Movelo Chromium UI suite. Firefox/WebKit homepage checks are opt-in through `workflow_dispatch`.
- **External availability:** CI uses the public Movelo site because no source or deployment configuration was provided for a private instance. A site outage can therefore fail the UI job; report that separately from a test regression.
- **Self-hosting:** Do not clone, package, or publish the application without an authorized source repository and deployment guidance. A locally hosted target is a future option once provided.
- **Parallel-readiness:** `npm run test:parallel-check` remains an evaluation command only. `fullyParallel` stays disabled until repeated runs prove independent and stable.
- **Sustainability:** Keep routine CI focused on a compact read-only suite, retain diagnostic artifacts briefly, and use run evidence before expanding coverage. This is not a measured carbon-footprint or SCI claim.
- **AI-assisted QA:** Treat generated ideas as suggestions only; validate every scenario and expected result against requirements.

## 8. Entry and exit criteria

### Entry

- Movelo's public landing page and Toolshop API are reachable.
- API sample accounts remain documented and authorized for demo use.
- Browser dependencies are installed and each test has a read-only expected result.

### Exit

- In-scope checks pass, or failures are triaged as application, test, or external-service issues.
- API tests verify essential response fields without asserting unstable global totals.
- No WhatsApp messages, persistent records, credentials, or bearer tokens are sent to artifacts.
- Results accurately distinguish Movelo UI coverage from Toolshop API coverage.

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Public Movelo site is unavailable or changes | Keep UI tests read-only; identify public-site failures as external dependencies and use an authorized local instance when deployment material is available. |
| A CTA accidentally contacts a real person | Inspect the link only; never click it or submit a message. |
| UI/API targets are mistaken for one application | State the target for each suite in configuration, README, test plan, and CI step names. |
| Toolshop account or API changes | Verify against the published API behavior and keep tokens scoped to fixtures. |
| Token or account data leaks into artifacts | Do not log tokens or authentication state; keep only sanitized diagnostics. |
| Viewport emulation is overstated | Describe results as browser emulation, not physical-device testing. |
| Movelo self-hosting is attempted without source permission/material | Keep using the authorized public UI until an authorized source/deployment setup is supplied; do not copy the public site. |

## 10. Measures of success

- Passing, repeatable Movelo UI checks and useful failure diagnostics.
- Toolshop API assertions for response shape and authentication behavior.
- CI status and duration reported with the target named accurately.
- No unintended outbound contact or persistent data change.

Passing tests do not prove the absence of defects or validate behavior outside the documented scope.

## 11. Deliverables

- This strategy and the prioritized [test plan](./TEST_PLAN.md).
- Playwright and TypeScript framework configuration for the Movelo UI and Toolshop API.
- Movelo UI tests, Toolshop API tests, a small Gherkin scenario, and scoped API fixtures.
- GitHub Actions build/API/UI workflow and Playwright diagnostic reports.
