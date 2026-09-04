class CosmeticProduct {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getInfo() {
    return `${this.name}, цена: ${this.price} рублей`;
  }
}

class SkinCareProduct extends CosmeticProduct {
  constructor(name, price, skinType) {
    super(name, price);
    this.skinType = skinType;
  }
}

class GiftSet extends CosmeticProduct {
  constructor(name, price, productsCount) {
    super(name, price);
    this.productsCount = productsCount;
  }
}

const moisturizingMousse = new SkinCareProduct(
  "Увлажняющий мусс",
  2750,
  "нормальная",
);

const giftSet = new GiftSet("Подарочный набор №5", 7520, 4);

console.log(moisturizingMousse);
console.log(moisturizingMousse.getInfo());
console.log(giftSet);
console.log(giftSet.getInfo());
