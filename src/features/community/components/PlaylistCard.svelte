<script module lang="ts">
  interface PlaylistCardProps {
    id: string;
    link: string;
    name: string | null;
    user_name: string | null;
    liked: boolean;
  }
</script>

<script lang="ts">
  import * as Card from '$lib/components/ui/card';

  import { MousePointerClick, UserRound, Heart } from 'lucide-svelte';
  import { Button } from '$comp/ui/button';

  const { id, link, name, user_name }: PlaylistCardProps = $props();
</script>

<Card.Root class="flex h-36 min-w-80 max-w-[520px] overflow-hidden">
  <a href={link} class="aspect-square max-w-40 object-contain max-sm:max-w-28" target="_blank">
    <img
      class="aspect-square h-full object-cover"
      alt="Yt Music Liked Song Playlist"
      src="/ytmusic-liked.png"
    />
  </a>
  <div class="flex flex-1 flex-col justify-between gap-6 p-4">
    <div class="flex justify-between">
      <div>
        {#if name}
          <h2 class="font-semibold">{name}</h2>
        {:else}
          <h2 class="font-semibold">Untitled</h2>
        {/if}
      </div>

      <Button
        class="px-3"
        onclick={() => {
          alert('not implemented');
        }}
        variant="outline"><Heart /></Button
      >
    </div>

    <div class="flex justify-between">
      <span class="flex flex-col items-start gap-1 text-sm text-muted-foreground">
        <span> Added by </span>
        <span class="inline-flex items-center gap-1 font-semibold">
          <UserRound size={14} />
          {#if user_name}
            <span>{user_name}</span>
          {:else}
            <span>Unknown</span>
          {/if}
        </span>
      </span>
      <Button href={link} target="_blank" variant="default" size="sm">
        <MousePointerClick />
        See
      </Button>
    </div>
  </div>
</Card.Root>
