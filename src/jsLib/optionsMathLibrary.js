export function cndf(x) {
  if (x < -5) {
    return 0;
  }
  if (x > 5) {
    return 1;
  }
  // constants
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  // Save the sign of x
  let sign = 1;
  if (x < 0) { sign = -1; }
  x = Math.abs(x) / Math.sqrt(2.0);

  // A&S formula 7.1.26
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

export function cndfInv(p) {
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
  let icndf;

  if ((p < 0) || (p > 1)) {
    icndf = null;
  } else if (p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    icndf = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (p <= p_high) {
    q = p - 0.5;
    r = q * q;
    icndf = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    icndf = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }

  return icndf;
}

export function ndf(x) {
  return 1 / Math.sqrt(2 * Math.PI) * Math.exp(-1 * x * x / 2);
}

export function loss(a, b) {
  return a - b;
}

export function d1(p, x, t, q, r, sigma) {
  return (Math.log(p / x) + t * (r - q + (sigma * sigma) / 2)) / (sigma * Math.sqrt(t));
}

export function d2(p, x, t, q, r, sigma) {
  return (Math.log(p / x) + t * (r - q + (sigma * sigma) / 2)) / (sigma * Math.sqrt(t)) - (sigma * Math.sqrt(t));
}

export function getRangeOfPrices(priceUnderlying, percentInterval, numOfIntervals, initialCost) {
  const rangeOfPrices = [];
  const min = priceUnderlying / Math.pow(1 + (percentInterval / 100), Math.floor(numOfIntervals / 2));
  const max = priceUnderlying * Math.pow(1 + (percentInterval / 100), Math.floor(numOfIntervals / 2));
  for (let i = min; i < max * (1 + (percentInterval / 200)); i *= (1 + (percentInterval / 100))) {
    rangeOfPrices.push([i, initialCost]);
  }
  return rangeOfPrices;
}

// GREEKS
export function delta(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv) {
  if (isCall) {
    return (isLong ? 1 : -1) * Math.exp(-1 * divYield * t) * cndf(d1(priceUnderlying, strike, t, divYield, r, iv));
  }
  if (!isCall) {
    return (isLong ? 1 : -1) * Math.exp(-1 * divYield * t) * (cndf(d1(priceUnderlying, strike, t, divYield, r, iv)) - 1);
  }
}

export function gamma(t, priceUnderlying, strike, isLong, r, divYield, iv) {
  return (isLong ? 1 : -1) * Math.exp(-1 * divYield * t) * ndf(d1(priceUnderlying, strike, t, divYield, r, iv)) / (priceUnderlying * iv * Math.sqrt(t));
}

export function theta(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv) {
  if (isCall) {
    return (isLong ? 1 : -1) * (-(ndf(d1(priceUnderlying, strike, t, divYield, r, iv)) / (2 * Math.sqrt(t)) * priceUnderlying * iv * Math.exp(-1 * divYield * t))
        + (divYield * priceUnderlying * Math.exp(-1 * divYield * t) * cndf(d1(priceUnderlying, strike, t, divYield, r, iv)))
        - (r * strike * Math.exp(-1 * r * t) * ndf(d2(priceUnderlying, strike, t, divYield, r, iv)))
    ) / 365;
  }
  if (!isCall) {
    return (isLong ? 1 : -1) * (-(ndf(d1(priceUnderlying, strike, t, divYield, r, iv)) / (2 * Math.sqrt(t)) * priceUnderlying * iv * Math.exp(-1 * divYield * t))
        - (divYield * priceUnderlying * Math.exp(-1 * divYield * t) * cndf(-1 * d1(priceUnderlying, strike, t, divYield, r, iv)))
        - (r * strike * Math.exp(-1 * r * t) * ndf(-1 * d2(priceUnderlying, strike, t, divYield, r, iv)))
    ) / 365;
  }
}

export function vega(t, priceUnderlying, strike, isLong, r, divYield, iv) {
  return (isLong ? 1 : -1) * priceUnderlying / 100 * Math.exp(-1 * divYield * t) * Math.sqrt(t) * ndf(d1(priceUnderlying, strike, t, divYield, r, iv));
}

export function rho(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv) {
  if (isCall) {
    return (isLong ? 1 : -1) * t / 100 * Math.exp(-1 * r * t) * strike * cndf(d2(priceUnderlying, strike, t, divYield, r, iv));
  }
  if (!isCall) {
    return (isLong ? 1 : -1) * t / -100 * Math.exp(-1 * r * t) * strike * cndf(-1 * d2(priceUnderlying, strike, t, divYield, r, iv));
  }
}

export function calculateGreeks(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv) {
  const greeks = {};
  greeks.delta = delta(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv);
  greeks.gamma = gamma(t, priceUnderlying, strike, isLong, r, divYield, iv);
  greeks.theta = theta(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv);
  greeks.vega = vega(t, priceUnderlying, strike, isLong, r, divYield, iv);
  greeks.rho = rho(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv);
  return greeks;
}

// IV and Price
export function calculateIV(t, pO, priceUnderlying, strike, isCall, r, divYield) {
  const priceOfOption = isCall ? (pO + strike > priceUnderlying || strike > priceUnderlying ? (pO) : ((priceUnderlying+0.001) - strike)) : (strike - pO < priceUnderlying || strike < priceUnderlying ? (pO) : (strike - (priceUnderlying-0.001)));
  let iv = Math.sqrt(Math.PI * 2 / t) * priceOfOption / priceUnderlying;
  if (iv <= 0) {
    return 0.01; // INVALID IV
  }
  let priceOfOptionTheoretical; let
    vega;
  priceOfOptionTheoretical = calculateOptionsPrice(t, priceUnderlying, strike, isCall, true, r, divYield, iv);
  let stopTrying = 0;
  while (loss(priceOfOption, priceOfOptionTheoretical) > 0.000003 || loss(priceOfOption, priceOfOptionTheoretical) < -0.000003) {
    if (Math.abs(loss(priceOfOption, priceOfOptionTheoretical)) > priceOfOption / 10) {
      if (priceOfOption > priceOfOptionTheoretical) {
        iv *= (1.5);
      }
      if (priceOfOption < priceOfOptionTheoretical) {
        iv /= (1.33);
      }
    } else {
      vega = priceUnderlying * Math.exp(-1 * divYield * t) * Math.sqrt(t) * ndf(d1(priceUnderlying, strike, t, divYield, r, iv));
      iv += (loss(priceOfOption, priceOfOptionTheoretical) / vega);
      if(iv < 0.005){
        iv -= (loss(priceOfOption, priceOfOptionTheoretical) / vega);
        break;
      }
    }
    priceOfOptionTheoretical = calculateOptionsPrice(t, priceUnderlying, strike, isCall, true, r, divYield, iv);
    stopTrying++;
    if (stopTrying > 100) {
      //console.log('Iteration Limit Reached')
      break;
    }
  }
  if (iv <= 0.005) {
    //console.log(t,pO,priceUnderlying, strike, isCall, r, divYield)
    return 0.01; // INVALID IV
  }
  //console.log(stopTrying)
  return iv;
}

export function calculateOptionsPrice(t, priceUnderlying, strike, isCall, isLong, r, divYield, iv) {
  let priceOfOptionTheoretical;
  if (isCall) {
    priceOfOptionTheoretical = priceUnderlying * Math.exp(-1 * divYield * t) * cndf(d1(priceUnderlying, strike, t, divYield, r, iv)) - strike * Math.exp(-1 * r * t) * cndf(d2(priceUnderlying, strike, t, divYield, r, iv));
  } else if (!isCall) {
    priceOfOptionTheoretical = -1 * priceUnderlying * Math.exp(-1 * divYield * t) * cndf(-1 * d1(priceUnderlying, strike, t, divYield, r, iv)) + strike * Math.exp(-1 * r * t) * cndf(-1 * d2(priceUnderlying, strike, t, divYield, r, iv));
  }
  if(priceOfOptionTheoretical == 0){
    priceOfOptionTheoretical = 0.01;
  }
  if (!isLong) {
    priceOfOptionTheoretical *= -1;
  }
  return priceOfOptionTheoretical;
}

export function calculateProfitAtExpiry(initialCost, priceUnderlying, strike, isCall, isLong) {
  if (isCall) {
    if (isLong) {
      return Math.max(((-1 * initialCost) + (priceUnderlying - strike)), (-1 * initialCost));
    }
    if (!isLong) {
      return Math.min((initialCost - (priceUnderlying - strike)), initialCost);
    }
  } else if (!isCall) {
    if (isLong) {
      return Math.max(((-1 * initialCost) + (-1 * priceUnderlying + strike)), (-1 * initialCost));
    }
    if (!isLong) {
      return Math.min((initialCost - (-1 * priceUnderlying + strike)), initialCost);
    }
  }
}

export function collateralAnalysis(stratsNamed) {
  const collateral = 0;
  for (const strategy of stratsNamed) {
    // Analysis
    // console.log(strategy);
    if (strategy.price < 0) {
      if (strategy.quantity == 4 || strategy.quantity == 3) {
        return Math.max(strategy.a - strategy.b, strategy.c - strategy.d);
      }
      if (strategy.quantity == 2) {
        return strategy.upper - strategy.lower;
      }
      if (strategy.quantity == 1) {
        if (!strategy.isLong) {
          return Infinity;
        }
      }
    }
    // console.log(collateral);
  }
  return collateral;
}

export function extractStrategies(options) {
  const pureList = [...options];
  const list = [];

  for (const pureEle of pureList) {
    for (let a = 0; a < (pureEle.quantity != undefined ? pureEle.quantity : 1); a++) {
      list.push(pureEle);
    }
  }

  // Spreads
  let searching = true;
  let i = 0; let j = 1; let
    k = 0;
  while (searching) {
    if (list[j] == undefined) {
      searching == false;
      break;
    } else if (list[i].type == undefined && list[i].date == list[j].date && list[i].isCall === list[j].isCall && list[i].isLong != list[j].isLong && list[i].strike != list[j].strike) {
      list.splice(k, 0, {
        isCall: list[i].isCall,
        isLong: (list[i].isCall ? !list[i].isLong : list[i].isLong),
        type: (list[i].isCall ? 'Call Spread' : 'Put Spread'),
        dir: (list[i].isLong ? 'Bear' : 'Bull'),
        upper: list[i].strike,
        lower: list[j].strike,
        date: list[i].date,
        price: (list[i].isLong ? 1 : -1) * list[i].limitPrice + (list[j].isLong ? 1 : -1) * list[j].limitPrice,
        quantity: 2,
      });
      list.splice(i + 1, 1);
      list.splice(j, 1);
      k++;
      i = k;
      j = k + 1;
    } else {
      if (j == list.length - 1) {
        i++;
        j = i;
      }
      j++;
    }
  }

  // Condors, Boxes and Flys
  searching = true;
  i = 0, j = 1, k = 0;
  while (searching) {
    if (list[j] == undefined) {
      searching == false;
      break;
    } else if (list[i].type != list[j].type && list[i].type != undefined && list[j].type != undefined && list[i].type.includes('Spread') && list[i].date == list[j].date && list[i].dir != list[j].dir) {
      if (list[i].lower == list[j].upper && list[i].upper != list[j].lower) {
        // Iron Fly
        list.splice(k, 0, {
          date: list[i].date,
          a: list[i].upper,
          b: list[i].lower,
          c: list[j].upper,
          d: list[j].lower,
          isLong: (list[i].dir == 'Bear' && list[j].dir == 'Bull'),
          dir: ((list[i].dir == 'Bear' && list[j].dir == 'Bull') ? 'Pin' : 'Neu'),
          type: 'Iron Fly',
          price: list[i].price + list[j].price,
          quantity: 3,
        });
        list.splice(i + 1, 1);
        list.splice(j, 1);
        k++;
        i = k;
        j = k + 1;
      } else if (list[i].upper == list[j].upper && list[i].lower == list[j].lower) {
        // Box Spread
        list.splice(k, 0, {
          date: list[i].date,
          upper: list[i].upper,
          lower: list[i].lower,
          isLong: (list[i].dir == 'Bear' && list[j].dir == 'Bull'),
          dir: ((list[i].dir == 'Bear' && list[j].dir == 'Bull') ? 'Pin' : 'Neu'),
          type: 'Box Spread',
          price: list[i].price + list[j].price,
          quantity: 4,
        });
        list.splice(i + 1, 1);
        list.splice(j, 1);
        k++;
        i = k;
        j = k + 1;
      } else if (list[i].lower != list[j].upper && list[i].upper != list[j].lower) {
        // Iron Condor
        list.splice(k, 0, {
          date: list[i].date,
          a: list[i].upper,
          b: list[i].lower > list[j].upper ? list[i].lower : list[j].upper,
          c: list[i].lower < list[j].upper ? list[i].lower : list[j].upper,
          d: list[j].lower,
          isLong: (list[i].dir == 'Bear' && list[j].dir == 'Bull'),
          dir: ((list[i].dir == 'Bear' && list[j].dir == 'Bull') ? 'Pin' : 'Neu'),
          type: 'Iron Condor',
          price: list[i].price + list[j].price,
          quantity: 4,
        });
        list.splice(i + 1, 1);
        list.splice(j, 1);
        k++;
        i = k;
        j = k + 1;
      }
    } else if (list[i].type == list[j].type && list[i].type != undefined && list[i].type.includes('Spread') && list[i].date == list[j].date && list[i].dir != list[j].dir) {
      if (list[i].lower == list[j].upper && list[i].upper != list[j].lower) {
        // Call/Put Fly
        list.splice(k, 0, {
          date: list[i].date,
          a: list[i].upper,
          b: list[i].lower,
          c: list[j].upper,
          d: list[j].lower,
          isLong: (list[i].dir == 'Bear' && list[j].dir == 'Bull'),
          isCall: list[i].isCall,
          dir: ((list[i].dir == 'Bear' && list[j].dir == 'Bull') ? 'Pin' : 'Neu'),
          type: `${list[i].isCall ? 'Call' : 'Put'} Fly`,
          price: list[i].price + list[j].price,
          quantity: 3,
        });
        list.splice(i + 1, 1);
        list.splice(j, 1);
        k++;
        i = k;
        j = k + 1;
      } else if (list[i].lower != list[j].upper && list[i].upper != list[j].lower) {
        // Call/put Condor
        list.splice(k, 0, {
          date: list[i].date,
          a: list[i].upper,
          b: list[i].lower > list[j].upper ? list[i].lower : list[j].upper,
          c: list[i].lower < list[j].upper ? list[i].lower : list[j].upper,
          d: list[j].lower,
          isLong: (list[i].dir == 'Bear' && list[j].dir == 'Bull'),
          isCall: list[i].isCall,
          dir: ((list[i].dir == 'Bear' && list[j].dir == 'Bull') ? 'Pin' : 'Neu'),
          type: `${list[i].isCall ? 'Call' : 'Put'} Condor`,
          price: list[i].price + list[j].price,
          quantity: 4,
        });
        list.splice(i + 1, 1);
        list.splice(j, 1);
        k++;
        i = k;
        j = k + 1;
      }
    } else {
      if (j == list.length - 1) {
        i++;
        j = i;
      }
      j++;
    }
  }

  // Diagonals
  searching = true;
  i = 0, j = 1, k = 0;
  while (searching) {
    if (list[j] == undefined) {
      searching == false;
      break;
    } else if (list[i].type == undefined && list[j].type == undefined && list[i].isCall === list[j].isCall && list[i].isLong != list[j].isLong && list[i].strike != list[j].strike) {
      list.splice(k, 0, {
        isCall: list[i].isCall,
        isLong: list[j].isLong,
        date: list[i].date,
        upper: list[i].strike > list[j].strike ? list[i].strike : list[j].strike,
        lower: list[i].strike < list[j].strike ? list[i].strike : list[j].strike,
        dir: (list[j].isLong ? (list[i].strike > list[j].strike ? 'Bull' : 'Bear') : (list[i].strike > list[j].strike ? 'Bear' : 'Bull')),
        type: `Diagonal ${list[i].isCall ? 'Call' : 'Put'} Spread`,
        price: (list[i].isLong ? 1 : -1) * list[i].limitPrice + (list[j].isLong ? 1 : -1) * list[j].limitPrice,
        quantity: 2,
      });
      list.splice(i + 1, 1);
      list.splice(j, 1);
      k++;
      i = k;
      j = k + 1;
    } else {
      if (j == list.length - 1) {
        i++;
        j = i;
      }
      j++;
    }
  }

  // Calendar
  searching = true;
  i = 0, j = 1, k = 0;
  while (searching) {
    if (list[j] == undefined) {
      searching == false;
      break;
    } else if (list[i].type == undefined && list[j].type == undefined && list[i].date != list[j].date && list[i].strike === list[j].strike && list[i].isCall == list[j].isCall && list[i].isLong != list[j].isLong) {
      list.splice(k, 0, {
        isCall: list[i].isCall,
        isLong: list[j].isLong,
        date: list[i].date,
        strike: list[i].strike,
        dir: (list[j].isLong ? 'Pin' : 'Neu'),
        type: `${list[i].isCall ? 'Call' : 'Put'} Calendar Spread`,
        price: (list[i].isLong ? 1 : -1) * list[i].limitPrice + (list[j].isLong ? 1 : -1) * list[j].limitPrice,
        quantity: 2,
      });
      list.splice(i + 1, 1);
      list.splice(j, 1);
      k++;
      i = k;
      j = k + 1;
    } else {
      if (j == list.length - 1) {
        i++;
        j = i;
      }
      j++;
    }
  }

  // Strangles and Straddles
  searching = true;
  i = 0, j = 1, k = 0;
  while (searching) {
    if (list[j] == undefined) {
      searching == false;
      break;
    } else if (list[i].type == undefined && list[j].type == undefined && list[i].date == list[j].date && list[i].isCall != list[j].isCall && list[i].isLong == list[j].isLong) {
      if (list[i].strike === list[j].strike) {
        // Straddle
        list.splice(k, 0, {
          isLong: list[i].isLong,
          date: list[i].date,
          strike: list[i].strike,
          dir: (list[i].isLong ? 'Neu' : 'Pin'),
          type: 'Straddle',
          price: (list[i].isLong ? 1 : -1) * list[i].limitPrice + (list[j].isLong ? 1 : -1) * list[j].limitPrice,
          quantity: 2,
        });
        list.splice(i + 1, 1);
        list.splice(j, 1);
        k++;
        i = k;
        j = k + 1;
      } else {
        // Strangle
        list.splice(k, 0, {
          isLong: list[i].isLong,
          date: list[i].date,
          upper: list[i].strike,
          lower: list[j].strike,
          dir: (list[i].isLong ? 'Neu' : 'Pin'),
          type: 'Strangle',
          price: (list[i].isLong ? 1 : -1) * list[i].limitPrice + (list[j].isLong ? 1 : -1) * list[j].limitPrice,
          quantity: 2,
        });
        list.splice(i + 1, 1);
        list.splice(j, 1);
        k++;
        i = k;
        j = k + 1;
      }
    } else {
      if (j == list.length - 1) {
        i++;
        j = i;
      }
      j++;
    }
  }

  // Synthetics
  searching = true;
  i = 0, j = 1, k = 0;
  while (searching) {
    if (list[j] == undefined) {
      searching == false;
      break;
    } else if (list[i].type == undefined && list[j].type == undefined && list[i].isCall != list[j].isCall && list[i].isLong != list[j].isLong) {
      list.splice(k, 0, {
        isLong: (list[i].isLong ? list[i].isCall : list[j].isCall),
        date: list[i].date,
        upper: list[i].strike,
        lower: list[j].strike,
        dir: (list[i].isLong ? (list[i].isCall ? 'Bull' : 'Bear') : (list[i].isCall ? 'Bear' : 'Bull')),
        type: 'Synthetic',
        price: (list[i].isLong ? 1 : -1) * list[i].limitPrice + (list[j].isLong ? 1 : -1) * list[j].limitPrice,
        quantity: 2,
      });
      list.splice(i + 1, 1);
      list.splice(j, 1);
      k++;
      i = k;
      j = k + 1;
    } else {
      if (j == list.length - 1) {
        i++;
        j = i;
      }
      j++;
    }
  }

  // 1 Legged Remainers
  searching = true;
  i = 0;
  while (searching) {
    if (list[i] == undefined) {
      searching == false;
      break;
    } else if (list[i].type == undefined) {
      list[i] = {
        type: (list[i].isCall ? 'Call' : 'Put'),
        dir: (list[i].isLong ? (list[i].isCall ? 'Bull' : 'Bear') : (list[i].isCall ? 'Bear' : 'Bull')),
        isCall: list[i].isCall,
        isLong: list[i].isLong,
        date: list[i].date,
        strike: list[i].strike,
        price: (list[i].isLong ? 1 : -1) * list[i].limitPrice,
        quantity: 1,
      };
    }
    i++;
  }

  return list;
}

export function assignmentRiskAnalysis(stockPrice, optionsSelected) {
  const assignmentRisks = [];
  for (const option of optionsSelected) {
    if (!option.isLong) {
      if (option.strike < stockPrice * 0.92 && option.isCall) {
        assignmentRisks.push(option);
      } else if (option.strike > stockPrice * 1.08 && !option.isCall) {
        assignmentRisks.push(option);
      }
    }
  }
  return assignmentRisks;
}

export function nakedLegsAnalysis(optionsSelected) {
  const nakedLegs = [...optionsSelected];

  for (let i = 0; i < nakedLegs.length; i++) {
    const option = nakedLegs[i];
    for (let j = i + 1; j < nakedLegs.length; j++) {
      const otherOption = nakedLegs[j];

      if (((otherOption.date == option.date) || otherOption.isLong) && option.isCall == otherOption.isCall) {
        if (option.isLong ? !otherOption.isLong : otherOption.isLong) {
          nakedLegs.splice(nakedLegs.findIndex((o) => o.date == option.date
            && o.strike == option.strike
            && o.isCall == option.isCall), 1);
          nakedLegs.splice(nakedLegs.findIndex((o) => o.date == otherOption.date
            && o.strike == otherOption.strike
            && o.isCall == otherOption.isCall), 1);
          break;
        }
      }
    }

    for (let i = 0; i < nakedLegs.length; i++) {
      const option = nakedLegs[i];
      if (option.isLong) {
        nakedLegs.splice(nakedLegs.findIndex((o) => o.date == option.date
          && o.strike == option.strike
          && o.isCall == option.isCall), 1);
      }
    }
  }

  return nakedLegs;
}

export function nameStrategy(strategies) {
  const strats = strategies.map((s) => ({ type: s.type, quantity: s.quantity, dir: s.dir }));
  const quantity = strats.reduce((a, b) => a + b.quantity, 0);
  if (strats.length > 1) {
    if (strats.every((strat) => strat.dir === strats[0].dir)) {
      if (strats.every((strat) => strat.type === strats[0].type)) {
        if (strats[0].dir == 'Bull' || strats[0].dir == 'Bear') {
          return `${strats[0].dir}ish ${strats[0].type}s`;
        }
        if (strats[0].dir == 'Neu') {
          return `Long Volatility ${strats[0].type}s`;
        }
        if (strats[0].dir == 'Pin') {
          return `Short Volatility ${strats[0].type}s`;
        }
      } else {
        if (strats[0].dir == 'Bull' || strats[0].dir == 'Bear') {
          return `${strats[0].dir}ish ${quantity} Legged Strategy`;
        }
        if (strats[0].dir == 'Neu') {
          return `Long Volatility ${quantity} Legged Strategy`;
        }
        if (strats[0].dir == 'Pin') {
          return `Short Volatility ${quantity} Legged Strategy`;
        }
      }
    } else {
      return `${quantity} Legged Strategy`;
    }
  } else if (strats.length == 1) {
    if (strats[0].dir == 'Bull' || strats[0].dir == 'Bear') {
      return `${strats[0].dir}ish ${strats[0].type}`;
    }
    if (strats[0].dir == 'Neu') {
      return `Long Volatility ${strats[0].type}`;
    }
    if (strats[0].dir == 'Pin') {
      return `Short Volatility ${strats[0].type}`;
    }
  }
  return 'Cost of Strategy';
}
