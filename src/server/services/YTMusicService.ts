import { BaseService } from './BaseService';
import { spawn } from 'node:child_process';
import { YtMusicError } from '$server/errors/YtMusicError';

import { db } from '$db';
import { getPythonScriptPath } from '$server/helpers/constructAbsoluteFileName';

export class YTMusicService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }

  /**
   * Creates a sharable playlist from liked songs
   * @param relativePathToScript - relative path to script in this directory
   * @param args - python script command line arguments
   * @param errorMessage - error message passed to the reject function
   */
  private async ytMusicApiBase<T>(
    relativePathToScript: string,
    args: string[],
    errorMessage: string
  ) {
    const absolutePathToScript = getPythonScriptPath(relativePathToScript);

    return new Promise<T>((resolve, reject) => {
      const child = spawn('python3', [absolutePathToScript, ...args]);

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve(output as T);
        } else {
          reject(new YtMusicError(`${errorMessage}, \`${errorOutput}\``));
        }
      });
    });
  }

  /**
   * Creates a sharable playlist from liked songs
   * @param cookie - Cookie to authenticate with YouTube Music
   * @param playlistName - Name of the playlist
   * @param playlistDescription - Description of the playlist
   * @returns - ID of the created playlist
   */
  async createSharablePlaylistFromLiked(
    cookie: string,
    playlistName: string,
    playlistDescription: string
  ) {
    const id = await this.ytMusicApiBase<string>(
      'create_sharable_playlist_from_liked.py',
      [cookie, playlistName, playlistDescription],
      'error creating sharable playlist'
    );
    console.log('[create sharable playlist] creating sharable playlist from liked end');

    return id.trim();
  }

  /**
   * This function will sync the exported playlist with the updates from liked songs
   * @param filePath - Path to a json file which contains metadata about users in JSON format
   * {
   *  cookie:string,
   *  target_playlist_id:string,
   * }[]
   * @returns {void}
   * */
  async syncExportedPlaylistsWithUpdatesFromLiked(filePath: string): Promise<PlaylistSyncResult[]> {
    const resp = await this.ytMusicApiBase<string>(
      'sync_some_playlists_with_liked.py',
      ['--input_file', filePath],
      'error syncing exported playlist with updates from liked'
    );

    return JSON.parse(resp) as PlaylistSyncResult[];
  }

  /**
   * This function checks which ytmusic playlists were deleted
   * So than we can update our database
   * @param filePath - Path to a json file which contains objects like {cookie:string,id:string}[]
   */
  async clear404Playlists(filePath: string): Promise<string[]> {
    const resp = await this.ytMusicApiBase<string>(
      'clear_404_playlists.py',
      ['--input_file', filePath],
      'error clearing deleted playlists'
    );

    const res = JSON.parse(resp) as (string | null)[];

    return res.filter((r) => r !== null) as string[];
  }

  async fetchUserExportedPlaylists(userId: string) {
    const q = await this.db
      .selectFrom('playlists')
      .select([
        'id',
        'id as playlist_id',
        'name',
        'description',

        'link',
        'is_auto_updated as auto_update_playlist',
        'created_at',
        'is_public_on_musc_marketplace as share_with_community'
      ])
      .where('user_id', '=', userId)
      .where((eb) => eb.or([eb('deleted_at_yt', '=', false), eb('deleted_at_yt', 'is', null)]))
      .execute();

    return q;
  }

  async updatePlaylist(cookie: string, playlistId: string, description: string, name: string) {
    const resp = await this.ytMusicApiBase<string>(
      'update_playlist.py',
      [cookie, playlistId, description, name],
      'error updating sharable playlist'
    );

    console.log('[update sharable playlist] updating sharable playlist ' + resp);
  }

  async deletePlaylist(cookie: string, playlistId: string) {
    const resp = await this.ytMusicApiBase<string>(
      'delete_playlist.py',
      [cookie, playlistId],
      'error deleting playlist'
    );

    console.log('[delete sharable playlist] deleting a playlist ' + resp);
  }
}

type PlaylistSyncResult = {
  playlist_id: string;
  deleted_at_yt: boolean;
  added_number: number;
  removed_number: number;
};

export const yTMusicService = new YTMusicService(db);
