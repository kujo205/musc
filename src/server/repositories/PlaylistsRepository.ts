import { BaseRepository } from '$server/repositories/BaseRepository';
import { type DB, db } from '$db';
import { type Selectable } from 'kysely';

type TPlaylistInsert = Omit<Selectable<DB['playlists']>, 'updated_at' | 'created_at'>;

export class PlaylistsRepository extends BaseRepository {
  constructor(db: TDatabase) {
    super(db);
  }

  insertPlaylist(playlist: TPlaylistInsert) {
    return this.db.insertInto('playlists').values(playlist).executeTakeFirstOrThrow();
  }

  async getAllPlaylistsToSync() {
    const q = this.db
      .selectFrom('playlists as p')
      .leftJoin('User as u', 'p.user_id', 'u.id')
      .select(['u.ytmusic_cookie as cookie', 'p.id as target_playlist_id'])
      .where('p.is_auto_updated', '=', true)
      .where((eb) => eb.or([eb('p.deleted_at_yt', '=', false), eb('p.deleted_at_yt', 'is', null)]))
      .where('u.subscription_type', '=', 'basic');

    return q.execute();
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

  bulkUpdatePlaylistsDeleted(playlists: Pick<TPlaylistInsert, 'id' | 'deleted_at_yt'>[]) {
    if (playlists.length === 0) return Promise.resolve();

    const promises = playlists.map((playlist) =>
      this.db.updateTable('playlists').set(playlist).where('id', '=', playlist.id).execute()
    );

    return Promise.all(promises);
  }

  async insertPlaylistSyncs(syncs: Partial<Selectable<DB['playlist_syncs']>>[]) {
    if (syncs.length === 0) return;

    return this.db.insertInto('playlist_syncs').values(syncs).execute();
  }
}

export const playlistsRepository = new PlaylistsRepository(db);
