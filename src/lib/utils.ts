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

export function getInitials(sentence: string | undefined | null): string {
  if (!sentence) {
    return '';
  }

  return sentence
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

export function daysLeft(targetDate: Date): number {
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}
