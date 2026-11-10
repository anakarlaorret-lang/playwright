import { Locator, Page } from '@playwright/test';

export class MoveloHomePage {
  readonly heading: Locator;
  readonly primaryRequestLink: Locator;
  readonly movingOptions: Locator;
  readonly furnitureRequestLink: Locator;
  readonly faqItems: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      name: /Mandá un audio\..*tenés tu flete\./,
    });
    this.primaryRequestLink = page
      .locator('main a[href^="https://wa.me/"]')
      .first();
    this.movingOptions = page.locator('#que-moves');
    this.furnitureRequestLink = this.movingOptions.getByRole('link', {
      name: /Un mueble/,
    });
    this.faqItems = page.locator('details');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
