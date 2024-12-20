import * as integration from './factory';
import { beforeEach } from 'vitest';
import { db } from '$db';

beforeEach(async (context) => {
  await db.deleteFrom('playlists').execute();
  await db.deleteFrom('User').execute();

  context.integration = integration;
  context.request = new Request('http://localhost');
});
