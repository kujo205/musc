<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { loadStripe } from '@stripe/stripe-js';
  import { PUBLIC_STRIPE_KEY } from '$env/static/public';
  import { Loader2 } from 'lucide-svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  onMount(async () => {
    const sessionId = data.sessionId;

    if (sessionId) {
      const stripe = await loadStripe(PUBLIC_STRIPE_KEY);

      await stripe?.redirectToCheckout({
        sessionId
      });
    }
  });
</script>

<p class="flex items-center gap-2">
  <span>Redirecting to pricing page </span>
  <Loader2 size={32} class="animate-spin" />
</p>
