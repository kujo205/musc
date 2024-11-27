import type { ColumnType } from 'kysely';
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { UsersSubscriptionType } from './enums';

export type Users = {
  id: Generated<number>;
  email: string;
  name: string;
  subscription_type: Generated<UsersSubscriptionType>;
};
export type UserSessions = {
  id: string;
  user_id: number;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
  expires_at: Generated<Timestamp>;
};
export type DB = {
  user_sessions: UserSessions;
  users: Users;
};
