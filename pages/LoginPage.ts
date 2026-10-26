import { Page, BrowserContext } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page, private context: BrowserContext) {}

  async goto() {
    await this.page.goto('https://condo-agora.vercel.app/login');
  }

  async loginWithGoogle(email: string, password: string) {
    // Click on the Google login button
    await this.page.click('text=Ingresar con Google');

    // Wait for the Google OAuth popup
    const popup = await this.context.waitForEvent('page');

    // Interact with the Google login form
    await popup.fill('input[type="email"]', email);
    await popup.click('button:has-text("Next")');

    // Wait for password field
    await popup.fill('input[type="password"]', password);
    await popup.click('button:has-text("Next")');

    // Close popup after login
    await popup.waitForLoadState('networkidle');
    await popup.close();
  }

  async loginWithWhatsApp() {
    // Placeholder: feature not yet implemented
    await this.page.click('text=Ingresar con WhatsApp');
  }

  async isLoggedIn() {
    return this.page.locator('text=Dashboard').isVisible();
  }

  async getErrorMessage() {
    return this.page.locator('text=Invalid credentials');
  }
}
