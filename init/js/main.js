//randomFunc
function normalizePositiveMinMax(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);

  if (min > max) {
    [min, max] = [max, min];
  }
  return [min, max];
}

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomPositiveCeil(min, max) {
  if (min === max) {
    return min;
  }

  [min, max] = normalizePositiveMinMax(min, max);

  return Math.round(getRandomNum(min, max));
}

function getRandomCeil(min, max) {
  if (min === max) {
    return min;
  }

  return Math.round(getRandomNum(min, max));
}

function getRandomPositiveFloat(min, max, numAfterPoint) {
  if (min === max) {
    return min;
  }

  [min, max] = normalizePositiveMinMax(min, max);

  const result = getRandomNum(min, max);

  return +result.toFixed(numAfterPoint);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomPositiveCeil(0, i);

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
  const totalImages = 10;
  let availableNumbers = Array.from({ length: totalImages }, (_, i) => i + 1);

  // Перемешиваем массив
  availableNumbers = shuffleArray(availableNumbers);
  return () => {
    if (availableNumbers.length === 0) {
      console.warn("Все изображения использованы! Начинаем заново.");
      availableNumbers = Array.from({ length: totalImages }, (_, i) => i + 1);
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
function getRandomArrayItem(array) {
  return array[getRandomPositiveCeil(0, array.length - 1)];
}

function getRandomizeArray(array, from = 0) {
  const shuffledArray = shuffleArray(array);
  return shuffledArray.slice(0, getRandomPositiveCeil(from, array.length));
}

function createOffer() {
  return {
    title: "Самое выгодное предложение!!!",
    address: "{{location.lat}}, {{location.lng}}",
    price: getRandomPositiveCeil(1000, 10000),
    type: getRandomArrayItem(OFFER_TYPES),
    rooms: getRandomPositiveCeil(1, 6),
    guests: getRandomPositiveCeil(1, 10),
    checkin: getRandomArrayItem(OFFER_TIMES),
    checkout: getRandomArrayItem(OFFER_TIMES),
    features: getRandomizeArray(OFFER_FEATURES),
    description: "Доллар ипсум ихедиус заза абакеев зе ермундо мимиксобожаемый",
    photos: getRandomizeArray(OFFER_PHOTOS, 1),
  };
}

//location
function createLocation() {
  return {
    lat: getRandomPositiveFloat(35.65, 35.7, 5), //широта
    lng: getRandomPositiveFloat(139.7, 139.8, 5), //долгота
  };
}

function createAdvert() {
  return {
    author: createAuthor(),
    offer: createOffer(),
    location: createLocation(),
  };
}

const ARRAY_OBJECTS = Array.from({ length: 10 }, () => createAdvert());

console.log(ARRAY_OBJECTS);
