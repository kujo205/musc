import type { Kysely } from 'kysely';

export const freeTierEmail = 'test@example.com';
export const basicTierEmail = 'test2@example.com';

const data = [
  {
    id: crypto.randomUUID(),
    name: 'Test',
    email: freeTierEmail,
    emailVerified: new Date(),
    image: 'https://example.com/john.jpg',
    subscription_type: 'free',
    ytmusic_cookie: 'cookie_value_1',
    ytmusic_cookie_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    ytmusic_set_cookie: 'set_cookie_value_1'
  },
  {
    id: crypto.randomUUID(),
    name: 'Test 2',
    email: basicTierEmail,
    emailVerified: new Date(),
    image: 'https://example.com/jane.jpg',
    subscription_type: 'basic',
    ytmusic_cookie: 'cookie_value_2',
    ytmusic_cookie_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    ytmusic_set_cookie: 'set_cookie_value_2'
  }
];

export async function seed(db: Kysely<never>): Promise<void> {
  await db.insertInto('User').values(data).execute();
}
