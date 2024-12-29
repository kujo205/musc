import type { PageServerLoad } from './$types';
import { protectAuthorized } from '$server/helpers/protectAutorized';

export const load: PageServerLoad = async (request) => {
  return protectAuthorized(request);
};
