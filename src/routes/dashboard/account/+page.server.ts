import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { credentialsSchema } from '$features/account/schemas';
import { type Actions, json } from '@sveltejs/kit';
import { protectAuthorizedActionWrapper } from '$server/heleprs/protectAuthorizedActionWrapper';
import { userService } from '$server/services/UserService';
import { protectAuthorized } from '$server/heleprs/protectAutorized';

export const load: PageServerLoad = async (request) => {
  protectAuthorized(request);
  const locals = request.locals;

  const data = await userService.getYtMusicCredentials(locals.info.user.user_id);

  const form = await superValidate(data, zod(credentialsSchema), { errors: false });

  return {
    info: locals.info,
    form,
    expiresAt: !data?.expires_at ? null : new Date(data?.expires_at)
  };
};

export const actions: Actions = {
  update_credentials: async (event) =>
    protectAuthorizedActionWrapper(
      {
        schema: credentialsSchema,
        event
      },
      async ({ userId, data }) => {
        await userService.updateYtCredentials(userId, data.cookie, data.set_cookie);

        return json({ success: true });
      }
    )
};
