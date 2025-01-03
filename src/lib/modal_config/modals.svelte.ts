import type { ModalItem } from './types';

class ModalState {
  isModalOpen;
  currentlyOpenModal;

  constructor() {
    this.isModalOpen = $state(false);
    this.currentlyOpenModal = $state<ModalItem>();
  }

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
