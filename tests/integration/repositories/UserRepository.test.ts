import { describe, beforeEach, it, expect } from 'vitest';
import { userRepository } from '$server/repositories/UserRepository';
import { faker } from '@faker-js/faker';

describe('UserRepository', () => {
  const email = faker.internet.email();
  const id = faker.string.uuid();

  beforeEach(async ({ integration }) => {
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
