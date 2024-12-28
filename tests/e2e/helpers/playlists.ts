import type { Page } from '@playwright/test';

export async function createPlaylistHelper(page: Page) {
  await page.getByTestId('create-playlist-button').click();
  await page.getByTestId('save-changes-button').click();
  await page.waitForTimeout(400);
}
