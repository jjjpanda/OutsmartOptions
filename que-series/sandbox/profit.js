import * as prob from '../outliersLibrary.js';

function NormSInv(p) {
  const a1 = -39.6968302866538; const a2 = 220.946098424521; const
    a3 = -275.928510446969;
  const a4 = 138.357751867269; const a5 = -30.6647980661472; const
    a6 = 2.50662827745924;
  const b1 = -54.4760987982241; const b2 = 161.585836858041; const
    b3 = -155.698979859887;
  const b4 = 66.8013118877197; const b5 = -13.2806815528857; const
    c1 = -7.78489400243029E-03;
  const c2 = -0.322396458041136; const c3 = -2.40075827716184; const
    c4 = -2.54973253934373;
  const c5 = 4.37466414146497; const c6 = 2.93816398269878; const
    d1 = 7.78469570904146E-03;
  const d2 = 0.32246712907004; const d3 = 2.445134137143; const
    d4 = 3.75440866190742;
  const p_low = 0.02425; const
    p_high = 1 - p_low;
  let q; let
    r;
  let retVal;

  if ((p < 0) || (p > 1)) {
    alert('NormSInv: Argument out of range.');
    retVal = 0;
  } else if (p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (p <= p_high) {
    q = p - 0.5;
    r = q * q;
    retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }

  return retVal;
}

function monteCarlo(price, move, stdev, pastSampleSize, days, trials, intervals) {
  let max; let
    min;
  let lastMove; let
    prevMove;

  move = new Array(trials).fill(move);
  stdev = new Array(trials).fill(stdev);

  const monteCarloResults = new Array(days);
  const probabilites = new Array(days);
  const averagePrice = new Array(days);
  const stdevPrice = new Array(days);

  monteCarloResults[0] = [];
  for (var j = 0; j < trials; j++) {
    monteCarloResults[0][j] = price;
    probabilites[0] = {};
  }

  averagePrice[0] = price;
  for (let i = 1; i < days; i++) {
    monteCarloResults[i] = [];
    for (var j = 0; j < trials; j++) {
      monteCarloResults[i][j] = (move[j] + NormSInv(Math.random()) * stdev[j]) * monteCarloResults[i - 1][j];
      lastMove = monteCarloResults[i][j] / monteCarloResults[i - 1][j];
      prevMove = move[j];
      move[j] = (prevMove * pastSampleSize + lastMove) / (pastSampleSize + 1);
      stdev[j] = Math.sqrt((Math.pow(stdev[j], 2) * pastSampleSize + (lastMove - move[j]) * (lastMove - prevMove)) / (pastSampleSize + 1));
    }
    pastSampleSize++;

    averagePrice[i] = prob.getMean([...monteCarloResults[i]]);
    stdevPrice[i] = prob.getSD([...monteCarloResults[i]]);

    max = Math.max(...monteCarloResults[i]);
    min = Math.min(...monteCarloResults[i]);

    max -= (max - min) / (2 * intervals);
    min += (max - min) / (2 * intervals);

    probabilites[i] = {};
    for (let k = min; k <= max; k += (max - min) / intervals) {
      probabilites[i][k] = 0;
      for (var j = 0; j < trials; j++) {
        if (monteCarloResults[i][j] > k - (max - min) / (2 * intervals) && monteCarloResults[i][j] < k + (max - min) / (2 * intervals)) {
          probabilites[i][k]++;
        }
      }
      probabilites[i][k] /= trials;
    }
  }

  return {
    monteCarlo: monteCarloResults,
    probabilites,
    averagePrice,
    stdevPrice,
  };
}

console.log(monteCarlo);
