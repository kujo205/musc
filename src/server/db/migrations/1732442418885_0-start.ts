import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<never>): Promise<void> {
  await db.executeQuery(
    // @ts-expect-error: it is fine
    sql`
        create table users
        (
            id            varchar(36)  not null primary key,
            name          text         not null,
            email         varchar(255) not null unique,
            email_verified boolean      not null,
            subscription_type enum ('free', 'paid') default 'free' not null,
            image         text,
            created_at     datetime     not null,
            updated_at     datetime     not null
        );

        create table user_sessions
        (
            id        varchar(36)  not null primary key,
            user_id    varchar(36)  not null references user (id),
            token     varchar(255) not null unique,
            ip_address text,
            user_agent text,
            expires_at datetime     not null,
            created_at datetime     not null,
            updated_at datetime     not null,
        );

        create table accounts
        (
            id                    varchar(36) not null primary key,
            account_id             text        not null,
            provider_id            text        not null,
            user_id                varchar(36) not null references users(id),
            access_token           text,
            refresh_token          text,
            id_token               text,
            access_token_expires_at  datetime,
            refresh_token_expires_at datetime,
            scope                 text,
            createdAt             datetime    not null,
            updatedAt             datetime    not null
        );

        create table verification_tokens
        (
            id         varchar(36) not null primary key,
            identifier text        not null,
            value      text        not null,
            expires_at  datetime    not null,
            created_at  datetime,
            updated_at  datetime
        )

    `
  );

  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
}
