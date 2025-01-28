<script module lang="ts">
  import type { ComponentType } from 'svelte';

  interface MenuItem {
    label: string;
    onClick?: () => void;
    icon?: ComponentType;
  }

  interface PlaylistCardProps {
    href: string;
    name: string;
    description: string;
    is_auto_updating: boolean;
    is_shared_with_community: boolean;
    updated_at: Date;
    menuButtons: MenuItem[];
  }
</script>

<script lang="ts">
  import * as DropdownMenu from '$comp/ui/dropdown-menu';

  import { buttonVariants } from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';

  import { Badge } from '$comp/ui/badge';
  import { Calendar, EllipsisVertical, MousePointerClick } from 'lucide-svelte';
  import { Button } from '$comp/ui/button';
  import { cn } from '$lib/utils';

  const {
    href,
    name,
    updated_at,
    description,
    menuButtons,
    is_auto_updating,
    is_shared_with_community
  }: PlaylistCardProps = $props();

  function getFormattedDate(date: Date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  }
</script>

<Card.Root data-testid="playlist-card" class="flex h-36 min-w-80 max-w-[520px] overflow-hidden">
  <a {href} class="aspect-square max-w-40 object-contain max-sm:max-w-28" target="_blank">
    <img
      class="aspect-square h-full object-cover"
      alt="Yt Music Liked Song Playlist"
      src="/ytmusic-liked.png"
    />
  </a>
  <div class="flex flex-1 flex-col justify-between gap-6 p-4">
    <div class="flex justify-between">
      <div>
        <h2 class="font-semibold">{name}</h2>
        <p class="text-sm">{description}</p>
      </div>
      {#if menuButtons}
        {@render menuButtonsComp({ items: menuButtons })}
      {/if}
    </div>

    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <div class="flex inline-flex flex-wrap gap-1">
          {#if is_auto_updating}
            <Badge variant="green">Updating</Badge>
          {/if}
          {#if is_shared_with_community}
            <Badge variant="indigo">Public</Badge>
          {/if}
        </div>

        {#if updated_at}
          <span class="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} />
            {getFormattedDate(updated_at)}
          </span>
        {/if}
      </div>
      <Button {href} target="_blank" variant="default" size="sm">
        <MousePointerClick />
        See
      </Button>
    </div>
  </div>
</Card.Root>

{#snippet menuButtonsComp({ items }: { items: MenuItem[] })}
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class={cn(buttonVariants({ variant: 'ghost' }), '!px-2')}>
      <EllipsisVertical />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56" side="top" align="end">
      <DropdownMenu.Group>
        {#each items as i}
          <DropdownMenu.Item class="cursor-pointer" onclick={i.onClick}>
            {#if i.icon}
              <!-- eslint-disable-next-line svelte/valid-compile -->
              <svelte:component this={i.icon} class="!p-2" />
            {/if}

            <span> {i.label}</span>
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
{/snippet}
