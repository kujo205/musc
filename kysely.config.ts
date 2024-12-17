import { defineConfig } from 'kysely-ctl';
import { createPool } from 'mysql2';
import { Kysely, MysqlDialect } from 'kysely';

export default defineConfig({
  kysely: new Kysely({
    dialect: new MysqlDialect({
      pool: async () =>
        createPool({
          uri: process.env.DB_URL,
          timezone: 'Z'
        })
    })
  }),
  migrations: {
    migrationFolder: './src/server/db/migrations'
  },
  seeds: {
    seedFolder: './src/server/db/seeds'
  }
});
