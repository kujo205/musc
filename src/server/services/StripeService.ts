import { BaseService } from './BaseService';
import { db } from '$db';
import {
  PRIVATE_STRIPE_KEY,
  STRIPE_LIFETIME_PRICE_ID,
  STRIPE_ENDPOINT_SECRET
} from '$env/static/private';

import Stripe from 'stripe';

const stripe = new Stripe(PRIVATE_STRIPE_KEY);

export class StripeService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }

  /**
   * @param host - domain on a front end app, to where we want to redirect our session to
   * @return sessionId - id of a created stripe session
   */
  async createStripeSession(host: string, userId: string) {
    const successUrl = `${host}/checkout/success`;
    const cancelUrl = `${host}/checkout/failure`;

    console.log('successUrl', successUrl);
    console.log('cancelUrl', cancelUrl);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_LIFETIME_PRICE_ID,
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: userId
      }
    });

    return session.id;
  }

  async isUserBasicSubscriber(userId: string) {
    const userRole = await this.db
      .selectFrom('User')
      .select('subscription_type')
      .where('User.id', '=', userId)
      .executeTakeFirst();

    return userRole?.subscription_type === 'basic';
  }

  async verifyStripeWebhookCall(req: Request) {
    try {
      const sig = req.headers.get('stripe-signature');
      const body = await req.text();
      return stripe.webhooks.constructEvent(body, sig, STRIPE_ENDPOINT_SECRET);
    } catch (err) {
      console.log(`Unable to verify stripe event: ${err?.message}`);
      throw err;
    }
  }
}

export const stripeService = new StripeService(db);
