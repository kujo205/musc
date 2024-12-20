import { describe, it, beforeEach, expect } from 'vitest';
import { db } from '$db';
import { playlistsRepository } from '$server/repositories/PlaylistsRepository';

describe('PlaylistsRepository', () => {
  const userId = '260a1sdads5d73981b4a9';
  const playlist = {
    id: '1',
    name: 'My Playlist',
    description: 'A description of my playlist',
    user_id: userId,
    is_public_on_musc_marketplace: true,
    is_auto_updated: false,
    link: 'http://example.com/playlist'
  };

  beforeEach(async () => {
    await db.deleteFrom('playlists').execute();
    await db.deleteFrom('User').execute();
    await db
      .insertInto('User')
      .values({
        id: userId,
        ytmusic_cookie: 'test_cookie',
        email: 'user2@example.com'
      })
      .execute();
  });

  it('should insert a playlist', async () => {
    await playlistsRepository.insertPlaylist(playlist);
    const insertedPlaylist = await db
      .selectFrom('playlists')
      .selectAll()
      .where('id', '=', playlist.id)
      .executeTakeFirstOrThrow();

    expect(insertedPlaylist).toHaveProperty('id', playlist.id);
    expect(insertedPlaylist).toHaveProperty('name', playlist.name);
  });

  it('should retrieve all playlists to sync', async () => {
    await playlistsRepository.insertPlaylist(playlist);
    const playlistsToSync = await playlistsRepository.getAllPlaylistsToSync();

    expect(playlistsToSync).toHaveLength(1);
    expect(playlistsToSync[0]).toHaveProperty('cookie', 'test_cookie');
    expect(playlistsToSync[0]).toHaveProperty('target_playlist_id', playlist.id);
  });
});
