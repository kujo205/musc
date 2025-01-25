import type { PageServerLoad } from './$types';
import { protectAuthorized } from '$server/helpers/protectAutorized';
import { serverCaller } from '$server/trpc/router';

export const load: PageServerLoad = async (request) => {
  protectAuthorized(request);

  const playlists = await serverCaller(request).community.getCommunityPlaylists();

  return {
    playlists
  };
};
