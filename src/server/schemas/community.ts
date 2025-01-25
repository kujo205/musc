import z from 'zod';

export const likePlaylistSchema = z.object({
  playlist_id: z.string(),
  like: z.boolean()
});
