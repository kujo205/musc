import { render, screen } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import Header from '$features/header-footer/Header.svelte';

describe("Testing diffrent header states when depending on user's authorization", () => {
  test('Header has `Login` if user is not logged In', async () => {
    render(Header, { authorized: false });

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).toBeDefined();
  });

  test('Header has `DashBoard` if user is logged In', async () => {
    render(Header, { authorized: true });

    const loginButton = screen.getByTestId('dashboard-button');

    expect(loginButton).toBeDefined();
  });
});
