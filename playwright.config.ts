import { defineConfig } from '@playwright/test';
import { defineBddProject } from 'playwright-bdd';
import { environment } from './utils/environment';

export default defineConfig({
  testDir: './tests',

  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: environment.webBaseURL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  workers: process.env.CI ? 1 : 2,

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      testMatch: [/homepage\.spec\.ts/],
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      testMatch: [/homepage\.spec\.ts/],
      use: { browserName: 'webkit' },
    },
    {
      ...defineBddProject({
        name: 'gherkin',
        features: 'tests/features/**/*.feature',
        steps: 'tests/steps/**/*.ts',
        outputDir: '.features-gen',
      }),
      use: { browserName: 'chromium' },
    },
  ],
});
