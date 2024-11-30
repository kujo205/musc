import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<never>): Promise<void> {
  await db.executeQuery(
    sql`
        create table playlists
        (
            id          varchar(36) default (uuid())          not null
                primary key,
            name        text                                  null,
            description text                                  null,
            user_id     varchar(36)                           not null,
            is_public_on_musc_marketplace tinyint(1) default 0 not null,
            link        varchar(256)                           not null,
            created_at  timestamp   default CURRENT_TIMESTAMP not null,
            updated_at  timestamp                             null on update CURRENT_TIMESTAMP,
            constraint playlists_User_id_fk
                foreign key (user_id) references User (id)
        );
    `.compile(db)
  );

  await db.executeQuery(
    sql`
        create table playlist_syncs
        (
            id          varchar(36) default (uuid()) not null
                primary key,
            playlist_id varchar(36)                  null,
            user_id     varchar(36)                  null,
            constraint playlist_syncs_User_id_fk
                foreign key (playlist_id) references User (id),
            constraint playlist_syncs_playlists_id_fk
                foreign key (playlist_id) references playlists (id)
        );
    `.compile(db)
  );
}
