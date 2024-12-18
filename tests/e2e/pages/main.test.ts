import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Log the page title for debugging
  const title = await page.title();

  expect(title).toBe('Musc');
});
