import { test } from '@playwright/test';

test.beforeEach(async () => {
  // await page.goto('auth/signin');
  // await page.waitForURL('auth/signin');
  //
  // await page.fill('input[name="email"]', 'test@example.com');
  //
  // await page.locator('button:has-text("Credentials")').click();
  // // await page.click('button[type="submit"]');
  //
  // await page.waitForURL(/.*\/dashboard\/account.*/);
});

test.describe('Free tier flow', () => {
  test('User can see account page', async () => {
    test.skip();
    // await page.goto('dashboard/account');
    //
    // await page.waitForURL(/.*\/dashboard\/account.*/);
  });

  test('User can create only 3 playlists', async () => {
    test.skip();
    // await page.goto('dashboard/account');
    //
    // await page.waitForURL(/.*\/dashboard\/account.*/);
  });
});
