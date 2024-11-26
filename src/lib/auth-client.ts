import { createAuthClient } from 'better-auth/svelte';

const client = createAuthClient();

export const signIn = async () => {
  const data = await client.signIn.social({
    provider: 'google',
    callbackURL: '/'
  });

  console.log('data', data);
};
