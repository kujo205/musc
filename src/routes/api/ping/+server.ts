import { type RequestHandler, text } from '@sveltejs/kit';
import { yTMusicService } from '$server/services/YTMusicService';

export const GET: RequestHandler = async () => {
  console.log('[getting ping]');

  await yTMusicService.createSharablePlaylistFromLiked('', '', '');

  console.log('[returning pong]');
  return text('pong');
};
