const OFFER_TYPES = ["palace", "flat", "house", "bungalow", "hotel"];
const OFFER_TIMES = ["12:00", "13:00", "14:00"];
const OFFER_FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];
const OFFER_PHOTOS = [
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
];
const TOTAL_IMAGES = 10;

const TYPES = {
  bungalow: {
    name: "Бунгало",
    price: 0,
  },
  flat: {
    name: "Квартира",
    price: 1000,
  },
  hotel: {
    name: "Отель",
    price: 3000,
  },
  house: {
    name: "Дом",
    price: 5000,
  },
  palace: {
    name: "Дворец",
    price: 10000,
  },
};

export {
  TYPES,
  TOTAL_IMAGES,
  OFFER_PHOTOS,
  OFFER_FEATURES,
  OFFER_TIMES,
  OFFER_TYPES,
};
