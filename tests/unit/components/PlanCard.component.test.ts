import { render, screen } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import PlanCard from '$features/marketing/components/PlanCard.svelte';

describe('Testing PlanCard component', () => {
  test('PricingCard renders name, description, and price', () => {
    render(PlanCard, {
      name: 'Basic Plan',
      description: 'This is a basic plan.',
      price: '$10/month',
      features: ['Feature 1', 'Feature 2'],
      isOutlined: true,
      planCookieValue: 'basic'
    });

    expect(screen.getByText('Basic Plan')).toBeDefined();
    expect(screen.getByText('This is a basic plan.')).toBeDefined();
    expect(screen.getByText('$10/month')).toBeDefined();
    expect(screen.getByText('Feature 1')).toBeDefined();
    expect(screen.getByText('Feature 2')).toBeDefined();
  });
});
