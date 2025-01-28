<script lang="ts">
  import type { PageData } from './$types';
  import PlaylistCard from '$features/community/components/PlaylistCard.svelte';
  import { trpc } from '$lib/trpc_client';
  import { invalidateAll } from '$app/navigation';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  {#each data.playlists as playlist}
    <PlaylistCard
      onAddToLiked={async () => {
        await trpc.community.likeCommunityPlaylist.mutate({
          playlist_id: playlist.id,
          like: !playlist.liked
        });

        await invalidateAll();
      }}
      likes={playlist.likes}
      liked={playlist.liked}
      id={playlist.id}
      user_name={playlist.user_name}
      name={playlist.name}
      link={playlist.link}
    />
  {/each}
</div>
