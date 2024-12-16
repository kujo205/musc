import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import ChangeModeIcon from '$comp/custom/ChangeModeIcon.svelte';

test('ChangeModeIcon Changes Theme', async () => {
  render(ChangeModeIcon);

  const user = userEvent.setup();

  const isDarkThemeBefore = localStorage.getItem('mode-watcher-mode') === 'dark';

  const button = screen.getByRole('button');

  await user.click(button);

  const isDarkThemeAfter = localStorage.getItem('mode-watcher-mode') === 'dark';

  expect(isDarkThemeAfter === isDarkThemeBefore).toBe(false);
});
