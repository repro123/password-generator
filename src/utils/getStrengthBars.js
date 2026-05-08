export function getStrengthBars(value) {
  if (!value) return null;

  let bars;

  if (value <= 2) {
    bars = 1;
  } else if (value <= 4) {
    bars = 2;
  } else if (value <= 6) {
    bars = 3;
  } else {
    bars = 4;
  }

  return bars;
}
