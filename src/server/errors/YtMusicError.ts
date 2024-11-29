import { NetworkError } from './NetworkError';

export class YtMusicError extends NetworkError {
  constructor(message: string) {
    super(message, 500);
    this.code = 500;
    this.name = 'YtMusicError';
  }
}
