import { describe, beforeEach, it, expect } from 'vitest';
import { db } from '$db';
import { authService } from '$server/services/AuthService';
import { DbError } from '$server/errors/DbError';

describe('AuthService', () => {
  const userEmail = 'user@example.com';
  const user = {
    id: '1',
    email: userEmail,
    subscription_type: 'basic',
    name: 'Test User',
    image: 'http://example.com/image.png'
  } as const;

  beforeEach(async ({ integration }) => {
    await integration.createUser(user.id, user.email);
  });

  it('should populate user session for existing user', async () => {
    const session = await authService.populateUserSession(userEmail);

    expect(session).toHaveProperty('user');
    expect(session.user).toHaveProperty('email', userEmail);
    expect(session).toHaveProperty('authorized', true);
  });

  it('should return unauthorized for null email', async () => {
    const session = await authService.populateUserSession(null);

    expect(session).toHaveProperty('user', null);
    expect(session).toHaveProperty('authorized', false);
  });

  it('should throw error for non-existent user', async () => {
    await db.deleteFrom('User').where('email', '=', userEmail).execute();

    await expect(authService.populateUserSession(userEmail)).rejects.toThrow(DbError);
  });

  it('should retrieve authorized user session by email', async () => {
    const userSession = await authService.getAutorizedUserSession(userEmail);

    expect(userSession).toHaveProperty('email', userEmail);
  });

  it('should return undefined for non-existent user session', async () => {
    const userSession = await authService.getAutorizedUserSession('non-existent@example.com');

    expect(userSession).toBeUndefined();
  });
});
