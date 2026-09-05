export class Form {
  constructor(formId) {
    this.formElement = document.querySelector(`#${formId}`);
  }

  getValues() {
    const formData = new FormData(this.formElement);

    return Object.fromEntries(formData);
  }

  isValid() {
    return this.formElement.checkValidity();
  }

  reset() {
    this.formElement.reset();
  }
}
