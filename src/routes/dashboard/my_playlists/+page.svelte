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

  <CreatePlaylistModal hasEnoughRightForAutoUpdates={data.autoUpdatesEnabled} form={data.form} />

  <div class="mt-8 flex flex-col gap-4 rounded-sm bg-muted p-4 sm:p-8">
    <h2 class="text-lg font-semibold">My exported playlists</h2>

    <section class="grid gap-4 md:grid-cols-2">
      {#each data.playlists as plylist}
        <PlaylistCard
          description={plylist.description || 'No description'}
          href={plylist.link}
          name={plylist?.name || 'Untitled'}
          updated_at={plylist.created_at}
        />
      {/each}
    </section>
  </div>
</div>
