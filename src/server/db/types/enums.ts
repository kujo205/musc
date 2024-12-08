export const UserSubscriptionType = {
  free: 'free',
  basic: 'basic'
} as const;
export type UserSubscriptionType = (typeof UserSubscriptionType)[keyof typeof UserSubscriptionType];
