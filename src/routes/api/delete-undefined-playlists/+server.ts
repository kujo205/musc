import { json, type RequestHandler } from '@sveltejs/kit';
import { ytMusicController } from '$server/controllers/YtMusicController';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
  const maybeKey = new URL(url).searchParams.get('key');

  if (maybeKey !== env.SECRET_API_MUSC_KEY) {
    return json({ message: 'Not found', ok: false });
  }

  await ytMusicController.clear404Playlists();

  return json({ ok: true });
};
