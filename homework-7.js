function showWeather(city, temperature) {
  console.log(`Сейчас в ${city} температура +${temperature} градуса по Цельсию`)
}

showWeather('Сургуте', '23')


const SPEED_OF_LIGHT = 299792458;

const checkSpeed = (speed) => {
  if (speed > SPEED_OF_LIGHT) {
    console.log('Сверхсветовая скорость');
  } else if (speed < SPEED_OF_LIGHT) {
      console.log('Субсветовая скорость');
    } else {
      console.log('Скорость света');
  }

};

checkSpeed(300000000);
checkSpeed(100000000);
checkSpeed(299792458);


const productName = 'iPhone 18 Pro Max';
const productPrice = 190000;

const buyProduct = (budget) => {
  if (budget >= productPrice) {
    console.log(`${productName} приобретён. Спасибо за покупку!`);
  } else {
    const missingFunds = productPrice - budget;
    console.log(`Вам не хватает ${missingFunds} рублей, пополните баланс`);
  }
};

buyProduct(200000);
buyProduct(150000);


const calculateVoltage = (power, current) => {
  const voltage = power * current;
  console.log(`Ваше напряжение: ${voltage} В`);
};

calculateVoltage(22, 10);


const brend = 'ASUS';
const subcategory = 'Ноутбуки';
const category = 'Электроника';

function displayLocation(brend, subcategory, category) {
  console.log(`Бренд: ${brend}, Подкатегория: ${subcategory}, Категория: ${category}`);
}
displayLocation(brend, subcategory, category);