import type { z } from 'zod';
import { AuthenticationError } from '$server/errors/AuthenticationError'; // Adjust the import path as needed

import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export async function protectAuthorizedActionWrapper<T extends z.ZodSchema>(
  params: {
    event: RequestEvent;
    schema: T;
  },
  cb: (p: {
    form: SuperValidated<z.infer<T>>;
    data: SuperValidated<z.infer<T>>['data'];
    userId: string;
  }) => Promise<unknown>
) {
  const { event, schema } = params;

  if (!event.locals.info.user) {
    console.info('[action wrapper]: user not logged in (redirecting)');
    throw new AuthenticationError('User not logged in');
  }

  const form = await superValidate(event, zod(schema));

  if (!form.valid) {
    return fail(400, { form });
  }

  const userId = event.locals.info.user.user_id;

  const data = form.data;

  await cb({ form, data, userId });

  return { form };
}
