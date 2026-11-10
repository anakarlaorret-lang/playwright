# Test Plan — Movelo UI and Toolshop API

This plan describes active coverage only. See [TEST_STRATEGY.md](./TEST_STRATEGY.md) for target separation, safety boundaries, and external-service risks.

## Priorities

- **P0 — Critical:** Movelo landing page and primary quote entry point; Toolshop API health and protected profile access.
- **P1 — High:** quote options, FAQ behavior, responsive layout, and products/categories response integrity.
- **P2 — Supporting:** accessibility scan, Gherkin scenario, and invalid-credential behavior.

## Scenarios

| ID | Priority | Target / Layer | Scenario | Expected result | Status |
|---|---|---|---|---|---|
| MOV-001 | P0 | Movelo UI | Render the landing page | Expected title, hero heading, and main content are visible. | Implemented |
| MOV-002 | P1 | Movelo UI | Navigate to moving options | The in-page link updates the fragment and brings the section into view. | Implemented |
| MOV-003 | P0 | Movelo UI | Inspect quote links | The primary CTA and three service options contain WhatsApp URLs with prepared text; no link is followed. | Implemented |
| MOV-004 | P1 | Movelo UI | Use the page at a mobile viewport | Hero and primary request CTA remain visible with no horizontal overflow. | Implemented |
| MOV-005 | P1 | Movelo UI | Use navigation at a tablet viewport | Navigation and moving options remain visible with no horizontal overflow. | Implemented |
| MOV-006 | P1 | Movelo UI | Render at a desktop viewport | Hero and primary CTA remain visible with no horizontal overflow. | Implemented |
| MOV-007 | P2 | Movelo accessibility | Scan the landing page for selected WCAG A/AA rules | Axe results are attached; untriaged violations fail the check. | Implemented |
| MOV-008 | P2 | Movelo Gherkin | Prepare a furniture-move quote link | The visible option points to WhatsApp with a prefilled message and does not send it. | Implemented |
| MOV-009 | P1 | Movelo UI | Expand and collapse an FAQ | The answer is shown on expansion and hidden on collapse. | Implemented |
| PST-003 | P0 | Toolshop API | Authenticate the sample customer and read `/users/me` | Profile email and token role match the customer account. | Implemented |
| PST-004 | P1 | Toolshop API | Authenticate the sample admin and read `/users/me` | Profile email and token role match the admin account. | Implemented |
| PST-005 | P0 | Toolshop API | Request `/status` | Response includes Toolshop application and version metadata. | Implemented |
| PST-006 | P1 | Toolshop API | Request `/products?page=1` | Response includes product IDs, names, and numeric prices. | Implemented |
| PST-007 | P1 | Toolshop API | Request `/categories` | Response includes category IDs and names. | Implemented |
| PST-010 | P2 | Toolshop API | Submit invalid credentials | API responds with `401` and does not issue an access token. | Implemented |

## Execution

1. `npm run build` validates TypeScript.
2. `npm test` runs the active Chromium UI/API suite and Gherkin scenario.
3. GitHub Actions runs build, API, and Chromium UI tests on pushes and pull requests.
4. `npm run test:cross-browser` runs selected homepage smoke checks in Firefox and WebKit; CI dispatch is optional.
5. Keep `fullyParallel` disabled until repeat runs prove stability and test isolation.

## Boundaries

- Movelo checks never click WhatsApp links, submit contact requests, or modify business data.
- Toolshop checks use only documented sample accounts and read-only API requests, including authentication.
- No active test covers Movelo's backend, a database, payments, or operational workflows.
- The public Movelo site remains a CI dependency until an authorized source/deployment setup is available.

## Traceability

Test titles carry the scenario IDs. For failures, record target, environment, browser, sanitized request/response details, and reproducible steps. Never attach credentials, tokens, cookies, or authentication state.
