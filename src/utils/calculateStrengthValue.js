export function calculateStrengthValue(characterLength, selectedOptionsCount) {
  let calculatedStrength = 0;

  if (characterLength > 0) {
    if (characterLength < 6) {
      calculatedStrength += 1;
    } else if (characterLength < 10) {
      calculatedStrength += 2;
    } else {
      calculatedStrength += 3;
    }
  }

  const effectiveOptions = Math.min(selectedOptionsCount, characterLength);

  calculatedStrength += effectiveOptions;

  return calculatedStrength;
}
