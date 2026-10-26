// Import the Playwright test configuration helper
import { defineConfig } from '@playwright/test';

// Export the configuration object
export default defineConfig({
  // Directory where all test files are located
  testDir: './tests',

  // Number of times to retry a failed test before marking it as failed
  retries: 2,

  // Reporters used to display test results:
  // 'html' generates a visual report, 'list' shows results in the console
  reporter: [['html'], ['list']],

  // Default settings applied to all tests
  use: {
    headless: true, // Run browsers without a visible UI
    screenshot: 'only-on-failure', // Capture screenshots only when a test fails
    video: 'retain-on-failure', // Save video recordings only for failed tests
    storageState: '.auth/messageUser.json', // Use saved authentication state for auto-login
  },

  // Number of parallel workers to run tests simultaneously
  workers: 4,
});
