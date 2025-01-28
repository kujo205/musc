import { type inferRouterOutputs } from '@trpc/server';
import { t } from './t';
import { createContext } from './context';
import { communityRouter } from './routes/community';
import type { RequestEvent } from '@sveltejs/kit';

export const router = t.router({
  community: communityRouter
});

export const serverCaller = (event: RequestEvent) =>
  t.createCallerFactory(router)(createContext(event)());

export type Router = typeof router;
export type RouterOutput = inferRouterOutputs<Router>;
