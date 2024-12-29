import { fileURLToPath } from 'node:url';
import { dirname } from 'path';
import path from 'node:path';
import { env } from '$env/dynamic/private';

export function getPythonScriptPath(scriptName: string): string {
  if (env.ENV === 'dev') {
    return path.resolve(process.cwd(), `static/python-scripts/${scriptName}`);
  }

  return path.resolve(process.cwd(), `build/client/python-scripts/${scriptName}`);
}

export function constructAbsoluteFileName(fileName: string, url: string): string {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);

  return path.resolve(__dirname, fileName);
}
