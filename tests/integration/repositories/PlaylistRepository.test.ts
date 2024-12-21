import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '$db';
import { faker } from '@faker-js/faker';
import { playlistsRepository } from '$server/repositories/PlaylistsRepository';

describe('PlaylistsRepository', () => {
  const userId = faker.string.uuid();

  const playlist = {
    id: faker.string.uuid(),
    name: 'My Playlist',
    description: 'A description of my playlist',
    user_id: userId,
    is_public_on_musc_marketplace: true,
    is_auto_updated: false,
    link: 'http://example.com/playlist'
  };

  beforeEach(async ({ integration }) => {
    await integration.createUser(userId, 'user@email.com');

    await playlistsRepository.insertPlaylist(playlist);
  });

  it('should insert a playlist', async () => {
    const insertedPlaylist = await db
      .selectFrom('playlists')
      .select(['id', 'name'])
      .where('id', '=', playlist.id)
      .executeTakeFirst();

    expect(insertedPlaylist).toHaveProperty('id', playlist.id);
    expect(insertedPlaylist).toHaveProperty('name', playlist.name);
  });

  it('should retrieve all playlists to sync', async () => {
    const playlistsToSync = await playlistsRepository.getAllPlaylistsToSync();

    expect(playlistsToSync).toHaveLength(1);
    expect(playlistsToSync[0]).toHaveProperty('cookie');
    expect(playlistsToSync[0]).toHaveProperty('target_playlist_id', playlist.id);
  });

  it('should delete a playlist by id', async () => {
    await playlistsRepository.deletePlaylist(playlist.id);
    const deletedPlaylist = await db
      .selectFrom('playlists')
      .selectAll()
      .where('id', '=', playlist.id)
      .executeTakeFirst();

    expect(deletedPlaylist).toBeUndefined();
  });

  it('should update a playlist by id', async () => {
    const updatedData = { name: 'Updated Playlist' };
    await playlistsRepository.updatePlaylist(playlist.id, updatedData);
    const updatedPlaylist = await db
      .selectFrom('playlists')
      .selectAll()
      .where('id', '=', playlist.id)
      .executeTakeFirstOrThrow();

    expect(updatedPlaylist).toHaveProperty('name', updatedData.name);
  });

  it('should not delete a non-existent playlist', async () => {
    const res = await playlistsRepository.deletePlaylist('non-existent-id');

    expect(Number(res.numDeletedRows)).toBe(0);
  });

  it('should not update a non-existent playlist', async () => {
    const updatedData = { name: 'Updated Playlist' };

    const res = await playlistsRepository.updatePlaylist('non-existent-id', updatedData);
    expect(Number(res.numUpdatedRows)).toBe(0);
  });
});
