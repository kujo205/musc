import type { Context } from '$server/trpc/context';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

export const t = initTRPC.context<Context>().create({ transformer: superjson });

export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(async (opts) => {
  console.log('opts', opts);

  const { ctx } = opts;

  console.log('ctx', ctx);
  if (!ctx.info.authorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const profileId = ctx.info.user?.user_id as string;

  return opts.next({
    ctx: {
      ...ctx,
      profileId
    }
  });
});
