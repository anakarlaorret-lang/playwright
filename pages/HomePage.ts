import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly pageHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly sortSelect: Locator;
  readonly mobileFiltersButton: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', {
      name: 'Practice Software Testing - Toolshop',
    });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', {
      name: 'Search',
      exact: true,
    });
    this.sortSelect = page.getByRole('combobox', { name: 'sort' });
    this.mobileFiltersButton = page.getByRole('button', {
      name: 'Filters',
      exact: true,
    });
    this.productCards = page.locator('a.card[data-test^="product-"]:visible');
    this.productNames = page.locator('[data-test="product-name"]:visible');
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortSelect.selectOption({ label: option });
  }

  async selectCategory(category: string): Promise<void> {
    await this.page.getByRole('checkbox', { name: category, exact: true }).check();
  }

  async openMobileFilters(): Promise<void> {
    await this.mobileFiltersButton.click();
  }
}
