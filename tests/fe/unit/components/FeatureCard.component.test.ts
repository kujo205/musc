import { render, screen } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import FeatureCard from '$features/marketing/components/FeatureCard.svelte';
import { Music } from 'lucide-svelte';

describe('Testing FeatureCard component', () => {
  test('FeatureCard renders title and description', () => {
    render(FeatureCard, {
      props: {
        icon: Music,
        title: 'Test Title',
        description: 'Test Description'
      }
    });

    const titleElement = screen.getByText('Test Title');
    const descriptionElement = screen.getByText('Test Description');

    expect(titleElement).toBeDefined();
    expect(descriptionElement).toBeDefined();
  });
});
