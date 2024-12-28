<script lang="ts" module>
  import { type SuperValidated, type Infer } from 'sveltekit-superforms';
  import { createPlaylistSchema, type TCreatePlaylistSchema } from '$features/my_playlists/schemas';

  interface Props {
    form: SuperValidated<Infer<TCreatePlaylistSchema>>;
    expiresAt?: Date | null;
    hasEnoughRightForAutoUpdates?: boolean;
  }
</script>

<script lang="ts">
  import { Button } from '$lib/components/ui/form';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog';

  import { copyTextToClipboard } from '$lib/utils';
  import { cn } from '$lib/utils';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { invalidateAll } from '$app/navigation';
  import InputField from '$comp/form_fields/InputField.svelte';
  import SwitchField from '$comp/form_fields/SwitchField.svelte';
  import { toast } from 'svelte-sonner';

  const { form: f, hasEnoughRightForAutoUpdates }: Props = $props();
  let open = $state(false);

  const form = superForm(f, {
    validators: zodClient(createPlaylistSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        invalidateAll();
      }
    },
    onResult: async (event) => {
      if (event.result.type === 'success') {
        open = false;
        const url = event?.result?.data?.form.message;
        toast.success('Playlist created successfully', {
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
      console.log('result', event.result);
    }
  });

  let { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger
    data-testid="create-playlist-button"
    class={cn(buttonVariants({ variant: 'default' }), 'ml-2')}>Create</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <form method="POST" use:enhance action="?/create_playlist">
      <Dialog.Header>
        <Dialog.Title>Create playlist</Dialog.Title>
        <Dialog.Description>
          Create new playlist of your favorite songs. Give it a name and description.
        </Dialog.Description>
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
  </Dialog.Content>
</Dialog.Root>
