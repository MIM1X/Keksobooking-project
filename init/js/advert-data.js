import createRandomUtils from "./random-utils.js";
const Random = createRandomUtils();

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

//author
const getAvatarUrl = (() => {
  const TOTAL_IMAGES = 10;
  let availableNumbers = Array.from({ length: TOTAL_IMAGES }, (_, i) => i + 1);

  // Перемешиваем массив
  availableNumbers = Random.shuffleArray(availableNumbers);
  return () => {
    if (availableNumbers.length === 0) {
      console.warn("Все изображения использованы! Начинаем заново.");
      availableNumbers = Array.from({ length: TOTAL_IMAGES }, (_, i) => i + 1);
      availableNumbers.sort(() => Math.random() - 0.5);
    }

    const imgNum = availableNumbers.pop();
    return `img/avatars/user${imgNum.toString().padStart(2, "0")}.png`;
  };
})();

function createAuthor() {
  return { avatar: getAvatarUrl() };
}

//offer
function createOffer() {
  return {
    title: "Самое выгодное предложение!!!",
    address: "{{location.lat}}, {{location.lng}}",
    price: Random.getPositiveCeil(1000, 10000),
    type: Random.getArrayItem(OFFER_TYPES),
    rooms: Random.getPositiveCeil(1, 6),
    guests: Random.getPositiveCeil(1, 10),
    checkin: Random.getArrayItem(OFFER_TIMES),
    checkout: Random.getArrayItem(OFFER_TIMES),
    features: Random.getArray(OFFER_FEATURES),
    description: "Доллар ипсум ихедиус заза абакеев зе ермундо мимиксобожаемый",
    photos: Random.getArray(OFFER_PHOTOS, 1),
  };
}

//location
function createLocation() {
  return {
    lat: Random.getPositiveFloat(35.65, 35.7, 5), //широта
    lng: Random.getPositiveFloat(139.7, 139.8, 5), //долгота
  };
}

export default function createAdvertData() {
  return {
    createAuthor,
    createOffer,
    createLocation,
  };
}
