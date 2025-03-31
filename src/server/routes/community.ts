import { db } from '$db';
import { t, authedProcedure } from '$server/trpc/t';
import { likePlaylistSchema } from '$server/schemas/community';
import { playlistsRepository } from '$server/repositories/PlaylistsRepository';

export const communityRouter = t.router({
  getCommunityPlaylists: authedProcedure.query(async ({ ctx }) => {
    const resp = await db
      .selectFrom('playlists')
      .leftJoin('User', 'playlists.user_id', 'User.id')
      .leftJoin('liked_playlists as lp', (join) =>
        join.onRef('lp.playlist_id', '=', 'playlists.id')
      )

      .select(({ eb, val }) => [
        'playlists.id',
        'playlists.link',
        'playlists.name',
        'playlists.created_at',
        'User.name as user_name',
        'User.image as user_image',
        eb
          .fn<
            { user_id: string; liked: boolean }[]
          >('JSON_ARRAYAGG', [eb.fn('JSON_OBJECT', [val('user_id'), 'lp.user_id', val('liked'), 'lp.liked'])])
          .as('liked_by')
      ])

      .where('playlists.is_public_on_musc_marketplace', '=', true)
      .where('playlists.deleted_at_yt', '=', false)
      .groupBy('playlists.id')
      .execute();

    return resp.map((r) => ({
      ...r,
      liked: r.liked_by.some((user) => user.user_id === ctx?.profileId && user.liked),
      likes: r.liked_by.filter((user) => user.liked).length
    }));
  }),

  likeCommunityPlaylist: authedProcedure
    .input(likePlaylistSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx?.profileId;

      await playlistsRepository.likePlaylist(userId, input.playlist_id, input.like);
    })
});
