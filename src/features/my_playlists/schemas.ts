import { z } from 'zod';

export const createPlaylistSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  share_with_community: z.boolean().optional(),
  auto_update_playlist: z.boolean().optional()
});

export type TCreatePlaylistSchema = typeof createPlaylistSchema;