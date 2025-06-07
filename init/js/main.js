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

function getRandomPositiveFloat(min, max, numAfterPoint) {
  if (min === max) {
    return min;
  }

  [min, max] = normalizePositiveMinMax(min, max);

  const result = getRandomNum(min, max);

  return +result.toFixed(numAfterPoint);
}

console.log(getRandomPositiveCeil(1, 5));
console.log(getRandomPositiveFloat(1, 5, 3));
