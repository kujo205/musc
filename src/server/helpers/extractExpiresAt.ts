export function extractExpiresAtAndFormat(setCookieHeader: string): string | null {
  const expiresMatch = setCookieHeader.match(/expires=([^;]+)/);
  if (expiresMatch) {
    const expiresDate = new Date(expiresMatch[1]);
    return expiresDate.toISOString().replace('T', ' ').replace('Z', '');
  }
  return null;
}
