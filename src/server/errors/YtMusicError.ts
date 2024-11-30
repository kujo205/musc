import { NetworkError } from './NetworkError';

export class YtMusicError extends NetworkError {
  constructor(message: string) {
    super(`Error working with youtube music API: ${message} or you dont have yt channel`, 500);
    this.code = 500;
    this.name = 'YtMusicError';
  }
}
