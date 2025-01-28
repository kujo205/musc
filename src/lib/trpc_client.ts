import type { Router } from '$server/trpc/router';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

export const trpc = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      // @ts-expect-error: superjson is not a transformer
      transformer: superjson
    })
  ],
  transformer: superjson
});
