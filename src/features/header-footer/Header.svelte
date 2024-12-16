<script lang="ts" module>
  import * as Sheet from '$comp/ui/sheet';

  export interface HeaderProps {
    authorized: boolean;
  }
</script>

<script lang="ts">
  import Logo from '$comp/ui/logo';
  import { cn } from '$lib/utils';
  import { buttonVariants } from '$comp/ui/button';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { Github, LogOut, Menu } from 'lucide-svelte';

  import { Button } from '$comp/ui/button';
  import { ModeWatcher } from 'mode-watcher';

  import ChangeModeIcon from '$comp/custom/ChangeModeIcon.svelte';

  const { authorized }: HeaderProps = $props();
</script>

<ModeWatcher />

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
