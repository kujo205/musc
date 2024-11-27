export const UserSubscriptionType = {
  free: 'free',
  paid: 'paid'
} as const;
export type UserSubscriptionType = (typeof UserSubscriptionType)[keyof typeof UserSubscriptionType];
