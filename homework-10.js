import { products } from "./product-cards.js";

const productCardTemplate = document.querySelector("#product-card-template");
const productsList = document.querySelector(".products__list");

const PROMPT_MESSAGE = "Сколько карточек отобразить? От 1 до 5";

const getCardsCount = () => {
  let input = prompt(PROMPT_MESSAGE);
  let count = +input;

  while (input !== null && (count < 1 || count > 5 || isNaN(count))) {
    input = prompt(PROMPT_MESSAGE);
    count = +input;
  }
  return count;
};

const renderProductCards = (products) => {
  products.forEach((product) => {
    const productClone = productCardTemplate.content.cloneNode(true);
    const imageSrc = `/images/${product.image}.png`;
    const compoundList = productClone.querySelector(".card__compound");
    const price = `${product.price} \u20BD`;

    productClone.querySelector(".card__picture").src = imageSrc;
    productClone.querySelector(".card__picture").alt = product.title;
    productClone.querySelector(".card__category").textContent =
      product.category;
    productClone.querySelector(".card__title").textContent = product.title;
    productClone.querySelector(".card__desc").textContent = product.description;

    product.compoundList.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;

      compoundList.appendChild(listItem);
    });

    productClone.querySelector(".card__price-value").textContent = price;

    productsList.appendChild(productClone);
  });
};

renderProductCards(products.slice(0, getCardsCount()));

const productsWithTitleAndDesc = products.reduce((result, product) => {
  result.push({
    [product.title]: product.description,
  });

  return result;
}, []);

console.log(productsWithTitleAndDesc);