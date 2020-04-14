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

export function hexColorFromPercentA(percentGain){
  if(percentGain >= 0){
    return `rgba(0,155,0,${Math.min(percentGain, 1)*0.61})`;
  }
  else{
    return `rgba(155,0,0,${Math.min(Math.abs(percentGain), 1)*0.61})`;
  }
}

function colorToHex(r, g, b) {
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}
