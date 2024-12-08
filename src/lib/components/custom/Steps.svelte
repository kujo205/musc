<script lang="ts" module>
  import type { Snippet } from 'svelte';

  interface StepsProps {
    children: Snippet;
    className?: string;
  }
</script>

<script lang="ts">
  import { cn } from '$lib/utils';

  const { children, className, ...rest }: StepsProps = $props();
</script>

<div
  class={cn('[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]', className)}
  {...rest}
>
  {@render children()}
</div>
