import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { serverCaller } from '$server/trpc/router';

export const load: PageServerLoad = async (req) => {
  const resp = await serverCaller(req).payment.pay();

  if (resp.redirect) {
    return redirect(302, resp.redirect);
  }

  return {
    sessionId: resp.sessionId
  };
};
