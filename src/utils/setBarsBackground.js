export function setBarsBackground(bars) {
  if (!bars) return "";

  if (bars === 1) return "bg-brand-error";
  if (bars === 2) return "bg-brand-orange";
  if (bars === 3) return "bg-brand-warning";
  if (bars === 4) return "bg-brand-success";
}
