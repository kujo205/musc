import { auth } from '$server/auth'; // path to your auth file
import { svelteKitHandler } from 'better-auth/svelte-kit';
import type { Handle } from '@sveltejs/kit';

export const hook0Auth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};
