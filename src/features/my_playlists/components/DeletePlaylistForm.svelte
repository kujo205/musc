<script lang="ts" module>
  import { z } from 'zod';
  import { modalState } from '$lib/modal_config';

  export const deletePlaylistSchema = z.object({
    id: z.string().optional()
  });

  interface Props {
    data: Partial<z.infer<typeof deletePlaylistSchema>>;
  }
</script>

<script lang="ts">
  import * as Dialog from '$comp/ui/dialog';
  import { Button } from '$lib/components/ui/form';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { invalidateAll } from '$app/navigation';
  import { toast } from 'svelte-sonner';

  const { data }: Props = $props();

  const form = superForm(defaults(data, zodClient(deletePlaylistSchema)), {
    id: data.id,
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        invalidateAll();
      }
    },
    onResult: async (event) => {
      console.log('event', event);
      if (event.result.type === 'success') {
        modalState.close();
        toast.success('Playlist deleted successfully');
      } else {
        toast.error('Error deleting playlist', {
          duration: 7000
        });
      }
    }
  });

  let { enhance } = form;
</script>

<form method="POST" use:enhance action="?/delete_playlist">
  <input type="hidden" name="id" value={data.id} />
  <Dialog.Header>
    <Dialog.Title>Delete a playlist</Dialog.Title>
    <Dialog.Description
      >Are you sure you want to delete this playlist? (changes are irrevertable)</Dialog.Description
    >
  </Dialog.Header>
  <Dialog.Footer class="mt-4">
    <Button data-testid="save-changes-button" variant="destructive" type="submit">Delete</Button>
  </Dialog.Footer>
</form>
