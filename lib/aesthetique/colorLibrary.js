export function hexColorFromPercent(percentGain) {
  if (percentGain <= 0) {
    return colorToHex(Math.max(80, 255 + (25 * percentGain)), 0, 0);
  }
  if (percentGain <= 0.5 && percentGain > 0) {
    return colorToHex((255 - 80) / 0.5 * percentGain + 80, 0, 0);
  }
  if (percentGain <= 1 && percentGain > 0.5) {
    return colorToHex(255, 510 * (percentGain - 0.5), 510 * (percentGain - 0.5));
  }
  if (percentGain <= 4 && percentGain > 1) {
    return colorToHex((-255 / 3) * (percentGain - 1) + 255, 255, (-255 / 3) * (percentGain - 1) + 255);
  }
  if (percentGain > 4) {
    return colorToHex(0, Math.max(80, 255 - (25 * percentGain)), 0);
  }
}
function colorToHex(r, g, b) {
  console.log(r, g, b)
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)}, 1)`;
}
