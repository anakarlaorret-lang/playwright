import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { MoveloHomePage } from '../../pages/MoveloHomePage';

const { Given, When, Then } = createBdd();

Given('I am on the Movelo landing page', async ({ page }) => {
  await new MoveloHomePage(page).goto();
});

When('I inspect the furniture quote option', async ({ page }) => {
  await expect(new MoveloHomePage(page).furnitureRequestLink).toBeVisible();
});

Then(
  'the quote link is prepared for WhatsApp without sending a message',
  async ({ page }) => {
    const quoteLink = new MoveloHomePage(page).furnitureRequestLink;
    await expect(quoteLink).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\/\d+\?text=/
    );
    await expect(quoteLink).toHaveAttribute('target', '_blank');
  }
);
