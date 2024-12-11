<script lang="ts">
  import '../app.css';
  import { type LayoutData } from './$types';
  import Logo from '$comp/ui/logo';
  import ChangeModeIcon from '$comp/custom/ChangeModeIcon.svelte';
  import { Github, LogOut, Menu } from 'lucide-svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import { signOut, signIn } from '@auth/sveltekit/client';
  import { Toaster } from '$lib/components/ui/sonner';

  import { ModeWatcher } from 'mode-watcher';
  import { Button } from '$comp/ui/button';
  import type { Snippet } from 'svelte';
  import * as Sheet from '$comp/ui/sheet';
  import { cn } from '$lib/utils';

  let {
    children,
    data
  }: {
    children: Snippet;
    data: LayoutData;
  } = $props();
</script>

<Toaster richColors={true} />

<svelte:head>
  <title>Musc</title>
  <meta name="description" content="Musc - share and sink your liked Youtube Music with ease" />
</svelte:head>

<ModeWatcher />

{@render header()}
<div class="mx-4 md:mx-16">
  <main class="mb-24 mt-8">
    {@render children()}
  </main>

  {@render footer()}
</div>

{#snippet header()}
  <Sheet.Root>
    <header
      class="sticky top-0 flex justify-between border-b-2 bg-background bg-opacity-60 px-4 py-3 backdrop-blur-sm md:px-16"
    >
      <Logo />
      <div class="max-md:hidden">
        {@render navigation({ className: '' })}
      </div>
      <div class="md:hidden">
        {@render burgerButtonMenu()}
      </div>
    </header>
  </Sheet.Root>
{/snippet}

{#snippet burgerButtonMenu()}
  <Sheet.Trigger class={cn(buttonVariants({ variant: 'ghost' }))}>
    <Menu size={24} />
  </Sheet.Trigger>
  <Sheet.Content side="right">
    {@render navigation({ className: 'flex-col gap-2 items-start' })}
  </Sheet.Content>
{/snippet}

{#snippet navigation({ className = '' })}
  <div class={`flex gap-2 ${className}`}>
    {#if data.authorized}
      <Button variant="ghost" onclick={signOut}><LogOut /></Button>
      <Sheet.Close>
        <Button variant="link" href="/dashboard">Dashboard</Button>
      </Sheet.Close>
    {:else}
      <Sheet.Close>
        <Button variant="link" href="/#section-pricing">Try it!</Button>
      </Sheet.Close>
      <Button
        variant="link"
        onclick={() => signIn('google', { callbackUrl: '/dashboard' })}
        href="/#section-pricing">Login</Button
      >
    {/if}
    <ChangeModeIcon />
    <Button variant="default" href="https://github.com/kujo205/musc" target="_blank">
      <Github size="20" />
      Github
    </Button>
  </div>
{/snippet}

{#snippet footer()}
  <footer class="flex w-full justify-between py-8 max-md:flex-col max-md:items-center">
    <span class="inline-flex items-center justify-center gap-2">
      <Logo />
      <span> by SpaceCrammers </span>
    </span>
    <span>
      Having trouble?
      <Button target="_blank" variant="link" href="mailto:m.krivokhata@gmail.com">Contact us</Button
      >
    </span>
  </footer>
{/snippet}
