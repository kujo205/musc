<script lang="ts">
  import '../app.css';
  import Logo from '$comp/ui/logo';
  import ChangeModeIcon from '$comp/custom/ChangeModeIcon.svelte';
  import { Github } from 'lucide-svelte';

  import { ModeWatcher } from 'mode-watcher';
  import { Button } from '$comp/ui/button';

  let { children } = $props();

  const navItems = [{ label: 'Try it!', href: '/#section-pricing' }];
</script>

<svelte:head>
  <title>Musc</title>
  <meta name="description" content="Musc - share and sink your liked Youtube Music with ease" />
</svelte:head>

<ModeWatcher />

<div class="mx-4 md:mx-16">
  {@render header()}

  <main class="mb-24 mt-8">
    {@render children()}
  </main>

  {@render footer()}
</div>

{#snippet header()}
  <header
    class="sticky top-0 flex justify-between border-b-2 bg-background bg-opacity-60 py-3 backdrop-blur-sm"
  >
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

{#snippet footer()}
  <footer class="flex w-full justify-between py-8">
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
