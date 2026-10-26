import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import data from '../utils/testData.json';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({page, context}) => {
    const loginPage = new LoginPage(page, context);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
})    
