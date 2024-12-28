import { type RequestHandler, text } from '@sveltejs/kit';
import { ytMusicController } from '$server/controllers/YtMusicController';

export const GET: RequestHandler = async () => {
  console.log('[getting ping]');

  console.log('[returning pong]');
  return text('pong');
};
