import { BaseRepository } from '$server/repositories/BaseRepository';
import { type DB, db } from '$db';
import type { Selectable } from 'kysely';

type TPlaylistInsert = Omit<Selectable<DB['playlists']>, 'updated_at' | 'created_at'>;

export class PlaylistsRepository extends BaseRepository {
  constructor(db: TDatabase) {
    super(db);
  }

  insertPlaylist(playlist: TPlaylistInsert) {
    return this.db.insertInto('playlists').values(playlist).executeTakeFirstOrThrow();
  }

  async getAllPlaylistsToSync() {
    return this.db
      .selectFrom('playlists as p')
      .leftJoin('User as u', 'p.user_id', 'u.id')
      .select(['u.ytmusic_cookie as cookie', 'p.id as target_playlist_id'])
      .execute();
  }

  deletePlaylist(playlistId: string) {
    return this.db.deleteFrom('playlists').where('id', '=', playlistId).executeTakeFirstOrThrow();
  }

  updatePlaylist(playlistId: string, playlist: Partial<TPlaylistInsert>) {
    return this.db
      .updateTable('playlists')
      .set(playlist)
      .where('id', '=', playlistId)
      .executeTakeFirstOrThrow();
  }
}

export const playlistsRepository = new PlaylistsRepository(db);
