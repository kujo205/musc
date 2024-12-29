import { describe, it, expect } from 'vitest';
import { extractExpiresAtAndFormat } from '$server/helpers/extractExpiresAt';

describe('extractExpiresAtAndFormat', () => {
  it('returns formatted date string when expires attribute is present', () => {
    const setCookieHeader = 'sessionId=abc123; expires=Wed, 11-Dec-2025 01:25:27 GMT; path=/';
    const result = extractExpiresAtAndFormat(setCookieHeader);
    expect(result).toBe('2025-12-11 01:25:27.000');
  });

  it('returns null when expires attribute is not present', () => {
    const setCookieHeader = 'sessionId=abc123; path=/';
    const result = extractExpiresAtAndFormat(setCookieHeader);
    expect(result).toBeNull();
  });

  it('returns null when setCookieHeader is an empty string', () => {
    const setCookieHeader = '';
    const result = extractExpiresAtAndFormat(setCookieHeader);
    expect(result).toBeNull();
  });

  it('throws when data value is malformed', () => {
    const setCookieHeader = 'sessionId=abc123; expires=invalid-date; path=/';
    expect(() => extractExpiresAtAndFormat(setCookieHeader)).toThrowError();
  });
});
