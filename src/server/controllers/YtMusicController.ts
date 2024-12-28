import { YTMusicService } from '$server/services/YTMusicService';
import { PlaylistsRepository } from '$server/repositories/PlaylistsRepository';
import { UserRepository } from '$server/repositories/UserRepository';
import { constructAbsoluteFileName } from '$server/heleprs/constructAbsoluteFileName';
import fs from 'node:fs/promises';
import { db } from '$db';
import { DbError } from '$server/errors/DbError';
import { YtMusicError } from '$server/errors/YtMusicError';
import { env } from '$env/dynamic/private';

type TFileSystem = typeof fs;

export class YtMusicController {
  private playlistRepository: PlaylistsRepository;
  private userRepository: UserRepository;
  private ytMusicService: YTMusicService;
  private fs: TFileSystem;

  constructor(db: TDatabase, _fs: TFileSystem) {
    this.ytMusicService = new YTMusicService(db);
    this.playlistRepository = new PlaylistsRepository(db);
    this.fs = _fs;
    this.userRepository = new UserRepository(db);
  }

  async syncMusic() {
    const absoluteFilePath = constructAbsoluteFileName(
      'sync_some_playlists_with_liked_input.json',
      import.meta.url
    );

    const data = await this.playlistRepository.getAllPlaylistsToSync();

    this.fs.writeFile(absoluteFilePath, JSON.stringify(data));

    const syncResult =
      await this.ytMusicService.syncExportedPlaylistsWithUpdatesFromLiked(absoluteFilePath);

    const deletedPlaylists = syncResult.filter((playlist) => playlist.deleted_at_yt);

    const mappedDeletedPlaylists = deletedPlaylists.map((playlist) => ({
      id: playlist.playlist_id,
      deleted_at_yt: playlist.deleted_at_yt
    }));

    await this.playlistRepository.bulkUpdatePlaylistsDeleted(mappedDeletedPlaylists);

    const mappedPlaylistsSyncs = deletedPlaylists.map((sync) => ({
      playlist_id: sync.playlist_id,
      added_number: sync.added_number,
      removed_number: sync.removed_number
    }));

    await this.playlistRepository.insertPlaylistSyncs(mappedPlaylistsSyncs);

    await this.fs.rm(absoluteFilePath);

    console.info(`[synced music for ${data.length} playlists]`);
  }

  /**
   * Creates a sharable playlist from liked songs
   * @param userId - Id of a user
   * @param playlistName - Name of the playlist
   * @param playlistDescription - Description of the playlist
   * @param isPublicOnMuscMarketPlace - If Playlist os going to be public
   * @param isAutoUpdate - If Playlist is going to be auto updated
   * @returns - link to a playlist
   */
  async createSharablePlaylistFromLiked(
    userId: string,
    playlistName: string = 'Liked Music',
    playlistDescription: string = 'My liked Music',
    isPublicOnMuscMarketPlace: boolean = true,
    isAutoUpdate: boolean = true
  ) {
    const user = await this.userRepository.getUserById(userId);

    if (!user.cookie) {
      throw new DbError(`no cookie for a user with email \`${user.email}\``);
    }

    if (isAutoUpdate && user.subscription_type !== 'basic') {
      throw new DbError(`user \`${user.email}\` cannot create auto updated playlists`);
    }

    let id: string = '';

    if (env.ENV === 'test') {
      id = crypto.randomUUID();
    } else {
      id = await this.ytMusicService.createSharablePlaylistFromLiked(
        user.cookie,
        playlistName,
        playlistDescription
      );
    }

    if (id.length > 40) {
      throw new YtMusicError(
        'You have probably exceeded your daily quota, please come back and try later'
      );
    }

    const playlistLink = `https://music.youtube.com/playlist?list=${id}`;

    await this.playlistRepository.insertPlaylist({
      name: playlistName,
      id,
      description: playlistDescription,
      user_id: user.id,
      link: playlistLink,
      is_public_on_musc_marketplace: isPublicOnMuscMarketPlace,
      is_auto_updated: isAutoUpdate,
      deleted_at_yt: false
    });

    return playlistLink;
  }
}

export const ytMusicController = new YtMusicController(db, fs);
