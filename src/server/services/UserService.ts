import { BaseService } from './BaseService';
import { db } from '$db';
import { extractExpiresAtAndFormat } from '$server/heleprs/extractExpiresAt';

export class UserService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }

  async updateYtCredentials(
    userId: string,
    cookieCredentialRaw: string | null,
    setCookieCredentialRaw: string | null
  ) {
    return this.db
      .updateTable('User')
      .set({
        ytmusic_cookie: cookieCredentialRaw,
        ytmusic_cookie_expires_at: setCookieCredentialRaw
          ? extractExpiresAtAndFormat(setCookieCredentialRaw)
          : null,
        ytmusic_set_cookie: setCookieCredentialRaw
      })
      .where('id', '=', userId)
      .executeTakeFirstOrThrow();
  }

  async getYtMusicCredentials(userId: string) {
    return this.db
      .selectFrom('User')
      .select([
        'ytmusic_cookie as cookie',
        'ytmusic_set_cookie as set_cookie',
        'ytmusic_cookie_expires_at as expires_at'
      ])
      .where('id', '=', userId)
      .executeTakeFirst();
  }
}

export const userService = new UserService(db);
