import type { DB } from './types/db-types';
import { createPool } from 'mysql2'; // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely';
import { env } from '$env/dynamic/private';

const dialect = new MysqlDialect({
  pool: async () =>
    createPool({
      uri: env.DB_URL,
      timezone: 'Z'
    })
});

export const db = new Kysely<DB>({
  dialect
});
export type Database = Kysely<DB>;
export type { DB };
