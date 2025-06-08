function normalizePositiveMinMax(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);

  if (min > max) {
    [min, max] = [max, min];
  }
  return [min, max];
}

function getNum(min, max) {
  return Math.random() * (max - min) + min;
}

function getPositiveCeil(min, max) {
  if (min === max) {
    return min;
  }

  [min, max] = normalizePositiveMinMax(min, max);

  return Math.round(getNum(min, max));
}

function getCeil(min, max) {
  if (min === max) {
    return min;
  }

  return Math.round(getRandomNum(min, max));
}

function getPositiveFloat(min, max, numAfterPoint) {
  if (min === max) {
    return min;
  }

  [min, max] = normalizePositiveMinMax(min, max);

  const result = getNum(min, max);

  return +result.toFixed(numAfterPoint);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getPositiveCeil(0, i);

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getArrayItem(array) {
  return array[getPositiveCeil(0, array.length - 1)];
}

function getArray(array, from = 0) {
  return shuffleArray(array).slice(0, getPositiveCeil(from, array.length));
}

export default function createRandomUtils() {
  return {
    getNum,
    getPositiveCeil,
    getCeil,
    getPositiveFloat,
    shuffleArray,
    getArrayItem,
    getArray,
  };
}
