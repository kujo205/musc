import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, vi, describe } from 'vitest';
import CopyBtn from '$comp/custom/CopyBtn.svelte';
import * as utils from '$lib/utils';

describe('Testing CopyBtn component', () => {
  const text = 'Copy this text';

  test('CopyBtn copies text to clipboard and shows copied state', async () => {
    const spy = vi.spyOn(utils, 'copyTextToClipboard');

    render(CopyBtn, {
      props: {
        text,
        tooltipText: 'Click to copy'
      }
    });

    const button = screen.getByTestId('copy-btn');
    await fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith(text);
  });
});
