<script lang="ts" module>
  import { z } from 'zod';
  import type { FormModalCompProps } from '$lib/modal_config';
  import { modalState } from '$lib/modal_config';

  export const updatePlaylistSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    share_with_community: z.boolean(),
    auto_update_playlist: z.boolean().default(false)
  });

  interface Props extends FormModalCompProps<typeof updatePlaylistSchema> {
    hasEnoughRightForAutoUpdates?: boolean;
  }
</script>

<script lang="ts">
  import * as Dialog from '$comp/ui/dialog';
  import { Button } from '$lib/components/ui/form';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { copyTextToClipboard } from '$lib/utils';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { invalidateAll } from '$app/navigation';
  import InputField from '$comp/form_fields/InputField.svelte';
  import SwitchField from '$comp/form_fields/SwitchField.svelte';
  import { toast } from 'svelte-sonner';

  const { form: f, hasEnoughRightForAutoUpdates }: Props = $props();

  const form = superForm(f, {
    validators: zodClient(updatePlaylistSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        invalidateAll();
      }
    },
    onResult: async (event) => {
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
  </div>
  <Dialog.Footer class="mt-4">
    <Button data-testid="save-changes-button" type="submit">Save changes</Button>
  </Dialog.Footer>
</form>
