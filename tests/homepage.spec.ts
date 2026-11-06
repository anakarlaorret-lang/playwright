import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.beforeEach(async ({ page }) => {
  await new HomePage(page).goto();
});

test('PST-001 renders the Toolshop home page and catalog controls', async ({
  page,
}) => {
  const homePage = new HomePage(page);

  await expect(homePage.pageHeading).toBeVisible();
  await expect(homePage.searchInput).toBeVisible();
  await expect(homePage.sortSelect).toBeVisible();
  await expect(homePage.productCards.first()).toBeVisible();
});

test('PST-008 searches for products by name', async ({ page }) => {
  const homePage = new HomePage(page);

  const productName = (await homePage.productNames.first().innerText()).trim();

  await homePage.searchFor(productName);

  await expect(homePage.productNames).toHaveCount(1);
  await expect(homePage.productNames.first()).toHaveText(productName);
  const visibleNames = (await homePage.productNames.allTextContents()).map(
    (name) => name.trim().toLowerCase()
  );
  expect(visibleNames.length).toBeGreaterThan(0);
  expect(visibleNames.every((name) => name.includes(productName.toLowerCase()))).toBe(
    true
  );
});

test('PST-008 displays no products for an unmatched search', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.searchFor('no-matching-product-automation-check');

  await expect(homePage.productCards).toHaveCount(0);
});

test('PST-008 filters catalog results by category', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.selectCategory('Hammer');

  await expect
    .poll(
      async () => {
        const visibleNames = (await homePage.productNames.allTextContents()).map(
          (name) => name.trim().toLowerCase()
        );
        return (
          visibleNames.length > 0 &&
          visibleNames.every((name) => name.includes('hammer'))
        );
      },
      { timeout: 10_000 }
    )
    .toBe(true);
});

test('PST-008 sorts catalog results by product name', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.sortBy('Name (A - Z)');

  await expect
    .poll(
      async () => {
        const visibleNames = (await homePage.productNames.allTextContents()).map(
          (name) => name.trim()
        );
        return (
          visibleNames.length > 1 &&
          visibleNames.every(
            (name, index) =>
              index === 0 ||
              visibleNames[index - 1].localeCompare(name) <= 0
          )
        );
      },
      { timeout: 10_000 }
    )
    .toBe(true);
});