import type { ModalItem } from './types';

class ModalState {
  _isModalOpen = $state(false);
  _currentlyOpenModal = $state<ModalItem>();

  get isModalOpen() {
    return this._isModalOpen;
  }

  get currentlyOpenModal() {
    return this._currentlyOpenModal;
  }

  close = () => {
    this._currentlyOpenModal = undefined;
    this._isModalOpen = false;
  };

  open = (modal: ModalItem) => {
    this._currentlyOpenModal = modal;
    this._isModalOpen = true;
  };
}

export const modalState = new ModalState();
