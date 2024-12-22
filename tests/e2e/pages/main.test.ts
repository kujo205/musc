import { test, expect } from '@playwright/test';

test.describe('Marketing page', () => {
  test('Loads main page with correct title', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();

    expect(title).toBe('Musc');
  });

  test('Redirects to signup when unauthorized user clicks basic plan card', async ({
    page,
    context
  }) => {
    await page.goto('/');

    await context.clearCookies();

    const basicPlanBtn = page.getByTestId('sign-up-basic');

    await basicPlanBtn.click();

    await page.waitForURL(/.*\/oauth.*/);

    const url = page.url();

    expect(url).toContain('oauth');
  });

  test('Redirects to signup when unauthorized user clicks free plan card', async ({
    page,
    context
  }) => {
    await page.goto('/');

    await context.clearCookies();

    const freePlanBtn = page.getByTestId('sign-up-free');

    await freePlanBtn.click();

    await page.waitForURL(/.*\/oauth.*/);

    const url = page.url();

    expect(url).toContain('oauth');
  });
});
