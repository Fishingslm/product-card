export class Modal {
  constructor(modalId) {
    this.modalElement = document.querySelector(`#${modalId}`);
    this.closeButton = this.modalElement.querySelector(".modal__close-button");

    this.listenCloseButton();
  }

  open() {
    this.modalElement.classList.add("modal-showed");
  }

  close() {
    this.modalElement.classList.remove("modal-showed");
  }

  isOpened() {
    return this.modalElement.classList.contains("modal-showed");
  }

  listenCloseButton() {
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
