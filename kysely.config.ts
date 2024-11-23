import { defineConfig } from 'kysely-ctl';
import { db } from './src/server/db';

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: './src/server/db/migrations'
  }
});
