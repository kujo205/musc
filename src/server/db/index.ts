import { type DB } from './types/db-types'; // this is the Database interface we defined earlier
import { createPool } from 'mysql2'; // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely';

const dialect = new MysqlDialect({
  pool: async () =>
    createPool({
      uri: process.env.DB_URL,
      timezone: 'Z'
    })
});

export const db = new Kysely<DB>({
  dialect
});
