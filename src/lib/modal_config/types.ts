import { type ZodSchema } from 'zod';
import type { SuperValidated, Infer } from 'sveltekit-superforms';

export type TModalNames = 'create_playlist' | 'update_playlist';

export type FormModalCompProps<
  T extends ZodSchema | {} = {},
  Props extends Record<string, unknown> = {}
> = Props & {
  form: SuperValidated<Infer<T>>;
};

export interface ModalItem {
  form?: SuperValidated<{}>;
  name: TModalNames;
  otherProps?: Record<string, unknown>;
}
