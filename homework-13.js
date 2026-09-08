class Drink {
  #temperature;

  constructor(name, size, price, temperature) {
    if (new.target === Drink) {
      throw new Error("Создайте конкретный напиток: Coffee, Tea или Lemonade.");
    }

    this.name = name;
    this.size = size;
    this.price = price;
    this.setTemperature(temperature);
  }

  getInfo() {
    return `${this.name}, ${this.size} мл, ${this.price} руб.`;
  }

  getTemperature() {
    return this.#temperature;
  }

  setTemperature(temperature) {
    if (!Number.isFinite(temperature) || temperature < 0 || temperature > 100) {
      throw new Error("Температура должна быть числом от 0 до 100 °C.");
    }

    this.#temperature = temperature;
  }

  #prepare(temperature) {
    console.log(`Готовим напиток: ${this.name}.`);
    this.setTemperature(temperature);
    console.log(`Температура после приготовления: ${this.getTemperature()} °C.`);
  }

  serve(temperature) {
    this.#prepare(temperature);
    console.log(`Подаём: ${this.getInfo()} Температура: ${this.getTemperature()} °C.`);
  }
}

class Coffee extends Drink {
  constructor(name, size, price, temperature, beans, milk) {
    super(name, size, price, temperature);
    this.beans = beans;
    this.milk = milk;
  }

  getInfo() {
    return `${super.getInfo()} Зёрна: ${this.beans}, молоко: ${this.milk}.`;
  }

  serve() {
    console.log(`Для кофе используем зёрна ${this.beans} и молоко ${this.milk}.`);
    super.serve(65);
  }
}

class Tea extends Drink {
  constructor(name, size, price, temperature, teaType) {
    super(name, size, price, temperature);
    this.teaType = teaType;
  }

  getInfo() {
    return `${super.getInfo()} Вид чая: ${this.teaType}.`;
  }

  serve() {
    console.log(`Завариваем чай: ${this.teaType}.`);
    super.serve(75);
  }
}

class Lemonade extends Drink {
  constructor(name, size, price, temperature, fruit) {
    super(name, size, price, temperature);
    this.fruit = fruit;
  }

  getInfo() {
    return `${super.getInfo()} Фрукт: ${this.fruit}.`;
  }

  serve() {
    console.log(`Смешиваем лимонад с фруктом ${this.fruit}, добавляем лёд.`);
    super.serve(5);
  }
}

class Cafe {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  getInfo() {
    return `Кафе «${this.name}». Адрес: ${this.location}.`;
  }

  orderDrink(drink) {
    console.log(`Принят заказ: ${drink.getInfo()}`);
    drink.serve();
  }
}

const cafe = new Cafe("Эмират", "улица Дубайская, 1");
const coffee = new Coffee("Латте", 300, 250, 20, "арабика", "овсяное");
const tea = new Tea("Чай с жасмином", 400, 180, 20, "зелёный");
const lemonade = new Lemonade("Лимонад", 500, 220, 20, "лимон");

console.log(cafe.getInfo());
console.log(`До заказа температура кофе: ${coffee.getTemperature()} °C.`);
cafe.orderDrink(coffee);
cafe.orderDrink(tea);
cafe.orderDrink(lemonade);
console.log(`После заказа температура кофе: ${coffee.getTemperature()} °C.`);
