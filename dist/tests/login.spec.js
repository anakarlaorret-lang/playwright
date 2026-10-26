"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
test_1.test.describe('Login Tests', () => {
    (0, test_1.test)('should login successfully with valid credentials', async ({ page, context }) => {
        const loginPage = new LoginPage_1.LoginPage(page, context);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await (0, test_1.expect)(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});
