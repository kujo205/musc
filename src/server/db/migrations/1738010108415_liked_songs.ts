import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<never>): Promise<void> {
  await db.executeQuery(
    sql`
        create table liked_playlists
        (
            playlist_id varchar(36)                          not null,
            user_id     varchar(36)                          not null,
            liked       tinyint(1) default 0                 not null,
            created_at  timestamp  default CURRENT_TIMESTAMP null,
            updated_at  timestamp                            null on update CURRENT_TIMESTAMP,
            constraint liked_playlists_pk
                unique (playlist_id, user_id)
        );
    `.compile(db)
  );
}
