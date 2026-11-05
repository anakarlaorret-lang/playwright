# Test Plan — SauceDemo

This plan turns the scope in [TEST_STRATEGY.md](./TEST_STRATEGY.md) into prioritized, observable scenarios. It describes intended coverage; it is not a claim that every scenario is already automated.

## Priorities

- **P0 — Critical:** primary purchase journey and basic application availability.
- **P1 — High:** important validation and cart/catalog behavior.
- **P2 — Supporting:** additional regression coverage with lower user impact.

## Initial scenarios

| ID | Priority | Area | Scenario | Expected result |
|---|---|---|---|---|
| SD-001 | P0 | Smoke | Open SauceDemo login page | Login form is available and the page renders without a blocking error. |
| SD-002 | P0 | Authentication | Sign in with an intended valid practice account | User reaches the inventory page and sees the product catalog. |
| SD-003 | P1 | Authentication | Submit invalid credentials | Login is rejected with a visible, relevant error; the user is not authenticated. |
| SD-004 | P1 | Authentication | Submit the login form with required values missing | The application prevents successful login and communicates the validation outcome. |
| SD-005 | P1 | Catalog | Sort products by an available sort option | Product order matches the selected option. |
| SD-006 | P0 | Cart | Add a product and open the cart | The selected product appears in the cart with the expected identifying details. |
| SD-007 | P1 | Cart | Remove a product from the cart | The product is removed and the cart state updates accordingly. |
| SD-008 | P0 | Checkout | Complete checkout with valid required information | The order reaches the expected completion state and reflects the selected product. |
| SD-009 | P1 | Checkout | Attempt to continue checkout with required information missing | Checkout does not continue and a clear validation message is shown. |
| SD-010 | P1 | Responsive UI | Open login, inventory, cart, and checkout at representative Android, iOS, and desktop viewport sizes | Key content and controls remain visible, usable, and free of unintended horizontal overflow at the selected viewport sizes. |
| SD-011 | P1 | Responsive flow | Complete the critical shopping flow using a representative mobile device profile | Login, product selection, cart, and checkout remain operable and lead to the expected completion state. |

## Execution guidance

1. Implement and stabilize SD-001 and SD-002 first.
2. Add SD-006 and SD-008 as the core end-to-end purchase journey.
3. Add P1 validation, sorting, and cart-removal cases.
4. Run the critical suite in Chromium locally and in CI.
5. Add responsive smoke checks for a representative Android profile, iOS profile, and desktop viewport.
6. Run SD-011 on one mobile profile after the desktop purchase flow is reliable.
7. Add Firefox and WebKit checks for critical scenarios after the primary suite is reliable.
8. Add Windows/macOS CI runner coverage when cross-OS compatibility is an explicit goal and CI time permits.

Tests should create the state they need, avoid order dependencies, and assert outcomes visible to a user. Device profiles validate responsive browser behavior through emulation; they do not replace physical-device testing. OS coverage requires execution on the relevant OS, not merely a different viewport. Do not use the public demo for load, stress, security, or destructive testing.

## Traceability and results

Use the scenario IDs in test titles or annotations where practical. Record defects and environment failures separately, with the scenario ID, browser, reproduction details, and relevant Playwright evidence. Review test results against the priorities above rather than relying only on an aggregate pass rate.
