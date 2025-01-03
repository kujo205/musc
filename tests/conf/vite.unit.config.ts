/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit(), svelteTesting()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['tests/conf/vitest-setup.unit.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      exclude: ['node_modules', 'tests', 'build/**', '.svelte-kit/**'],
      reportOnFailure: true
    }
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : []
  }
}));
