import type { Kysely } from 'kysely';

export async function seed(db: Kysely<any>): Promise<void> {
  await db
    .insertInto('User')
    .values([
      {
        id: crypto.randomUUID(),
        name: 'Test',
        email: 'test@example.com',
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
        email: 'test2@example.com',
        emailVerified: new Date(),
        image: 'https://example.com/jane.jpg',
        subscription_type: 'basic',
        ytmusic_cookie: 'cookie_value_2',
        ytmusic_cookie_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
        ytmusic_set_cookie: 'set_cookie_value_2'
      }
    ])
    .execute();
}
