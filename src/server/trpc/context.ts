import type { RequestEvent } from '@sveltejs/kit';

export function createContext(event: RequestEvent) {
  return () => ({
    cookies: event.cookies,
    request: event.request,
    ...event.locals
  });
}

export type Context = ReturnType<typeof createContext>;
