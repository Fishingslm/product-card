const subscriptionForm = document.querySelector("#subscription-form");
const registrationButton = document.querySelector("#open-registration-button");
const registrationModal = document.querySelector("#registration-modal");
const closeRegistrationButton = document.querySelector("#close-registration-button");
const registrationForm = document.querySelector("#registration-form");

let user;

// Форма подписки
subscriptionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(subscriptionForm);
  const subscription = Object.fromEntries(formData);

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

  const formData = new FormData(registrationForm);
  const registrationData = Object.fromEntries(formData);

  if (registrationData.password !== registrationData.passwordRepeat) {
    alert("Регистрация отклонена. Пароли не совпадают.");
    return;
  }

  user = {
    ...registrationData,
    createdOn: new Date(),
  };

  console.log(user);
  closeModal();
});
