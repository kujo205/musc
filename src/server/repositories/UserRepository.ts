import { BaseRepository } from '$server/repositories/BaseRepository';
import { db } from '$db';

export class UserRepository extends BaseRepository {
  constructor(db: TDatabase) {
    super(db);
  }

  async getUserByEmail(email: string) {
    return this.db
      .selectFrom('User')
      .select(['User.ytmusic_cookie as cookie', 'User.id'])
      .where('email', '=', email)
      .executeTakeFirstOrThrow();
  }
}

export const userRepository = new UserRepository(db);
