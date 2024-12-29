import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export function protectAuthorized(
  request: RequestEvent
): asserts request is RequestEvent & { locals: { info: TAuthorizedUserWithSession } } {
  const locals = request.locals;
  const isAuthorized = locals.info.authorized;

  if (!isAuthorized) {
    const origin = new URL(request.url).origin;
    redirect(302, origin);
  }
}
