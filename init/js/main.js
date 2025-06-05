function normalizeMinMax(min, max) {
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

function getRandomCeil(min, max) {
  if (min === max) {
    return min;
  }

  [min, max] = normalizeMinMax(min, max);

  return Math.round(getRandomNum(min, max));
}

function getRandomFloat(min, max, numAfterPoint) {
  if (min === max) {
    return min;
  }

  [min, max] = normalizeMinMax(min, max);

  const random = getRandomNum(min, max);
  const multiplier = 10 ** numAfterPoint;

  return Math.round(random * multiplier) / multiplier;
}

console.log(getRandomCeil(5, 5));
console.log(getRandomFloat(1, 5, 5));
