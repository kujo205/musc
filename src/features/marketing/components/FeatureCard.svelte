<script lang="ts" module>
  export interface FeatureCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    title: string;
    description: string;
  }
</script>

<script lang="ts">
  const { icon, title, description }: FeatureCardProps = $props();
</script>

<div class="flex gap-2 p-4">
  <svelte:component this={icon} class="size-9 rounded-full bg-secondary !p-2"></svelte:component>
  <div class="flex flex-col">
    <h2 class="text-xl font-semibold">{title}</h2>
    <p class="text-slate-400">{description}</p>
  </div>
</div>
