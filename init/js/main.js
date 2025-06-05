function normalizeMinMax(min, max) {
  if (min === max) {
    return min;
  }

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
  [min, max] = normalizeMinMax(min, max);

  return Math.round(getRandomNum(min, max));
}

function getRandomFloat(min, max, numAfterPoint) {
  [min, max] = normalizeMinMax(min, max);

  const random = getRandomNum(min, max);
  const multiplier = 10 ** numAfterPoint;

  return Math.round(random * multiplier) / multiplier;
}

console.log(getRandomCeil(5, 1));
console.log(getRandomFloat(1, 5, 5));
