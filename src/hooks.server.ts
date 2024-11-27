import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { hook0Auth } from '$lib/hooks/h0_auth';
// import { hook2CheckPath } from '$server/hooks/h2_check_path';
// import { hook3UserInfo } from '$server/hooks/h3_user_info';

export const handle: Handle = sequence(hook0Auth);
// export const handle: Handle = sequence(h0Auth, hook2CheckPath, hook3UserInfo, hookTest);
