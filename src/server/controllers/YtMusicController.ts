import { YTMusicService } from '$server/services/YTMusicService';
import { PlaylistsRepository } from '$server/repositories/PlaylistsRepository';
import { UserRepository } from '$server/repositories/UserRepository';
import { constructAbsoluteFileName } from '$server/heleprs/constructAbsoluteFileName';
import fs from 'node:fs/promises';
import { db } from '$db';
import { DbError } from '$server/errors/DbError';

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

    await this.fs.writeFile(absoluteFilePath, JSON.stringify(data));

    await this.ytMusicService.syncExportedPlaylistsWithUpdatesFromLiked(absoluteFilePath);

    // TODO: insert meta data into playlists syncs
  }

  /**
   * Creates a sharable playlist from liked songs
   * @param email - Email of a user
   * @param playlistName - Name of the playlist
   * @param playlistDescription - Description of the playlist
   * @param isPublicOnMuscMarketPlace - If Playlist os going to be public
   * @returns - link to a playlist
   */
  async createSharablePlaylistFromLiked(
    email: string,
    playlistName: string = 'Liked Music',
    playlistDescription: string = 'My liked Music',
    isPublicOnMuscMarketPlace: boolean = true
  ) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user.cookie) {
      throw new DbError(`no cookie for a user with email \`${email}\``);
    }

    const id = await this.ytMusicService.createSharablePlaylistFromLiked(
      user.cookie,
      playlistName,
      playlistDescription
    );

    const playlistLink = `https://music.youtube.com/playlist?list=${id}`;

    await this.playlistRepository.insertPlaylist({
      name: playlistName,
      id,
      description: playlistDescription,
      user_id: user.id,
      link: playlistLink,
      is_public_on_musc_marketplace: isPublicOnMuscMarketPlace
    });

    return playlistLink;
  }
}

export const ytMusicController = new YtMusicController(db, fs);
