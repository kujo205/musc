import { env } from '$env/dynamic/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import { KyselyAdapter } from '@auth/kysely-adapter';
import Google from '@auth/core/providers/google';

import { db } from '$db';

export const { handle: h0Auth } = SvelteKitAuth({
  // @ts-expect-error our db schema should be fully compatible
  adapter: KyselyAdapter(db),
  trustHost: true,
  debug: true,
  pages: {
    signIn: '/dashboard'
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: env.AUTH_SECRET
});
