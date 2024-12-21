import * as integration from './factory';
import { beforeEach, afterEach } from 'vitest';

beforeEach(async (context) => {
  await integration.teardown();

  context.integration = integration;
  context.request = new Request('http://localhost');
});
