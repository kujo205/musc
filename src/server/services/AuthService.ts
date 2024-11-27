import { BaseService } from './BaseService';
import { db } from '$db';

export class AuthService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }
}

export const authService = new AuthService(db);
// export type TUserWithSession = UnwrapPromise<ReturnType<typeof authService.validateSessionToken>>;
