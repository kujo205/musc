import { BaseRepository } from '$server/repositories/BaseRepository';
import { type DB, db } from '$db';
import type { Selectable } from 'kysely';

type TPlaylistInsert = Omit<Selectable<DB['playlists']>, 'updated_at' | 'created_at'>;
type TPlaylistUpdate = RequiredBy<TPlaylistInsert, 'id'>;

export class PlaylistsRepository extends BaseRepository {
  constructor(db: TDatabase) {
    super(db);
  }

  insertPlaylist(playlist: TPlaylistInsert) {
    return this.db.insertInto('playlists').values(playlist).executeTakeFirstOrThrow();
  }

  updatePlaylist(playlist: TPlaylistUpdate) {
    return this.db.insertInto('playlists').values(playlist).executeTakeFirstOrThrow();
  }

  async getAllPlaylistsToSync() {
    return this.db
      .selectFrom('playlists as p')
      .leftJoin('User as u', 'p.user_id', 'u.id')
      .select(['u.ytmusic_cookie as cookie', 'p.id as target_playlist_id'])
      .execute();
  }
}

export const playlistsRepository = new PlaylistsRepository(db);
