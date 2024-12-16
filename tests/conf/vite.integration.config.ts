/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit(), svelteTesting()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['./vitest-setup.ts'],

    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'json-summary'],
      exclude: ['node_modules', 'tests', 'build/**', '.svelte-kit/**'],
      reportOnFailure: true
    }
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : []
  }
}));
