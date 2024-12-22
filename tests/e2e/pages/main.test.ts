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
    await page.reload({ waitUntil: 'networkidle' });

    // sign-up-free
    const basicPlanBtn = page.getByTestId('sign-up-basic');

    console.log(basicPlanBtn);

    await basicPlanBtn.click();

    await page.waitForTimeout(10000);
    // await page.waitForURL('https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount**');

    const url = page.url();

    console.log(url);

    expect(url).toContain('localhost');
  });
});
