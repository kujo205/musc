import { BaseService } from './BaseService';
import { spawn } from 'node:child_process';
import { resolve as resolveNode, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { db } from '$db';

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
    return new Promise((resolve, reject) => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const pathToScript = resolveNode(
        __dirname,
        '../python-scripts/create_sharable_playlist_from_liked.py'
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
          resolve(output);
        } else {
          reject(new Error(errorOutput));
        }
      });
    });
  }
}

export const yTMusicService = new YTMusicService(db);
