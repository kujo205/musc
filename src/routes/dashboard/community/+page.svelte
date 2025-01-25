<script lang="ts">
  import type { PageData } from './$types';
  import PlaylistCard from '$features/community/components/PlaylistCard.svelte';

  interface Props {
    data: PageData;
  }

  const { data }: Props = $props();
</script>

{#each data.playlists as playlist}
  <PlaylistCard
    liked={false}
    id={playlist.id}
    user_name={playlist.user_name}
    name={playlist.name}
    link={playlist.link}
  />
{/each}
