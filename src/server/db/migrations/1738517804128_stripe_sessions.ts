import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<never>): Promise<void> {
  await db.executeQuery(
    sql`
            create table stripe_sessions
                (
                id                varchar(36) default (uuid())          not null,
                stripe_session_id varchar(512)                           not null,
                user_id           varchar(36)                           not null,
                has_paid          tinyint(1)  default 0                 not null,
                updated_at        TIMESTAMP   default CURRENT_TIMESTAMP null,
                created_at        TIMESTAMP                             null on update CURRENT_TIMESTAMP,
                constraint stripe_sessions_pk
                unique (stripe_session_id),
                constraint stripe_sessions_User_id_fk
                foreign key (user_id) references User (id)
                );
    `.compile(db)
  );
}
