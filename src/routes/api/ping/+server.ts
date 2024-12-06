import { type RequestHandler, text } from '@sveltejs/kit';
import { ytMusicController } from '$server/controllers/YtMusicController';

export const GET: RequestHandler = async () => {
  console.log('[getting ping]');

  // await ytMusicController.createSharablePlaylistFromLiked('kuc8301@gmail.com', 'Test Playlist');
  await ytMusicController.syncMusic();

  console.log('[returning pong]');
  return text('pong');
};
