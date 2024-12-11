import type { PageServerLoad } from '../$types';
import { userService } from '$server/services/UserService';
import { protectAuthorized } from '$server/heleprs/protectAutorized';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createPlaylistSchema } from '$features/my_playlists/schemas';
import { protectAuthorizedActionWrapper } from '$server/heleprs/protectAuthorizedActionWrapper';
import { type Actions } from '@sveltejs/kit';
import { ytMusicController } from '$server/controllers/YtMusicController';
import { yTMusicService } from '$server/services/YTMusicService';

export const load: PageServerLoad = async (request) => {
  protectAuthorized(request);

  const form = await superValidate(zod(createPlaylistSchema), { errors: false });

  return {
    user_has_credentials: await userService.checkUserHasYtMusicCredentials(
      request.locals.info.user.user_id
    ),
    playlists: await yTMusicService.fetchUserExportedPlaylists(request.locals.info.user.user_id),
    form,
    autoUpdatesEnabled: await userService.autoUpdatesEnabled(request.locals.info)
  };
};

export const actions: Actions = {
  create_playlist: async (event) =>
    protectAuthorizedActionWrapper(
      {
        schema: createPlaylistSchema,
        event
      },
      async ({ form, userId, data }) => {
        console.log('[playlist creation] creating a playlist start ', data);

        const url = await ytMusicController.createSharablePlaylistFromLiked(
          userId,
          data.name,
          data.description,
          data.share_with_community,
          data.auto_update_playlist
        );

        console.log('[playlist creation] created a playlist', url);

        return message(form, url);
      }
    )
};
