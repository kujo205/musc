import { describe, it, beforeEach, expect } from 'vitest';
import { db } from '$db';
import { userRepository } from '$server/repositories/UserRepository';

describe('UserRepository', () => {
  const email = 'user@example.com';
  const id = '260a16cd-92dd-4316-97bd-f5d73981b4a9';

  beforeEach(async ({ integration }) => {
    await db.deleteFrom('User').execute();
    await integration.createUser(id, email);
  });

  it('should retrieve a user by email', async () => {
    const retrievedUser = await userRepository.getUserByEmail(email);

    expect(retrievedUser).toHaveProperty('id');
    expect(retrievedUser).toHaveProperty('cookie');
  });

  it('should retrieve a user by id', async () => {
    const retrievedUser = await userRepository.getUserById(id);

    expect(retrievedUser).toHaveProperty('id');
    expect(retrievedUser).toHaveProperty('cookie');
    expect(retrievedUser).toHaveProperty('subscription_type');
    expect(retrievedUser).toHaveProperty('email');
  });
});
