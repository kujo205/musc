<script lang="ts" module>
  export interface HeaderProps {
    authorized: boolean;
  }
</script>

<script lang="ts">
  import Logo from '$comp/ui/logo';
  import * as Sheet from '$comp/ui/sheet';
  import { cn } from '$lib/utils';
  import { debounce } from 'remeda';
  import { buttonVariants } from '$comp/ui/button';
  import { navigating } from '$app/stores';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { Github, LogOut, Menu } from 'lucide-svelte';
  import { loaderStore } from '$lib/stores/loader';

  import { Button } from '$comp/ui/button';
  import { ModeWatcher } from 'mode-watcher';

  import ChangeModeIcon from '$comp/custom/ChangeModeIcon.svelte';
  import { onNavigate } from '$app/navigation';
  import { browser } from '$app/environment';

  const { authorized }: HeaderProps = $props();

  let isNavigatingDelayed = $state(false);
  const isNavigatingDelayedDebouncer = debounce((el: boolean) => (isNavigatingDelayed = el), {
    waitMs: 0
  });

  $effect(() => {
    if ($navigating) {
      isNavigatingDelayedDebouncer.call(true);
    } else {
      isNavigatingDelayedDebouncer.cancel();
      isNavigatingDelayed = false;
    }
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<ModeWatcher />

<Sheet.Root>
  <div class="sticky top-0 z-10">
    <header
      class="flex justify-between bg-background bg-opacity-60 px-4 py-3 backdrop-blur-sm md:px-16"
    >
      <Logo />
      <div class="max-md:hidden">
        {@render navigation({ className: '' })}
      </div>
      <div class="md:hidden">
        <Sheet.Trigger class={cn(buttonVariants({ variant: 'ghost' }))}>
          <Menu size={24} />
        </Sheet.Trigger>
        <Sheet.Content>
          {@render navigation({ className: 'flex-col gap-2 items-start' })}
        </Sheet.Content>
      </div>
    </header>
    {#if browser && (isNavigatingDelayed || $loaderStore)}
      <div class="h-1 w-full overflow-hidden bg-primary/50">
        <div class="anim-indeterminate h-full bg-primary transition-[width]"></div>
      </div>
    {:else}
      <div class="h-1 w-full border-t-2 bg-transparent"></div>
    {/if}
  </div>
</Sheet.Root>

{#snippet navigation({ className = '' })}
  <div class={`flex gap-2 ${className}`}>
    {#if authorized}
      <Button variant="ghost" onclick={signOut}><LogOut /></Button>
      <Sheet.Close>
        <Button data-testid="dashboard-button" variant="link" href="/dashboard">Dashboard</Button>
      </Sheet.Close>
    {:else}
      <Sheet.Close>
        <Button variant="link" href="/#section-pricing">Try it!</Button>
      </Sheet.Close>
      <Button
        data-testid="login-button"
        variant="link"
        onclick={() => signIn('google', { callbackUrl: '/dashboard' })}
        href="/#section-pricing">Login</Button
      >
    {/if}
    <ChangeModeIcon />
    <Button
      data-testid="gh-button"
      variant="default"
      href="https://github.com/kujo205/musc"
      target="_blank"
    >
      <Github size="20" />
      Github
    </Button>
  </div>
{/snippet}

<style>
  .anim-indeterminate {
    transform-origin: 0% 50%;
    animation: anim-indeterminate 2s infinite linear;
  }

  @keyframes anim-indeterminate {
    0% {
      transform: translateX(0) scaleX(0);
    }
    40% {
      transform: translateX(0) scaleX(0.4);
    }
    100% {
      transform: translateX(100%) scaleX(0.5);
    }
  }
</style>
