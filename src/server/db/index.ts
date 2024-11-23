import { type Database } from './types/db-types'; // this is the Database interface we defined earlier
import { createPool } from 'mysql2'; // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely';
import { env } from '$env/dynamic/private';

const dialect = new MysqlDialect({
  // @ts-expect-error: incorrect type declarations in either mysql2 or kysely
  pool: async () =>
    createPool({
      uri: env.DB_URL,
      timezone: 'Z'
    })
});

export const db = new Kysely<Database>({
  dialect
});
