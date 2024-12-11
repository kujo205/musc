<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  let { children } = $props();
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  const tabs = [
    {
      id: 'my_playlists',
      title: 'My Playlists'
    },
    {
      id: 'account',
      title: 'Account'
    },
    {
      id: 'community',
      title: 'Community'
    }
  ];

  let tab = $derived.by(() => {
    const href = $page.url.href;
    return tabs.find((tab) => href.includes(`/dashboard/${tab.id}`))?.id ?? 'my_playlists';
  });
</script>

<Tabs.Root
  class="mb-8"
  onValueChange={(value) => {
    goto(`/dashboard/${value}`);
  }}
  value={tab}
>
  <Tabs.List class="flex w-fit">
    {#each tabs as tab}
      <Tabs.Trigger class="!px-4" value={tab.id}>{tab.title}</Tabs.Trigger>
    {/each}
  </Tabs.List>
</Tabs.Root>

{@render children()}
