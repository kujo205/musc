import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const p = await parent();
  return p.user;
};
