import type { PageServerLoad } from './$types';
import { protectAuthorized } from '$server/heleprs/protectAutorized';

export const load: PageServerLoad = async (request) => {
  return protectAuthorized(request);
};
