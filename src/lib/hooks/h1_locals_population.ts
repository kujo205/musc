import { type Handle } from '@sveltejs/kit';
import { authService } from '$server/services/AuthService';

export const h1LocalsPopulation: Handle = async ({ event, resolve }) => {
  const authInfo = await event.locals.auth();
  const maybeUserEmail = authInfo?.user?.email;

  event.locals.info = await authService.populateUserSession(maybeUserEmail);

  return resolve(event);
};
