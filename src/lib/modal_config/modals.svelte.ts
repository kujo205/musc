import type { ModalItem } from './types';

class ModalState {
  isModalOpen = $state(false);
  currentlyOpenModal = $state<ModalItem>();

  close = () => {
    this.currentlyOpenModal = undefined;
    this.isModalOpen = false;
  };

  open = (modal: ModalItem) => {
    this.currentlyOpenModal = modal;
    this.isModalOpen = true;
  };
}

export const modalState = new ModalState();
