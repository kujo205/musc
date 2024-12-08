import { z } from 'zod';

export const credentialsSchema = z.object({
  cookie: z.string().min(10, 'Cookie too small').nullable(),
  set_cookie: z.string().min(10, 'Set-Cookie too small').nullable()
});

export type TCredentialSchema = typeof credentialsSchema;
