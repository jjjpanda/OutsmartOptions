const { mathematique } = require('que-series')
const math = mathematique.options

describe('Options Math Test', () => {
  it('Options Price', () => { 
    //(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)
    expect(math.calculateOptionsPrice(Math.random(), 100, 0, true, true, 0, 0, 0)).toBeCloseTo(100)
    expect(math.calculateOptionsPrice(Math.random(), 100, 0, true, false, 0, 0, 0)).toBeCloseTo(-100)
  })
  it('CNDF Math', () => {
    expect(math.cndf(3)).toBeCloseTo(1);
    expect(math.cndf(1)).toBeCloseTo(0.84);
    expect(math.cndf(0)).toBeCloseTo(0.5);
    expect(math.cndf(-1)).toBeCloseTo(0.16);
    expect(math.cndf(-3)).toBeCloseTo(0);
  });
  it('CNDF Inverse', () => {
    expect(math.cndfInv(0.9)).toBeCloseTo(1.28);
    expect(math.cndfInv(0.5)).toBeCloseTo(0);
    expect(math.cndfInv(0.1)).toBeCloseTo(-1.28);
  });
  it('IV Calculation', () => {
    // math.calculateIV(t, C, P, X, isCall, R, Q)
    expect(math.calculateIV(0.00, 50, 150, 100, true, 0, 0)).toBe(Infinity);
    expect(math.calculateIV(0.25, 50, 150, 100, true, 0, 0)).not.toBe(Infinity);
    expect(math.calculateIV(0.25, 10.01, 105, 100, true, 0, 0)).toBeCloseTo(math.calculateIV(0.25, 10.00, 105, 100, true, 0, 0));
    expect(math.calculateIV(0.25, 4.75, 105, 100, true, 0, 0)).toBeCloseTo(math.calculateIV(0.25, 5, 105, 100, true, 0, 0));
    expect(math.calculateIV(0.25, 4.75, 95, 100, false, 0, 0)).toBeCloseTo(math.calculateIV(0.25, 5, 95, 100, false, 0, 0));
    expect(math.calculateIV(0.25, 5, 100, 100, true, 0, 0)).toBeCloseTo(math.calculateIV(0.25, 5, 100, 100, false, 0, 0));
    expect(math.calculateIV(0.25, 5, 100, 95, true, 0, 0)).toBeCloseTo(math.calculateIV(0.25, 5, 100, 105, false, 0, 0));
    expect(math.calculateIV(0.25, 4, 100, 95, true, 0, 0)).toBeCloseTo(math.calculateIV(0.25, 4, 100, 105, false, 0, 0));
  });
  it('Delta', () => {
    expect(math.delta(0 / 365, 100, 100, true, true, 0, 0, 0.01)).toBe(NaN);
    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0)).toBe(NaN);
    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.01)).toBeCloseTo(0.5);
    expect(math.delta(30 / 365, 100, 100, true, false, 0, 0, 0.01)).toBeCloseTo(-0.5);

    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.05));
    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeGreaterThan(math.delta(30 / 365, 100, 100, true, true, 0, 0.1, 0.01));
    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.delta(30 / 365, 100, 100, true, true, 0.1, 0, 0.01));
    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.delta(30 / 365, 100, 95, true, true, 0, 0, 0.01));
    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeGreaterThan(math.delta(30 / 365, 100, 105, true, true, 0, 0, 0.01));
    expect(math.delta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.delta(60 / 365, 100, 100, true, true, 0, 0, 0.01));
  });
  it('Theta', () => {
    expect(math.theta(0 / 365, 100, 100, true, true, 0, 0, 0.01)).toBe(NaN);
    expect(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0)).toBe(NaN);

    expect(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeGreaterThan(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0.05));
    expect(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.theta(30 / 365, 100, 100, true, true, 0, 0.1, 0.01));
    expect(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.theta(30 / 365, 100, 100, true, true, 0.1, 0, 0.01));
    expect(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.theta(30 / 365, 100, 95, true, true, 0, 0, 0.01));
    expect(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.theta(30 / 365, 100, 105, true, true, 0, 0, 0.01));
    expect(math.theta(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.theta(60 / 365, 100, 100, true, true, 0, 0, 0.01));
  });
  it('Gamma', () => {
    expect(math.gamma(0 / 365, 100, 100, true, 0, 0, 0.01)).toBe(NaN);
    expect(math.gamma(30 / 365, 100, 100, true, 0, 0, 0)).toBe(NaN);

    expect(math.gamma(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.gamma(30 / 365, 100, 100, true, 0, 0, 0.05));
    expect(math.gamma(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.gamma(30 / 365, 100, 100, true, 0, 0.1, 0.01));
    expect(math.gamma(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.gamma(30 / 365, 100, 100, true, 0.1, 0, 0.01));
    expect(math.gamma(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.gamma(30 / 365, 100, 95, true, 0, 0, 0.01));
    expect(math.gamma(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.gamma(30 / 365, 100, 105, true, 0, 0, 0.01));
    expect(math.gamma(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.gamma(60 / 365, 100, 100, true, 0, 0, 0.01));
  });
  it('rho', () => {
    expect(math.rho(0 / 365, 100, 100, true, true, 0, 0, 0.01)).toBe(NaN);
    expect(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0)).toBe(NaN);

    expect(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeGreaterThan(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0.05));
    expect(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeGreaterThan(math.rho(30 / 365, 100, 100, true, true, 0, 0.1, 0.01));
    expect(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.rho(30 / 365, 100, 100, true, true, 0.1, 0, 0.01));
    expect(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.rho(30 / 365, 100, 95, true, true, 0, 0, 0.01));
    expect(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeGreaterThan(math.rho(30 / 365, 100, 105, true, true, 0, 0, 0.01));
    expect(math.rho(30 / 365, 100, 100, true, true, 0, 0, 0.01))
      .toBeLessThan(math.rho(60 / 365, 100, 100, true, true, 0, 0, 0.01));
  });
  it('vega', () => {
    expect(math.vega(0 / 365, 100, 100, true, 0, 0, 0.01)).toBe(NaN);
    expect(math.vega(30 / 365, 100, 100, true, 0, 0, 0)).toBe(NaN);

    expect(math.vega(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.vega(30 / 365, 100, 100, true, 0, 0, 0.05));
    expect(math.vega(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.vega(30 / 365, 100, 100, true, 0, 0.1, 0.01));
    expect(math.vega(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.vega(30 / 365, 100, 100, true, 0.1, 0, 0.01));
    expect(math.vega(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.vega(30 / 365, 100, 95, true, 0, 0, 0.01));
    expect(math.vega(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeGreaterThan(math.vega(30 / 365, 100, 105, true, 0, 0, 0.01));
    expect(math.vega(30 / 365, 100, 100, true, 0, 0, 0.01))
      .toBeLessThan(math.vega(60 / 365, 100, 100, true, 0, 0, 0.01));
  });
});
