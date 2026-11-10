import { expect, test } from '@playwright/test';
import { MoveloHomePage } from '../pages/MoveloHomePage';

test.beforeEach(async ({ page }) => {
  await new MoveloHomePage(page).goto();
});

test('MOV-001 renders the Movelo landing page', async ({ page }) => {
  const homePage = new MoveloHomePage(page);

  await expect(page).toHaveTitle('Movelo — Tu flete por WhatsApp');
  await expect(homePage.heading).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
});

test('MOV-002 navigates to the moving options section', async ({ page }) => {
  const movingOptionsLink = page
    .getByRole('navigation', { name: 'Principal' })
    .getByRole('link', { name: 'Qué podés mover' });

  await movingOptionsLink.click();

  await expect(page).toHaveURL(/#que-moves$/);
  await expect(page.locator('#que-moves')).toBeInViewport();
});

test('MOV-003 exposes WhatsApp quote links without opening an external conversation', async ({
  page,
}) => {
  const homePage = new MoveloHomePage(page);
  const quoteLinks = homePage.movingOptions.locator(
    'a[href^="https://wa.me/"]'
  );

  await expect(homePage.primaryRequestLink).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/\d+\?text=/
  );
  await expect(homePage.primaryRequestLink).toHaveAttribute('target', '_blank');
  await expect(quoteLinks).toHaveCount(3);

  const messages = await quoteLinks.evaluateAll((links) =>
    links.map((link) =>
      new URL((link as HTMLAnchorElement).href).searchParams.get('text')
    )
  );
  expect(messages).toEqual(
    expect.arrayContaining([
      'Hola, Compré un sillón y necesito traerlo.',
      'Hola, Necesito llevar materiales a la obra.',
    ])
  );
  expect(messages.every((message) => message !== null)).toBe(true);
});
