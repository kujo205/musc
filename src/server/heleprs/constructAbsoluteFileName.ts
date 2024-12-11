import { fileURLToPath } from 'node:url';
import { dirname } from 'path';
import path from 'node:path';

export function constructAbsoluteFileName(fileName: string, url: string): string {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);

  return path.resolve(__dirname, fileName);
}
