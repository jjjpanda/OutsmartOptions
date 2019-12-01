export function getMean(dist) {
// returns mean of set
  let sum = 0;

  for (const v of dist) {
    sum += v;
  }

  return (sum / dist.length);
}

export function getSD(dist, mean) {
// returns standard devitation given set

  let sum = 0;

  for (const v of dist) {
    sum += Math.pow(v - mean, 2);
  }

  if (sum <= 0) {
    // console.log("Error: SD <= 0");
    return 0;
  }

  return Math.sqrt(sum / (dist.length));
}

export function getPDF(x, mean, std) {
// returns PDF of a random variable given distribution info (mean and standard deviation)
// Assume Normal Distribution

  const variance = std * std;
  const m = std * Math.sqrt(2 * Math.PI);
  const e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  return e / m;
}

export function getPDFLaplace(x, mean, std) {
// returns PDF of a random variable given distribution info (mean and standard deviation)
// Assumes LAPLACE distribution

  const b = std / (Math.sqrt(2));
  const e = Math.exp(-Math.abs(x - mean) / b);
  return (e * (1 / (2 * b)));
}

export function setDistribution(strikes, vols) {
// creates a distribution based on the volume for each strike price.
  const data = [];
  for (let i = 0; i < strikes.length; i++) {
    for (let j = 0; j < vols[i]; j++) {
      data.push(strikes[i]);
    }
  }

  return data;
}

export function isOutlier(volume, sum, strike, mean, std) {
  if (volume / sum > getPDFLaplace(strike, mean, std) * 3) {
    return true;
  }

  return false;
}
