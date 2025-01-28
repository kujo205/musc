import { db } from '$db';
import { t, authedProcedure } from '$server/trpc/t';
import { likePlaylistSchema } from '$server/schemas/community';
import { playlistsRepository } from '$server/repositories/PlaylistsRepository';

export const communityRouter = t.router({
  getCommunityPlaylists: authedProcedure.query(async ({ ctx }) => {
    return db
      .selectFrom('playlists')
      .leftJoin('User', 'playlists.user_id', 'User.id')
      .leftJoin('liked_playlists', (join) =>
        join
          .onRef('liked_playlists.playlist_id', '=', 'playlists.id')
          .on('liked_playlists.user_id', '=', ctx.profileId)
      )

      .select(({ ref, case: sqlCase, eb }) => [
        'playlists.id',
        'playlists.link',
        'playlists.name',
        'playlists.created_at',
        'User.name as user_name',
        'User.image as user_image',
        sqlCase()
          .when(eb(ref('liked_playlists.liked'), '=', true))
          .then(true)
          .else(false)
          .end()
          .as('liked')
      ])

      .where('playlists.is_public_on_musc_marketplace', '=', true)
      .where('playlists.deleted_at_yt', '=', false)
      .groupBy('playlists.id')
      .execute();
  }),

  likeCommunityPlaylist: authedProcedure
    .input(likePlaylistSchema)
    .mutation(async ({ input, ctx }) => {
      console.log('input', input);

      const userId = ctx?.profileId;

      // console.log(userId);
      await playlistsRepository.likePlaylist(userId, input.playlist_id, input.like);
    })
});
