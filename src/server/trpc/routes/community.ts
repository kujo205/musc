import { db } from '$db';
import { t, authedProcedure } from '$server/trpc/t';
import { likePlaylistSchema } from '$server/schemas/community';

export const communityRouter = t.router({
  getCommunityPlaylists: authedProcedure.query(async () => {
    return db
      .selectFrom('playlists')
      .leftJoin('User', 'playlists.user_id', 'User.id')
      .select([
        'playlists.id',
        'playlists.link',
        'playlists.name',
        'playlists.created_at',
        'User.name as user_name',
        'User.image as user_image'
      ])
      .where('playlists.is_public_on_musc_marketplace', '=', true)
      .where('playlists.deleted_at_yt', '=', false)
      .execute();
  }),

  likeCommunityPlaylist: authedProcedure
    .input(likePlaylistSchema)
    .mutation(async ({ playlistId, input }) => {
      // TODO: add this ability
    })
});
