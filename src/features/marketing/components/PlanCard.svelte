<script module lang="ts">
  import type { Snippet } from 'svelte';
  import { signIn } from '@auth/sveltekit/client';

  interface PricingCardProps {
    planCookieValue: 'free' | 'basic';
    name: string;
    description: string;
    price: string;
    features: string[];
    isOutlined?: boolean;
    tagSnippet?: Snippet;
    btnTestId?: string;
  }
</script>

<script lang="ts">
  import { CheckCircleIcon } from 'lucide-svelte';
  import { Button } from '$comp/ui/button';

  const {
    name,
    isOutlined = false,
    description,
    price,
    features,
    tagSnippet,
    planCookieValue = 'free',
    btnTestId
  }: PricingCardProps = $props();

  function signWithGoogle() {
    let callbackUrl = '/dashboard';

    if (planCookieValue === 'basic') {
      callbackUrl = '/checkout';
    }

    signIn('google', { callbackUrl });
  }
</script>

<div
  class={`${isOutlined ? 'border-primary-300 border-2' : ''} flex w-full flex-col space-y-6 rounded-xl p-8 transition-shadow hover:shadow-xl lg:w-4/12`}
>
  <div class={'flex flex-col space-y-2'}>
    <h1 class="flex justify-between">
      {name}

      {#if tagSnippet}
        {@render tagSnippet()}
      {/if}
    </h1>

    <span class={'text-muted-foreground'}>
      {description}
    </span>
  </div>

  <p>
    <span class={'text-4xl font-extrabold'}>{price}</span>
  </p>

  <div>
    <ul class={'flex flex-col space-y-4'}>
      {#each features as feature}
        <li class={'flex items-center space-x-3'}>
          <div>
            <CheckCircleIcon class={'h-6'} />
          </div>

          <span class={'text-sm font-medium'}> {feature} </span>
        </li>
      {/each}
    </ul>
  </div>

  <Button data-testid={btnTestId} onclick={signWithGoogle}>Select Plan</Button>
</div>
