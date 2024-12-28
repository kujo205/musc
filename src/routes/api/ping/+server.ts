import { type RequestHandler, text } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  console.log('[getting ping]');

  console.log('[returning pong]');
  return text('pong');
};
