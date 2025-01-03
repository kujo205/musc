<script lang="ts" module>
  import { z } from 'zod';
  import { modalState } from '$lib/modal_config';

  export const updatePlaylistSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    share_with_community: z.coerce.boolean(),
    auto_update_playlist: z.coerce.boolean().default(false),
    playlist_id: z.string()
  });

  export type TUpdatePlaylistSchema = z.infer<typeof updatePlaylistSchema>;

  interface Props {
    hasEnoughRightForAutoUpdates?: boolean;
    data: z.infer<typeof updatePlaylistSchema>;
    id: string;
  }
</script>

<script lang="ts">
  import * as Dialog from '$comp/ui/dialog';
  import { Button } from '$lib/components/ui/form';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { copyTextToClipboard } from '$lib/utils';
  import { superForm, defaults } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { invalidateAll } from '$app/navigation';
  import InputField from '$comp/form_fields/InputField.svelte';
  import SwitchField from '$comp/form_fields/SwitchField.svelte';
  import { toast } from 'svelte-sonner';

  const { data, hasEnoughRightForAutoUpdates, id }: Props = $props();

  const form = superForm(defaults(data, zodClient(updatePlaylistSchema)), {
    validators: zodClient(updatePlaylistSchema),
    id,
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        invalidateAll();
      }
    },
    onResult: async (event) => {
      console.log('event', event);
      if (event.result.type === 'success') {
        modalState.close();
        const url = event?.result?.data?.form.message;
        toast.success('Playlist updated successfully', {
          actionButtonStyle: buttonVariants.variants.variant.outline,
          action: {
            label: 'Copy to clipboard',
            onClick: () => copyTextToClipboard(url)
          },
          duration: 7000
        });
      } else {
        toast.error('Error creating playlist', {
          duration: 7000
        });
      }
    }
  });

  let { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action="?/update_playlist">
  <Dialog.Header>
    <Dialog.Title>Update playlist</Dialog.Title>
    <Dialog.Description>Update your playlist with the latest changes</Dialog.Description>
  </Dialog.Header>
  <div class="flex flex-col gap-4">
    <InputField {form} name="name" label="Name (optional)" bind:value={$formData.name} />
    <InputField
      {form}
      name="description"
      label="Description (optional)"
      bind:value={$formData.description}
    />
    <SwitchField
      {form}
      disabled={!hasEnoughRightForAutoUpdates}
      name="auto_update_playlist"
      label={hasEnoughRightForAutoUpdates
        ? 'Auto Update Playlists'
        : 'Update your plan to enable auto updates'}
      bind:checked={$formData.auto_update_playlist}
    />
    <SwitchField
      {form}
      name="share_with_community"
      label="Share with community"
      bind:checked={$formData.share_with_community}
    />
    <input type="hidden" name="playlist_id" value={$formData.playlist_id} />
  </div>
  <Dialog.Footer class="mt-4">
    <Button data-testid="save-changes-button" type="submit">Save changes</Button>
  </Dialog.Footer>
</form>
