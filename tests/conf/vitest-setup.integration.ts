import * as integration from './factory';
import { beforeEach } from 'vitest';

beforeEach((context) => {
  context.integration = integration;
  context.request = new Request('http://localhost');
});
