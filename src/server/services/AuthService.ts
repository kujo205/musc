import { BaseService } from './BaseService';
import { db } from '$db';
import { DbError } from '$server/errors/DbError';

export class AuthService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }

  async populateUserSession(userEmail?: string | null) {
    if (!userEmail) {
      return { user: null, authorized: false };
    }

    const user = await this.getAutorizedUserSession(userEmail);

    if (!user) {
      throw new DbError('No user found, session should be populated only for existing users');
    }

    return { user, authorized: true };
  }

  async getAutorizedUserSession(email: string) {
    return db
      .selectFrom('User as u')
      .leftJoin('Account as a', 'a.userId', 'u.id')
      .select(['u.id as user_id', 'u.subscription_type', 'u.email', 'u.name', 'u.image'])
      .where('u.email', '=', email)
      .executeTakeFirst();
  }
}

export const authService = new AuthService(db);
export type TUserWithSession = UnwrapPromise<ReturnType<typeof authService.populateUserSession>>;

export type AuthorizedUserWithSession = {
  user: NonNullable<UnwrapPromise<ReturnType<typeof authService.getAutorizedUserSession>>>;
  authorized: boolean;
};
