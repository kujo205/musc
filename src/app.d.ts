import type { Database } from '$db';
import type { TUserWithSession } from '$server/services/AuthService';
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: TUserWithSession | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
  type TDatabase = Database;
}

export {};
