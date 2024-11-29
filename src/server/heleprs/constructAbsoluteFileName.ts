import { fileURLToPath } from 'node:url';
import { dirname, join } from 'path';

export function constructAbsoluteFileName(fileName: string, url: string): string {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);

  return join(__dirname, fileName);
}
