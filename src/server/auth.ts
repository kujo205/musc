import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';

export const auth = betterAuth({
  database: createPool({
    uri: process.env.DB_URL,
    timezone: 'Z'
  }),
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    }
  }
});
