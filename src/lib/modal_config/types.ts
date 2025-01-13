import { type ZodSchema } from 'zod';
import type { SuperValidated, Infer } from 'sveltekit-superforms';

export type FormModalCompProps<
  T extends ZodSchema | {} = {},
  Props extends Record<string, unknown> = {}
> = Props & {
  form: SuperValidated<Infer<T>>;
};
