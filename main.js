import "./comments.js";
import "./product-cards.js";
import "./homework-7.js";
import "./homework-8.js";
import "./homework-9.js";
import "./homework-10.js";
import "./Form.js";
import "./Modal.js";
import "./homework-11.js";
import "./homework-12.js";

// изменение цвета первой карточки по клику на кнопку
const productCard = document.querySelector('.products__item.card');
const changeCardColorButton = document.querySelector('#change-card-color-button');

changeCardColorButton.addEventListener('click', () => {
  productCard.style.backgroundColor = 'red';
});

// изменение цвета всех карточек по клику на кнопку
const allProductCards = document.querySelectorAll('.products__item.card');
const changeAllCardColorButton = document.querySelector('#change-all-cards-color-button');

changeAllCardColorButton.addEventListener('click', () => {
  allProductCards.forEach((card) => card.style.backgroundColor = 'blue');
});

// открыть google в новом окне по клику на кнопку
const openGoogleButton = document.querySelector('#open-google-button');

openGoogleButton.addEventListener('click', openGoogle);

function openGoogle() {
  const answer = confirm('Вы хотите открыть страницу Google.com?');
  if (answer === true) {
    window.open('https://www.google.com');
  } else {
    return;
  }
}

//вывод в консоль лог
const outputLogButton = document.querySelector('#output-console-log');

outputLogButton.addEventListener('click', () => outputConsoleLog('ДЗ №6'))

function outputConsoleLog(message) {
  alert(message);
  console.log(message);
}

//Вывод текста заголовка в консоль при наведении курсора мыши
const title = document.querySelector('.title.page__title');

title.addEventListener('mouseover', () => {
  console.log(title.textContent);
});

//Изменение цвета кнопки при нажатии на нее
const switchColorButton = document.querySelector('#switch-color-button');

switchColorButton.addEventListener('click', () => {
  switchColorButton.classList.toggle('switch-color-button--active');
});
