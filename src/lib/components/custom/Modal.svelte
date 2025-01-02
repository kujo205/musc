<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import PlaylistModal from '$features/my_playlists/components/PlaylistModal.svelte';
  import UpdatePlaylistModal from '$features/my_playlists/components/UpdatePaylilstModal.svelte';
  import { modalState, type TModalNames } from '$lib/modal_config';
  import { type Component } from 'svelte';

  $effect(() => {
    console.log(modalState.currentlyOpenModal);
  });

  const modalsMap: Record<TModalNames, Component<never>> = {
    create_playlist: PlaylistModal,
    update_playlist: UpdatePlaylistModal
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
