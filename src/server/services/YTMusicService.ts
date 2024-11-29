import { BaseService } from './BaseService';
import { spawn } from 'node:child_process';
import { YtMusicError } from '$server/errors/YtMusicError';

import { db } from '$db';
import { constructAbsoluteFileName } from '$server/heleprs/constructAbsoluteFileName';

class YTMusicService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }

  /**
   * Creates a sharable playlist from liked songs
   * @param cookie - Cookie to authenticate with YouTube Music
   * @param playlistName - Name of the playlist
   * @param playlistDescription - Description of the playlist
   */
  async createSharablePlaylistFromLiked(
    cookie: string,
    playlistName: string,
    playlistDescription: string
  ) {
    return new Promise<string | undefined>((resolve, reject) => {
      const pathToScript = constructAbsoluteFileName(
        '../python-scripts/create_sharable_playlist_from_liked.py',
        import.meta.url
      );

      const args = [pathToScript, cookie, playlistName, playlistDescription];

      const child = spawn('python3', args);

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
          resolve(output.trim());
        } else {
          reject(new YtMusicError(`Error working with youtube music API: \`${errorOutput}\``));
        }
      });
    });
  }
}

export const yTMusicService = new YTMusicService(db);
