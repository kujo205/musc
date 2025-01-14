import { type ModalType } from '$comp/custom/Modal.svelte';

class ModalState {
  _isModalOpen = $state(false);
  _currentlyOpenModal = $state<ModalType>();

  get isModalOpen() {
    return this._isModalOpen;
  }

  set isModalOpen(open) {
    this._isModalOpen = open;
  }

  get currentlyOpenModal() {
    return this._currentlyOpenModal;
  }

  close = () => {
    this._currentlyOpenModal = undefined;
    this._isModalOpen = false;
  };

  open = (modal: ModalType) => {
    this._currentlyOpenModal = modal;
    this._isModalOpen = true;
  };
}

export const modalState = new ModalState();
