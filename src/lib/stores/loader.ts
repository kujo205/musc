import { writable } from 'svelte/store';

export const loaderStore = writable<boolean>(false);
