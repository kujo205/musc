<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import CreatePlaylistForm from '$features/my_playlists/components/CreatePlaylistForm.svelte';
  import UpdatePlaylistForm from '$features/my_playlists/components/UpdatePaylilstForm.svelte';
  import { modalState, type TModalNames } from '$lib/modal_config';
  import { type Component } from 'svelte';

  const modalsMap: Record<TModalNames, Component<never>> = {
    create_playlist: CreatePlaylistForm,
    update_playlist: UpdatePlaylistForm
  };

  let Modal = $derived(
    modalState?.currentlyOpenModal ? modalsMap[modalState?.currentlyOpenModal?.name] : undefined
  );
</script>

<Dialog.Root bind:open={modalState.isModalOpen}>
  <Dialog.Content>
    {#if Modal && modalState.currentlyOpenModal}
      <!-- TODO: fix types -->
      <Modal
        {...modalState.currentlyOpenModal.otherProps}
        form={modalState.currentlyOpenModal.form}
      />
    {/if}
  </Dialog.Content>
</Dialog.Root>
