import type { PageServerLoad } from '../$types';
import { userService } from '$server/services/UserService';
import { protectAuthorized } from '$server/heleprs/protectAutorized';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createPlaylistSchema } from '$features/my_playlists/schemas';
import { protectAuthorizedActionWrapper } from '$server/heleprs/protectAuthorizedActionWrapper';
import { type Actions, json } from '@sveltejs/kit';
import { ytMusicController } from '$server/controllers/YtMusicController';

export const load: PageServerLoad = async (request) => {
  protectAuthorized(request);

  const form = await superValidate(zod(createPlaylistSchema), { errors: false });

  return {
    user_has_credentials: await userService.checkUserHasYtMusicCredentials(
      request.locals.info.user.user_id
    ),
    form
  };
};

export const actions: Actions = {
  update_credentials: async (event) =>
    protectAuthorizedActionWrapper(
      {
        schema: createPlaylistSchema,
        event
      },
      async ({ userId, data }) => {
        await ytMusicController.createSharablePlaylistFromLiked(
          userId,
          data.name,
          data.description,
          data.share_with_community,
          data.auto_update_playlist
        );

        return json({ success: true });
      }
    )
};
