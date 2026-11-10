import { expect, test, type Page } from '@playwright/test';
import { MoveloHomePage } from '../pages/MoveloHomePage';

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const hasNoHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth <=
      document.documentElement.clientWidth
  );
  expect(hasNoHorizontalOverflow).toBe(true);
}

test('MOV-004 keeps the primary request visible on a mobile viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const homePage = new MoveloHomePage(page);
  await homePage.goto();

  await expect(homePage.heading).toBeVisible();
  await expect(homePage.primaryRequestLink).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('MOV-005 keeps navigation and moving options usable on a tablet viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  const homePage = new MoveloHomePage(page);
  await homePage.goto();

  await expect(homePage.heading).toBeVisible();
  const navigation = page.getByRole('navigation', { name: 'Principal' });
  await navigation.getByRole('button', { name: 'Menú' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Menú móvil' })
      .getByRole('link', { name: 'Qué podés mover' })
  ).toBeVisible();
  await expect(homePage.movingOptions).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('MOV-006 keeps the landing page within a desktop viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const homePage = new MoveloHomePage(page);
  await homePage.goto();

  await expect(homePage.heading).toBeVisible();
  await expect(homePage.primaryRequestLink).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
