import { NetworkError } from '$server/errors/NetworkError';

export class DbError extends NetworkError {
  constructor(message: string) {
    super(message, 500);
    this.code = 500;
    this.name = 'DbError';
  }
}
