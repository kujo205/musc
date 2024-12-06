<script lang="ts">
  import '../app.css';
  import Logo from '$comp/ui/logo';
  import ChangeModeIcon from '$comp/custom/ChangeModeIcon.svelte';
  import { Github } from 'lucide-svelte';

  import { ModeWatcher } from 'mode-watcher';
  import { Button } from '$comp/ui/button';

  let { children } = $props();

  const navItems = [{ label: 'Try it!', href: '/dashboard' }];
</script>

<svelte:head>
  <title>Musc</title>
  <meta name="description" content="Musc - share and sink your liked Youtube Music with ease" />
</svelte:head>

<ModeWatcher />

<div class="mx-4 md:mx-16">
  {@render header()}

  <main class="my-4">
    {@render children()}
  </main>
</div>

{#snippet header()}
  <header class="sticky top-0 flex justify-between border-b-2 py-3">
    <Logo />

    <div class="flex gap-2">
      <nav>
        {#each navItems as item}
          <Button variant="link" href={item.href}>
            {item.label}
          </Button>
        {/each}
      </nav>
      <Button variant="default" href="https://github.com/kujo205/musc" target="_blank">
        <Github size="20" />
        Github
      </Button>
      <ChangeModeIcon />
    </div>
  </header>
{/snippet}
