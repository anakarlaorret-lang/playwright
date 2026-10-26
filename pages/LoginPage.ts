import { Page, BrowserContext } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page, private context: BrowserContext) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/ ');
  }

  async login(username: string, password: string) {
    // Fill in the username and password fields
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}