import { NetworkError } from './NetworkError';

export class AuthenticationError extends NetworkError {
  constructor(message: string) {
    super(message, 401);
    this.code = 401;
    this.name = 'AuthenticationError';
  }
}
