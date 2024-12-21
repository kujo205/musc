import { describe, it, expect, beforeEach } from 'vitest';
import { userService } from '$server/services/UserService';
import { authService } from '$server/services/AuthService';
import { faker } from '@faker-js/faker';

describe('UserService', async () => {
  const cookie = 'DUMMY_COOKIE_DATA';

  const dateString = '2025-12-11T01:25:27.000Z';
  const setCookieHeader =
    'SIDCC=wenflwjen-HF3pYrgDdkpW8vj7wcjwlcnwe; expires=Thu, 11-Dec-2025 01:25:27 GMT; path=/; domain=.youtube.com; priority=high';

  const email = faker.internet.email();
  const userId = faker.string.uuid();

  beforeEach(async ({ integration }) => {
    await integration.createUser(userId, email);
  });

  it('should insert cookie data', async () => {
    await userService.updateYtCredentials(userId, cookie, setCookieHeader);

    const user = await userService.getYtMusicCredentials(userId);

    expect(user).toHaveProperty('cookie', cookie);
    expect(user).toHaveProperty('set_cookie', setCookieHeader);
  });

  it('should correctly infer expires at data', async () => {
    await userService.updateYtCredentials(userId, cookie, setCookieHeader);

    const user = await userService.getYtMusicCredentials(userId);

    const actualDate = new Date(dateString).getTime();
    const dateFromDb = new Date(user?.expires_at).getTime();

    expect(user).toHaveProperty('cookie', cookie);
    expect(user).toHaveProperty('set_cookie', setCookieHeader);
    expect(actualDate).toEqual(dateFromDb);
  });

  it('should return ytmusic credentials', async () => {
    await userService.updateYtCredentials(userId, cookie, setCookieHeader);

    const user = await userService.getYtMusicCredentials(userId);

    expect(user).toHaveProperty('cookie', cookie);
    expect(user).toHaveProperty('set_cookie', setCookieHeader);
    expect(user).toHaveProperty('expires_at');
  });

  it('checkUserHasYtMusicCredentials should return `false` if user doesnt have credentials', async () => {
    await userService.updateYtCredentials(userId, null, null);

    const has = await userService.checkUserHasYtMusicCredentials(userId);
    expect(has).toBe(false);
  });

  it('checkUserHasYtMusicCredentials should return `true` if user has yt music credentials', async () => {
    await userService.updateYtCredentials(userId, cookie, setCookieHeader);

    const has = await userService.checkUserHasYtMusicCredentials(userId);
    expect(has).toBe(true);
  });

  it('autoUpdatesEnabled should return `true` if users plan is basic', async ({ integration }) => {
    const basicEmail = faker.internet.email();
    const basicId = faker.string.uuid();

    await integration.createUser(basicId, basicEmail, 'basic');

    const user = await authService.getAutorizedUserSession(basicEmail);

    const enabled = await userService.autoUpdatesEnabled({ user });

    expect(enabled).toBe(true);
  });

  it('autoUpdatesEnabled should return `false` if users plan is free', async ({ integration }) => {
    const freeEmail = faker.internet.email();
    const freeId = faker.string.uuid();

    await integration.createUser(freeId, freeEmail, 'free');

    const user = await authService.getAutorizedUserSession(freeEmail);

    const enabled = await userService.autoUpdatesEnabled({ user });

    expect(enabled).toBe(false);
  });
});
