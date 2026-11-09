import { defineConfig } from '@playwright/test';
import { environment } from './utils/environment';

export default defineConfig({
  testDir: './tests',

  retries: process.env.CI ? 1 : 0,

  reporter: [['html'], ['list']],

  use: {
    baseURL: environment.webBaseURL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  workers: process.env.CI ? 1 : 2,
});
