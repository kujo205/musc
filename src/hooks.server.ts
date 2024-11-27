import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { h0Auth } from '$lib/hooks/h0_auth';
import { h1LocalsPopulation } from '$lib/hooks/h1_locals_population';
// import { hook2CheckPath } from '$server/hooks/h2_check_path';
// import { hook3UserInfo } from '$server/hooks/h3_user_info';

export const handle: Handle = sequence(h0Auth, h1LocalsPopulation);
// export const handle: Handle = sequence(h0Auth, hook2CheckPath, hook3UserInfo, hookTest);
