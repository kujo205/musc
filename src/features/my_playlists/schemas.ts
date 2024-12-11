import { z } from 'zod';

export const createPlaylistSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  share_with_community: z.boolean(),
  auto_update_playlist: z.boolean().default(false)
});

export type TCreatePlaylistSchema = typeof createPlaylistSchema;
