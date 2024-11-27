import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';
import { env } from '$env/dynamic/private';

export const auth = betterAuth({
  database: createPool({
    uri: env.DB_URL,
    timezone: 'Z'
  }),
  socialProviders: {
    google: {
      clientId: String(env.GOOGLE_CLIENT_ID),
      clientSecret: String(env.GOOGLE_CLIENT_SECRET)
    }
  },

  // rewrite table names according to my database style
  user: {
    modelName: 'users',
    fields: {
      email: 'email',
      emailVerified: 'email_verified',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  },

  session: {
    modelName: 'user_sessions',
    fields: {
      userAgent: 'user_agent',
      userId: 'user_id',
      expiresAt: 'expires_at',
      ipAddress: 'ip_address',
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    }
  },

  account: {
    modelName: 'accounts',
    fields: {
      accountId: 'account_id',
      providerId: 'provider_id',
      userId: 'user_id',
      idToken: 'id_token',
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      accessTokenExpiresAt: 'access_token_expires_at',
      refreshTokenExpiresAt: 'refresh_token_expires_at'
    }
  },

  verification: {
    modelName: 'verification_tokens',
    fields: {
      expiresAt: 'expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
});
