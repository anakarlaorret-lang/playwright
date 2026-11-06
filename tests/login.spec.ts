import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../utils/testData.json';

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).goto();
});

test('PST-002 signs in with the documented customer account', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const customer = testData.accounts.customer;

  await loginPage.login(customer.email, customer.password);

  await expect(page).toHaveURL(/\/account$/);
  await expect(
    page.getByRole('heading', { name: 'My account' })
  ).toBeVisible();
});

test('PST-011 rejects invalid customer credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const invalidLogin = testData.invalidLogin;

  await loginPage.login(invalidLogin.email, invalidLogin.password);

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(page).toHaveURL(/\/auth\/login$/);
});

test('PST-012 prevents submission of an invalid email address', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.emailInput.fill('not-an-email');
  await loginPage.passwordInput.fill('any-password');

  const emailIsValid = await loginPage.emailInput.evaluate(
    (input: HTMLInputElement) => input.validity.valid
  );
  expect(emailIsValid).toBe(false);

  await loginPage.submit();

  await expect(page).toHaveURL(/\/auth\/login$/);
});
