import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { MoveloHomePage } from '../pages/MoveloHomePage';

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

test('MOV-007 landing page has no untriaged WCAG A/AA violations', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await new MoveloHomePage(page).goto();
  const activePauseButton = page
    .locator('button[data-pause]:visible')
    .filter({ hasText: 'Pausar' });
  if ((await activePauseButton.count()) > 0) {
    await activePauseButton.first().click();
  }

  await scanAccessibility(page, 'movelo-home', [
    'color-contrast:.nav-btn',
    'color-contrast:.hero-actions > .btn-main[target="_blank"][rel="noopener noreferrer"]',
    'color-contrast:.hero-reassurance > span',
    'color-contrast:.carrier-copy > .btn-main[target="_blank"][rel="noopener noreferrer"]',
    'color-contrast:.is-paused > .phone-shell > .phone > .phone-input-bar[aria-hidden="true"] > .phone-input-field',
    'color-contrast:.is-paused > .demo-controls > button[data-pause=""][type="button"]',
    'color-contrast:.is-paused > .demo-controls > button[data-replay=""][type="button"]',
    'color-contrast:.is-paused > .demo-note',
    'color-contrast:.pm-b.pm.demo-arrive:nth-child(2) > strong:nth-child(3)',
    'color-contrast:.pm-b.pm.demo-arrive:nth-child(2) > strong:nth-child(5)',
    'color-contrast:strong:nth-child(7)',
    'color-contrast:strong:nth-child(9)',
    'label-content-name-mismatch:.nav-btn',
    'label-content-name-mismatch:.hero-actions > .btn-main[target="_blank"][rel="noopener noreferrer"]',
    'label-content-name-mismatch:.fit-card[target="_blank"][rel="noopener noreferrer"]:nth-child(1)',
    'label-content-name-mismatch:.fit-card[target="_blank"][rel="noopener noreferrer"]:nth-child(2)',
    'label-content-name-mismatch:.fit-card[target="_blank"][rel="noopener noreferrer"]:nth-child(3)',
    'label-content-name-mismatch:.carrier-copy > .btn-main[target="_blank"][rel="noopener noreferrer"]',
  ]);
});
