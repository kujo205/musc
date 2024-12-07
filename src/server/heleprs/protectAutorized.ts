import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function protectAuthorized({ request, locals }: RequestEvent) {
  const isAuthorized = locals.info.authorized;

  if (!isAuthorized) {
    const origin = new URL(request.url).origin;
    return redirect(302, origin);
  }
}
