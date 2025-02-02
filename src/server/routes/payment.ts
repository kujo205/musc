import { t, authedProcedure } from '$server/trpc/t';
import { stripeService } from '$server/services/StripeService';
import { db } from '$db';

export const paymentRouter = t.router({
  pay: authedProcedure.query(async ({ ctx }) => {
    const profileId = ctx.profileId;

    if (await stripeService.isUserBasicSubscriber(profileId)) {
      return {
        redirect: '/checkout/success'
      };
    }

    const sessionId = await stripeService.createStripeSession(ctx.url.origin, ctx.profileId);

    await db
      .insertInto('stripe_sessions')
      .values({
        user_id: profileId,
        stripe_session_id: sessionId
      })
      .execute();

    return {
      sessionId
    };
  })
});
