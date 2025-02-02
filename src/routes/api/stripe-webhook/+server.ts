import { json, type RequestHandler } from '@sveltejs/kit';
import { stripeService } from '$server/services/StripeService';

export const POST: RequestHandler = async ({ request: req }) => {
  console.log('[getting ping]');

  const event = await stripeService.verifyStripeWebhookCall(req);

  const sessionId = event?.data?.object?.id;

  console.log('[sessionId]', sessionId);

  await stripeService.setSessionVerified(sessionId);

  return json({ received: true });
};
