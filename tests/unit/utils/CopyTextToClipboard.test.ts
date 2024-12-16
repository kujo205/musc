import { expect, test, describe } from 'vitest';
import { copyTextToClipboard } from '$lib/utils';

describe('Testing CopyTextToClipboard function', () => {
  test('CopyTextToClipboard copies text to clipboard', async () => {
    let clipboard = '';
    const text = 'Copy this text';

    Object.assign(navigator, {
      clipboard: {
        writeText: (text: string) => {
          clipboard = text;
          return Promise.resolve();
        }
      }
    });

    await copyTextToClipboard(text);

    expect(clipboard).toBe(text);
  });
});
