const subscriptionForm = document.querySelector("#subscription-form");
const subscriptionEmailInput = document.querySelector("#subscription-email");
const registrationButton = document.querySelector("#open-registration-button");
const registrationModal = document.querySelector("#registration-modal");
const closeRegistrationButton = document.querySelector("#close-registration-button");
const registrationForm = document.querySelector("#registration-form");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const birthDateInput = document.querySelector("#birth-date");
const loginInput = document.querySelector("#login");
const passwordInput = document.querySelector("#password");
const passwordRepeatInput = document.querySelector("#password-repeat");

let user;

// Форма подписки
subscriptionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const subscription = {
    email: subscriptionEmailInput.value,
  };

  console.log(subscription);
});

// Открытие и закрытие модального окна
const openModal = () => {
  registrationModal.classList.add("modal-showed");
};

const closeModal = () => {
  registrationModal.classList.remove("modal-showed");
};

registrationButton.addEventListener("click", openModal);
closeRegistrationButton.addEventListener("click", closeModal);

// Форма регистрации
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!registrationForm.checkValidity()) {
    alert("Регистрация отклонена. Проверьте правильность заполнения полей.");
    return;
  }

  if (passwordInput.value !== passwordRepeatInput.value) {
    alert("Регистрация отклонена. Пароли не совпадают.");
    return;
  }

  user = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    birthDate: birthDateInput.value,
    login: loginInput.value,
    password: passwordInput.value,
    passwordRepeat: passwordRepeatInput.value,
    createdOn: new Date(),
  };

  console.log(user);
  closeModal();
});
