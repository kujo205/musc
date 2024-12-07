import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { goto } from '$app/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateSearchParams(newParams: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.keys(newParams).forEach((key) => {
    url.searchParams.set(key, newParams[key]);
  });
  goto(url.toString(), { replaceState: true });
}
