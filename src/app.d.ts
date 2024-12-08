import type { Database } from '$db';
import type { TUserWithSession, AuthorizedUserWithSession } from '$server/services/AuthService';
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      info: TUserWithSession;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  type TAuthorizedUserWithSession = AuthorizedUserWithSession;
  type RequiredBy<T, K extends keyof T> = T & { [P in K]-?: T[P] };
  type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
  type NonUndefined<T> = T extends undefined ? never : T;
  type TDatabase = Database;
}

export {};
