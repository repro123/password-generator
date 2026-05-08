export function getStrengthText(value) {
  if (!value) return "";

  let text;

  if (value <= 2) {
    text = "very weak";
  } else if (value <= 4) {
    text = "weak";
  } else if (value <= 6) {
    text = "medium";
  } else {
    text = "strong";
  }

  return text;
}
