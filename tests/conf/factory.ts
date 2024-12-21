import { faker } from '@faker-js/faker';
import { db } from '$db';
import { UserSubscriptionType } from '$db/types/enums';

export const createUser = async (
  id: string,
  email: string,
  subscription_type?: UserSubscriptionType
) => {
  const user = {
    id,
    name: faker.person.fullName(),
    email,
    emailVerified: new Date(),
    image: faker.image.avatar(),
    subscription_type: subscription_type
      ? subscription_type
      : faker.helpers.arrayElement(['free', 'basic']),
    ytmusic_cookie: faker.string.alphanumeric(100),
    ytmusic_cookie_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    ytmusic_set_cookie: faker.string.alphanumeric(100)
  };

  await db.transaction().execute(async (trx) => {
    await trx.insertInto('User').values(user).execute();
  });

  return user;
};

export const teardown = async () => {
  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom('playlists').execute();

    await trx.deleteFrom('User').execute();
  });
};

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
