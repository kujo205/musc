<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import { MousePointerClick, Edit, Link } from 'lucide-svelte';
  import PlaylistCard from '$features/my_playlists/components/PlaylistCard.svelte';
  import CreatePlaylistModal from '$features/my_playlists/components/CreatePlaylistModal.svelte';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();

  onMount(() => {
    if (!data.user_has_credentials) {
      toast.info(
        'Please go through a guide and enter Youtube Music credentials to access your playlists',
        {
          duration: 5000
        }
      );
      goto('/dashboard/account');
    }
  });

  const steps = [
    {
      name: 'Click the “Create” button',
      icon: MousePointerClick
    },
    {
      name: 'Customize your playlist',
      icon: Edit
    },
    {
      name: 'Send the link to your friends',
      icon: Link
    }
  ];

  const playlists = [
    {
      href: 'https://example.com/playlist/1',
      name: 'My Favorite Playlist',
      description: 'A collection of my favorite songs.',
      updated_at: new Date()
    },
    {
      href: 'https://example.com/playlist/1',
      name: 'My Favorite Playlist',
      description: 'A collection of my favorite songs.',
      updated_at: new Date()
    },
    {
      href: 'https://example.com/playlist/1',
      name: 'My Favorite Playlist',
      description: 'A collection of my favorite songs.',
      updated_at: new Date()
    }
  ];
</script>

<div>
  <section class="mb-8 flex flex-col gap-4 px-2">
    {#each steps as step}
      <div class="flex items-center gap-2 text-sm">
        <step.icon size={20} />
        {@html step.name}
      </div>
    {/each}
  </section>

  <CreatePlaylistModal />

  <div class="mt-8 flex flex-col gap-4 rounded-sm bg-muted p-4 sm:p-8">
    <h2 class="text-lg font-semibold">My exported playlists</h2>

    <section class=" flex flex-wrap gap-4">
      {#each playlists as plylist}
        <PlaylistCard {...plylist} />
      {/each}
    </section>
  </div>
</div>
