import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  productHeading(name: string): Locator {
    return this.page.getByRole('heading', { name, exact: true });
  }
}
