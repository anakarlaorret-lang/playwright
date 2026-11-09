import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { HomePage } from '../../pages/HomePage';

const { Given, When, Then } = createBdd();

Given('I am on the Toolshop catalog', async ({ page }) => {
  await new HomePage(page).goto();
});

When('I search for a product that does not exist', async ({ page }) => {
  await new HomePage(page).searchFor(
    'no-matching-product-automation-check'
  );
});

Then('no product cards should be displayed', async ({ page }) => {
  await expect(new HomePage(page).productCards).toHaveCount(0);
});
