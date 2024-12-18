import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'dotenv -e .env.test npm run build && dotenv -e .env.test npm run preview',
    port: 4173
  },

  testDir: 'tests/e2e'
});
