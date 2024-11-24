import { BaseService } from './BaseService';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { AuthenticationError } from '$server/errors/AuthenticationError';
import type { RequestEvent } from '@sveltejs/kit';

export class AuthService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }

  generateSessionToken() {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
  }

  async createSession(token: string, userId: number) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    const insert = {
      id: sessionId,
      user_id: userId,
      expires_at: expiresAt.toISOString()
    };

    await this.db.insertInto('user_sessions').values(insert).executeTakeFirst();

    return insert;
  }

  async validateSessionToken(token: string) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const locals = await this.db
      .selectFrom('user_sessions as s')
      .leftJoin('users as u', 'u.id', 's.user_id')
      .select(['s.id as session_id', 's.user_id', 's.expires_at'])
      .where('s.id', '=', sessionId)
      .executeTakeFirstOrThrow();

    if (!locals) {
      throw new AuthenticationError('No session for provided `session_id` found');
    }

    const sessionExpirationTime = new Date(locals.expires_at).getTime();

    if (Date.now() >= sessionExpirationTime) {
      await this.db
        .deleteFrom('user_sessions')
        .where('id', '=', locals.session_id)
        .executeTakeFirst();
    }
    if (Date.now() >= sessionExpirationTime - 1000 * 60 * 60 * 24 * 15) {
      locals.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      await this.db
        .updateTable('user_sessions')
        .set('expires_at', locals.expires_at.toISOString())
        .where('id', '=', locals.session_id)
        .executeTakeFirst();
    }

    return { locals };
  }

  setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
    event.cookies.set('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: expiresAt,
      path: '/'
    });
  }

  deleteSessionTokenCookie(event: RequestEvent): void {
    event.cookies.set('session', '', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });
  }

  async invalidateSession(sessionId: string) {
    await this.db.deleteFrom('user_sessions').where('id', '=', sessionId).executeTakeFirst();
  }
}
