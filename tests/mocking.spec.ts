import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { environment } from '../utils/environment';

test('PST-015 keeps the catalog usable when the products API returns no results', async ({
  page,
}) => {
  let interceptedProductRequests = 0;
  const apiBase = new URL(environment.apiBaseURL);
  const productsPath = `${apiBase.pathname.replace(/\/$/, '')}/products`;

  await page.route(
    (url) =>
      url.origin === apiBase.origin && url.pathname === productsPath,
    async (route) => {
      interceptedProductRequests += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: {
          current_page: 1,
          data: [],
          from: null,
          last_page: 1,
          per_page: 9,
          to: null,
          total: 0,
        },
      });
    }
  );

  const homePage = new HomePage(page);
  await homePage.goto();

  await expect(homePage.pageHeading).toBeVisible();
  await expect(homePage.searchInput).toBeVisible();
  await expect.poll(() => interceptedProductRequests).toBeGreaterThan(0);
  await expect(homePage.productCards).toHaveCount(0);
});
