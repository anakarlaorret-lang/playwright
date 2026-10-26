Test Strategy – Movelo Project

1. Objective
Define the overall approach, scope, and guidelines for automated testing of two web applications using Playwright and TypeScript:

* SauceDemo: a demo e‑commerce application provided by Sauce Labs, designed for automation practice. It offers stable, predictable flows (login, product catalog, cart, checkout) that allow demonstration of end‑to‑end UI, API, and validation testing in a controlled environment.

* Movelo: a real production website, used to showcase the ability to design and maintain tests against live, evolving features. It highlights adaptability, robustness of selectors, and regression testing in a dynamic context.

The goal is to ensure critical user journeys are validated across both apps, demonstrate breadth of testing (UI, API, performance checks, basic security validations), and integrate the suites into CI/CD pipelines. 

2. Scope

* In Scope:
    - Smoke tests: homepage load, visibility of key elements.
    - Functional tests: login, navigation, contact for submission.
    - Validation tests: required fields, email format, error messages.
    - Regression tests: repeat critical flows on each release.
    - Cross-browser testing: Chromium, Firefox, WebKit.
    - CI/CD integration: GitHub Actions.
    - UI Performance checks: (navigation timing, response times, screenshot comparissons).
    - Basic Security validations in UI: (password field masked, form rejects malicious input)
    - API Testing: Validate backend + frontend consistency. 
        > Call /login API -> verify response
        > Run UI login -> confirm same behavior

* Out of Scope:
    - Full Performance testing: Playwright is not a full performance testing tool, so it can't simulate other than basic metrics.
    - Full Security testing: Playwright is not a penetration testing tool. True security testing requires specialized tools (OWASP ZAP, etc...)

3. Approach
* Framework: Playwright  + TypeScript.
* Design Pattern: Page Object Model (POM) for modularity.
* Data Management: JSON fixtures for credentials and form inputs.
* Reporting: Playwright's native HTML reporter.
* Evidence: Screenchots and videos captured on failures.
* Automation: GitHub Actions pipeline with browser matrix.

4. Type of Testing
* Smoke Testing: Verify site loads and essential elements are visible.
* Functional Testing: Validate login, navigation, and form submission.
* Validation Testing: Ensure proper error handling and input validation.
Regression Testing: Re-run critical flows after updates.
* Cross-Browser Testing: Confirm compatibility across supported browsers.

5. Tools
* Playwright (automation framework).
* TypeScript (typed languag for maintainability).
* GitHub Actions (CI/CD).
* VS Code (IDE).
* npm/yarn (dependenciy management).

6. Test Environment
* Local: Windows 10, Node.js LTS
* CI/CD: GitHub Actions with browser matrix.
* Data: Dummy credentials and simulated form inputs.

7. Entry and Exit Criteria
* Entry: Site accessible, environment configured, PAge Objects created.
* Exit: All critical cases executed, HTML report generated, evidence captured.

8. Risk and Mitigation
* UI changes: Use robust selectors (data-testid).
* Unavailable credentials: Use dummy accounts.
* Incomplete features: Mark tests as SKIP
* Execution time in CI/CD: Run tests in parallel.

9. Roles and Resposibilities
* QA Engineer: Design strategy, implement Page Objects, write tests.
* Development Team: Provide support for test data end endpoints.
* CI/CD Owner: Configure pipelines and environments.

10. Metrics
* Percentage of critical flows automated.
* Average execution time of the suite.
* Number of defects caught during regression.
* Browser coverage achieved.

11. Deliverables
* TEST_STRATEGY.md: strategy document.
* TEST_PLAN.md: prioritized test cases.
* pages/: Page Objects.
* tests/: automated suites.
* HTML reports and evidence (screenshots/videos).