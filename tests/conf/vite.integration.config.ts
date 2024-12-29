/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig(() => ({
  plugins: [sveltekit(), svelteTesting()],
  test: {
    globals: true,
    include: ['tests/integration/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['tests/conf/vitest-setup.integration.ts'],
    poolOptions: {
      threads: {
        singleThread: true
      },
      forks: {
        singleFork: true
      }
    },

    coverage: {
      reporter: ['text', 'json', 'html', 'json-summary'],
      exclude: [
        'node_modules',
        'tests',
        'build/**',
        '.svelte-kit/**',
        'src/lib/components/ui',
        '*.config.*',
        'src/server/db/**',
        'src/server/helpers/**',
        'src/server/errors/**'
      ],
      include: ['src/server/**'],
      reportOnFailure: true
    }
  }
}));
