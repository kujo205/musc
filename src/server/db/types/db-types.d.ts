import type { ColumnType } from 'kysely';
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { UserSubscriptionType } from './enums';

export type Account = {
  id: Generated<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  oauth_token_secret: string | null;
  oauth_token: string | null;
};
export type KyselyMigration = {
  name: string;
  timestamp: string;
};
export type KyselyMigrationLock = {
  id: string;
  is_locked: Generated<number>;
};
export type Playlists = {
  id: Generated<string>;
  name: string | null;
  description: string | null;
  user_id: string;
  is_public_on_musc_marketplace: Generated<boolean>;
  is_auto_updated: Generated<boolean | null>;
  link: string;
  deleted_at_yt: Generated<boolean | null>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type PlaylistSyncs = {
  id: Generated<string>;
  playlist_id: string | null;
  user_id: string | null;
};
export type Session = {
  id: Generated<string>;
  userId: string;
  sessionToken: string;
  expires: Timestamp;
};
export type User = {
  id: Generated<string>;
  name: string | null;
  email: string;
  emailVerified: Generated<Timestamp | null>;
  image: string | null;
  subscription_type: Generated<UserSubscriptionType | null>;
  ytmusic_cookie: string | null;
  ytmusic_cookie_expires_at: Timestamp | null;
  ytmusic_set_cookie: string | null;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  kysely_migration: KyselyMigration;
  kysely_migration_lock: KyselyMigrationLock;
  playlist_syncs: PlaylistSyncs;
  playlists: Playlists;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
};
