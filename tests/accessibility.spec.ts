import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

async function scanAccessibility(
  page: Page,
  name: string,
  knownFindings: string[]
): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  await test.info().attach(`${name}-axe-results.json`, {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  const unexpectedFindings = results.violations.flatMap((violation) =>
    violation.nodes.flatMap((node) =>
      node.target
        .map((target) => `${violation.id}:${target}`)
        .filter((finding) => !knownFindings.includes(finding))
    )
  );
  expect(unexpectedFindings).toEqual([]);
}

test('PST-016 home page has no untriaged WCAG A/AA violations', async ({
  page,
}) => {
  await new HomePage(page).goto();

  await scanAccessibility(page, 'home', [
    'label-content-name-mismatch:#language',
  ]);
});

test('PST-016 login page has no untriaged WCAG A/AA violations', async ({
  page,
}) => {
  await new LoginPage(page).goto();

  await scanAccessibility(page, 'login', [
    'label-content-name-mismatch:#language',
    'button-name:.btn-outline-secondary',
  ]);
});
