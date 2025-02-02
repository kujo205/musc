import { t, authedProcedure } from '$server/trpc/t';
import { stripeService } from '$server/services/StripeService';

export const paymentRouter = t.router({
  pay: authedProcedure.query(async ({ ctx }) => {
    if (await stripeService.isUserBasicSubscriber(ctx.profileId)) {
      return {
        redirect: '/checkout/success'
      };
    }

    const sessionId = await stripeService.createStripeSession(ctx.url.origin, ctx.profileId);

    console.log(`[payment]: creating session id ${sessionId}`);

    return {
      sessionId
    };
  })
});
