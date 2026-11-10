import { expect, test } from '@playwright/test';
import { MoveloHomePage } from '../pages/MoveloHomePage';

test('MOV-009 expands and collapses a FAQ disclosure', async ({ page }) => {
  const homePage = new MoveloHomePage(page);
  await homePage.goto();

  await expect(homePage.faqItems).toHaveCount(4);
  const firstFaq = homePage.faqItems.first();
  const question = firstFaq.locator('summary');
  const answer = firstFaq.locator('p');

  await question.click();
  await expect(answer).toBeVisible();
  await expect(answer).toContainText('Solo pagás al fletero');

  await question.click();
  await expect(answer).toBeHidden();
});
