import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.beforeEach(async ({ page }) => {
  await new HomePage(page).goto();
});

test('PST-013 opens a product from the catalog', async ({ page }) => {
  const homePage = new HomePage(page);

  const firstProductName = (await homePage.productNames.first().innerText()).trim();

  await homePage.productCards.first().click();

  await expect(page).toHaveURL(/\/product\/[^/]+$/);
  await expect(new ProductPage(page).productHeading(firstProductName)).toBeVisible();
});
