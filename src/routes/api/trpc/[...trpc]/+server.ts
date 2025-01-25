import { createContext } from '$server/trpc/context';
import { router } from '$server/trpc/router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { RequestHandler } from './$types';

const handler: RequestHandler = (event) =>
  fetchRequestHandler({
    req: event.request,
    router,
    endpoint: '/api/trpc',
    createContext: createContext(event)
  });

export const GET: RequestHandler = handler;
export const POST: RequestHandler = handler;
