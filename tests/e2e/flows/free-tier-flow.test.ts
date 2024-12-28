import { test } from '@playwright/test';
import { loginFreeUser } from '../helpers/auth';
import { createPlaylistHelper } from '../helpers/playlists';

test.beforeEach(async ({ page }) => {
  await loginFreeUser(page);
});

test.describe('Free tier flow', () => {
  test('User can see account page', async ({ page }) => {
    await page.goto('dashboard/account');

    await page.waitForURL(/.*\/dashboard\/account.*/);
  });

  test('User can see dashboard/my_playlists page', async ({ page }) => {
    await page.goto('dashboard/my_playlists');

    await page.waitForURL(/.*\/dashboard\/my_playlists.*/);
  });

  test('User can see dashboard/community page', async ({ page }) => {
    await page.goto('dashboard/community');

    await page.waitForURL(/.*\/dashboard\/community.*/);
  });

  test('User can create a playlist', async ({ page }) => {
    await page.goto('dashboard/my_playlists');

    await createPlaylistHelper(page);

    await page.reload();

    const elements = page.locator('[data-testid="playlist-card"]');

    const count = await elements.count();

    test.expect(count).toBe(1);
  });
});
