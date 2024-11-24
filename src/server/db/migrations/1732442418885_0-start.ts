import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<never>): Promise<void> {
  await db.executeQuery(
    // @ts-expect-error: it is fine
    sql`
        create table users
        (
            id    int auto_increment
        primary key,
            email varchar(256) not null,
            name  varchar(256) not null,
            subscription_type enum ('free', 'paid') default 'free' not null,
            constraint users_pk
                unique (email)
        );

        create table user_sessions
        (
            id         varchar(256)                        not null
                primary key,
            user_id    int                                 not null,
            created_at timestamp default CURRENT_TIMESTAMP not null,
            updated_at TIMESTAMP                           null on update CURRENT_TIMESTAMP,
            expires_at timestamp default not null,
            constraint user_sessions_users_id_fk
                foreign key (user_id) references users (id)
        );
    `
  );

  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
}
