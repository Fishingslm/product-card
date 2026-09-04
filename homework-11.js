import { Form } from "./Form.js";
import { Modal } from "./Modal.js";

const subscriptionForm = new Form("subscription-form");
const registrationButton = document.querySelector("#open-registration-button");
const registrationModal = new Modal("registration-modal");
const registrationForm = new Form("registration-form");

let user;

// Форма подписки
subscriptionForm.formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const subscription = subscriptionForm.getValues();

  console.log(subscription);
});

// Открытие и закрытие модального окна
registrationButton.addEventListener("click", () => {
  registrationModal.open();
});

// Форма регистрации
registrationForm.formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!registrationForm.isValid()) {
    alert("Регистрация отклонена. Проверьте правильность заполнения полей.");
    return;
  }

  const registrationData = registrationForm.getValues();

  if (registrationData.password !== registrationData.passwordRepeat) {
    alert("Регистрация отклонена. Пароли не совпадают.");
    return;
  }

  user = {
    ...registrationData,
    createdOn: new Date(),
  };

  console.log(user);
  registrationForm.reset();
  registrationModal.close();
});
