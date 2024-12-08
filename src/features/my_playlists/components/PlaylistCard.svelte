<script module lang="ts">
  interface PlaylistCardProps {
    href: string;
    name: string;
    description: string;
    updated_at: Date;
  }
</script>

<script lang="ts">
  import CopyBtn from '$comp/custom/CopyBtn.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Calendar } from 'lucide-svelte';

  const { href, name, updated_at, description }: PlaylistCardProps = $props();

  function getFormattedDate(date: Date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  }
</script>

<Card.Root class="flex max-w-[520px] overflow-hidden">
  <a {href} class="aspect-square max-w-40 object-contain max-sm:max-w-28" target="_blank">
    <img
      class="aspect-square h-full object-cover"
      alt="Yt Music Liked Song Playlist"
      src="/ytmusic-liked.png"
    />
  </a>
  <div class="flex flex-col justify-between gap-6 p-4">
    <div>
      <h2 class="font-semibold">{name}</h2>
      <p class="text-sm">{description}</p>
    </div>

    <div class="flex justify-between">
      <span class="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar size={14} />
        {getFormattedDate(updated_at)}
      </span>
      <CopyBtn tooltipText="Click to copy playlist link to the clipboard" text={href} />
    </div>
  </div>
</Card.Root>
