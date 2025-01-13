<script lang="ts" module>
  import { type ComponentProps } from 'svelte';
  import CreatePlaylistForm from '$features/my_playlists/components/CreatePlaylistForm.svelte';
  import UpdatePlaylistForm from '$features/my_playlists/components/UpdatePaylilstForm.svelte';
  import DeletePlaylistForm from '$features/my_playlists/components/DeletePlaylistForm.svelte';

  const modalsMap = {
    create_playlist: CreatePlaylistForm,
    update_playlist: UpdatePlaylistForm,
    delete_playlist: DeletePlaylistForm
  } as const;

  type ModalPropsMap = {
    [K in keyof typeof modalsMap]: ComponentProps<(typeof modalsMap)[K]>;
  };

  export type ModalType = {
    [K in keyof ModalPropsMap]: {
      name: K;
      props: ModalPropsMap[K];
    };
  }[keyof ModalPropsMap];
</script>

<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { modalState } from '$lib/modal_config';

  let Modal = $derived(
    modalState?.currentlyOpenModal ? modalsMap[modalState?.currentlyOpenModal?.name] : undefined
  );
</script>

<Dialog.Root
  onOpenChange={(isOpen) => {
    console.log('isOpen', isOpen);
  }}
  bind:open={modalState.isModalOpen}
>
  <Dialog.Content>
    {#if Modal && modalState.currentlyOpenModal}
      <Modal {...modalState.currentlyOpenModal.props} />
    {/if}
  </Dialog.Content>
</Dialog.Root>
