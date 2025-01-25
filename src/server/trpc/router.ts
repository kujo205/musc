import { type inferRouterOutputs } from '@trpc/server';
import { t } from './t';
import { createContext } from './context';
import { communityRouter } from './routes/community';

export const router = t.router({
  community: communityRouter
});

export const serverCaller = (event: Parameters<typeof createContext>[0]) =>
  // @ts-expect-error: incomplete type inference
  t.createCallerFactory(router)(createContext(event));

export type Router = typeof router;
export type RouterOutput = inferRouterOutputs<Router>;
