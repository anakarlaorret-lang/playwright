import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Responsive catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await new HomePage(page).goto();
  });

  test('PST-009 keeps catalog controls usable on a mobile viewport', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await expect(homePage.pageHeading).toBeVisible();
    await homePage.openMobileFilters();
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.productCards.first()).toBeVisible();
    const hasNoHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth
    );
    expect(hasNoHorizontalOverflow).toBe(true);
  });
});

test.describe('Responsive login', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await new LoginPage(page).goto();
  });

  test('PST-009 keeps login controls usable on a mobile viewport', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});

test('PST-009 keeps catalog controls usable on a desktop viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const homePage = new HomePage(page);

  await homePage.goto();

  await expect(homePage.pageHeading).toBeVisible();
  await expect(homePage.searchInput).toBeVisible();
  await expect(homePage.sortSelect).toBeVisible();
  await expect(homePage.productCards.first()).toBeVisible();
  const hasNoHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth <=
      document.documentElement.clientWidth
  );
  expect(hasNoHorizontalOverflow).toBe(true);
});
