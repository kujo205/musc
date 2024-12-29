import type { Page } from '@playwright/test';
import { freeTierEmail, basicTierEmail } from '$db/seeds/1734651868133_testing-user-population';

export async function loginBasicUser(page: Page) {
  return login(page, basicTierEmail);
}

export async function loginFreeUser(page: Page) {
  return login(page, freeTierEmail);
}

async function login(page: Page, email: string) {
  await page.goto('auth/signin');
  await page.waitForURL('auth/signin');

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', process.env.TESTING_MUSC_PASSWORD);

  await page.locator('button:has-text("Credentials")').click();
}
