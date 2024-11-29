import { type RequestHandler, text } from '@sveltejs/kit';
import { yTMusicService } from '$server/services/YTMusicService';

export const GET: RequestHandler = async () => {
  console.log('[getting ping]');

  await yTMusicService.createSharablePlaylistFromLiked(
    '',
    'Liked Songs',
    'Playlist of liked songs'
  );

  console.log('[returning pong]');
  return text('pong');
};
