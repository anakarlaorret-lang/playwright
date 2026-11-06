# Test Plan — Practice Software Testing (Toolshop)

This plan describes planned coverage; it does not imply every scenario is implemented. See [TEST_STRATEGY.md](./TEST_STRATEGY.md) for environments, safety boundaries, and automation principles.

## Priorities

- **P0 — Critical:** application availability, sample-account authentication, protected profile access.
- **P1 — High:** API response integrity, role identity, responsive usability.
- **P2 — Supporting:** invalid authentication, catalog search/sort, and expanded browser coverage.

## Scenarios

| ID | Priority | Layer | Scenario | Expected result | Status |
|---|---|---|---|---|---|
| PST-001 | P0 | UI | Open Toolshop home page | Page title, catalog controls, and product area render. | Implemented |
| PST-002 | P0 | UI | Sign in with the documented customer account | Login succeeds and the account page identifies the signed-in user. | Implemented |
| PST-003 | P0 | API | Authenticate customer with `POST /users/login`; use bearer token on `GET /users/me` | Protected profile matches the customer account and the issued token's role claim is `user`. | Implemented |
| PST-004 | P1 | API | Authenticate admin and retrieve `GET /users/me` | Protected profile matches the admin sample account and the issued token's role claim is `admin`. | Implemented |
| PST-005 | P1 | API | Request `/status` | Successful response contains Toolshop application and version metadata. | Implemented |
| PST-006 | P1 | API | Request `/products?page=1` | Successful response contains product IDs, names, and numeric prices without asserting a volatile total. | Implemented |
| PST-007 | P1 | API | Request `/categories` | Successful response contains category IDs and names. | Implemented |
| PST-008 | P1 | UI | Search by product name, verify unmatched search, filter by category, and sort names A-Z | Product cards match the search/category criteria and the visible names are sorted. | Implemented |
| PST-009 | P1 | UI | Open catalog and login at mobile and desktop viewports | Key controls remain visible and the catalog has no horizontal overflow. | Implemented |
| PST-010 | P2 | API | Submit invalid credentials to `/users/login` | API returns `401` and does not issue an access token. | Implemented |
| PST-011 | P1 | UI | Submit invalid customer credentials | Login is rejected with a visible error and the user remains on the login page. | Implemented |
| PST-012 | P2 | UI | Submit a malformed email address | Browser email validation prevents successful form submission. | Implemented |
| PST-013 | P1 | UI | Open a product from the catalog | Product detail route and selected product heading are displayed. | Implemented |
| PST-014 | P1 | UI | Add a product to cart and verify item/total | Cart reflects the added product and its price. | Planned (isolated environment only) |

## Execution order

1. Keep the implemented PST-001 through PST-013 baseline stable in local runs and Chromium CI.
2. Add Firefox/WebKit coverage for the highest-risk read-only UI flows.
3. Implement PST-014 cart coverage only in a local or explicitly authorized isolated environment with reliable cleanup.
4. Evaluate a small Gherkin pilot for high-value business scenarios; adopt it only if the feature language improves collaboration without duplicating test intent or adding unnecessary maintenance.
5. Enable `fullyParallel` only after all tests are demonstrably independent, fixtures and data are isolated, and repeated parallel runs remain stable against the selected environment.

## Planned framework improvements

- **Gherkin pilot:** select one or two stakeholder-facing scenarios, map Given/When/Then steps to reusable Playwright code, and compare readability and maintenance against the current TypeScript tests before deciding whether to expand.
- **Full parallel execution:** first make tests independent of ordering and shared mutable state; then enable `fullyParallel: true` and validate with repeated runs at multiple worker counts. Keep it disabled against the shared hosted service until its rate limits and concurrent behavior are understood.

## Shared-service safety

Public-host tests must not create or modify persistent users, products, categories, brands, carts, orders, favorites, invoices, or messages. Keep bearer tokens in memory and never include their values in reports or logs. Reserve write workflows for a local or explicitly authorized isolated environment with reliable setup and cleanup.

## Traceability

Use the scenario IDs in test titles or annotations. For failures, record target (web/API), environment, browser, sanitized request/response details, and reproducible steps. Never attach credentials, tokens, cookies, or authentication state.
