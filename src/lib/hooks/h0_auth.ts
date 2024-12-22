import { env } from '$env/dynamic/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import { KyselyAdapter } from '@auth/kysely-adapter';
import Google from '@auth/core/providers/google';
import Credentials from '@auth/core/providers/credentials';
import { db } from '$db';

export const { handle: h0Auth } = SvelteKitAuth({
  // @ts-expect-error our db schema should be fully compatible
  adapter: KyselyAdapter(db),
  trustHost: true,
  debug: true,
  session: {
    strategy: 'jwt'
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      credentials: {
        email: { label: 'Email' }
      },
      // @ts-expect-error we are in dev mode
      authorize: async (credentials) => {
        if (env.ENV !== 'dev') {
          return null;
        }

        // test@example.com - free tier user
        // test2@example.com - basic tier user
        if (credentials.email === 'test@example.com') {
          const user = await db
            .selectFrom('User')
            .selectAll()
            .where('email', '=', credentials.email)
            .executeTakeFirst();

          return user;
        }

        return null;
      }
    })
  ],

  secret: env.AUTH_SECRET
});
