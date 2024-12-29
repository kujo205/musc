import { describe, it, expect, vi } from 'vitest';
import { protectAuthorized } from '$server/helpers/protectAutorized';
import { redirect } from '@sveltejs/kit';

vi.mock('@sveltejs/kit', () => ({
  redirect: vi.fn()
}));

describe('protectAuthorized', () => {
  it('allows access when user is authorized', () => {
    const request = {
      locals: {
        info: {
          authorized: true
        }
      }
    } as unknown as RequestEvent;

    protectAuthorized(request);
    expect(redirect).toBeCalledTimes(0);
  });

  it('redirects when user is not authorized', () => {
    const request = {
      locals: {
        info: {
          authorized: false
        }
      },
      url: 'http://localhost'
    } as unknown as RequestEvent;

    protectAuthorized(request);
    expect(redirect).toHaveBeenCalled();
  });

  it('throws error when locals.info is undefined', () => {
    const request = {
      locals: {}
    } as unknown as RequestEvent;

    expect(() => protectAuthorized(request)).toThrow();
  });
});
