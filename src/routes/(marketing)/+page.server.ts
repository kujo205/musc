import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes';

export const load: PageServerLoad = async (event) => {
  return event.locals.info;
};
