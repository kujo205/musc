export const UsersSubscriptionType = {
  free: 'free',
  paid: 'paid'
} as const;
export type UsersSubscriptionType =
  (typeof UsersSubscriptionType)[keyof typeof UsersSubscriptionType];
