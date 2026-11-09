import { expect, test, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const hasNoHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth <=
      document.documentElement.clientWidth
  );
  expect(hasNoHorizontalOverflow).toBe(true);
}

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
    await expectNoHorizontalOverflow(page);
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

test('PST-009 keeps catalog controls usable at a tablet viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  const homePage = new HomePage(page);

  await homePage.goto();

  await expect(homePage.pageHeading).toBeVisible();
  await expect(homePage.searchInput).toBeVisible();
  await expect(homePage.productCards.first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test.describe('Touch mobile catalog emulation', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });

  test('PST-009 opens catalog filters with a touch interaction', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(homePage.pageHeading).toBeVisible();
    await homePage.mobileFiltersButton.tap();
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.productCards.first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});

test.describe('Mobile landscape catalog emulation', () => {
  test.use({
    viewport: { width: 667, height: 375 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });

  test('PST-009 keeps catalog controls usable in mobile landscape', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(homePage.pageHeading).toBeVisible();
    await homePage.mobileFiltersButton.tap();
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.productCards.first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
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
  await expectNoHorizontalOverflow(page);
});
