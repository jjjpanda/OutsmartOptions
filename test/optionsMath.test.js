import * as math from '../src/jsLib/optionsMathLibrary.js'

describe('Options Math Test', () => {
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
        expect(math.calculateIV(27/365, 2.52, 149.5, 150, true, 0.0142, 0.0136)).not.toBe(Infinity)//(.16)
        expect(math.calculateIV(27/365, 2.34, 149.5, 149, false, 0.0142, 0.0136)).not.toBe(Infinity)//(.165)
        expect(math.calculateIV(0, 49.5, 149.5, 100, true, 0, 0)).toBe(Infinity)
        //expect(math.calculateIV(.1, 49.5, 149.5, 100, true, 0, 0)).toBeCloseTo(math.calculateIV(.1, 49.49, 149.5, 100, true, 0, 0))
    })
    it('Delta', () => {
        expect(math.delta(0/365, 100, 100, true, true, 0, 0, 0.01)).toBe(NaN)
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0)).toBe(NaN)
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0.01)).toBeCloseTo(0.5)
        expect(math.delta(30/365, 100, 100, true, false, 0, 0, 0.01)).toBeCloseTo(-0.5)
        
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.delta(30/365, 100, 100, true, true, 0, 0, 0.05))
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeGreaterThan(math.delta(30/365, 100, 100, true, true, 0, 0.1, 0.01))
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.delta(30/365, 100, 100, true, true, 0.1, 0, 0.01))
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.delta(30/365, 100, 95, true, true, 0, 0, 0.01))
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeGreaterThan(math.delta(30/365, 100, 105, true, true, 0, 0, 0.01))
        expect(math.delta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.delta(60/365, 100, 100, true, true, 0, 0, 0.01))
    })
    it('Theta', () => {
        expect(math.theta(0/365, 100, 100, true, true, 0, 0, 0.01)).toBe(NaN)
        expect(math.theta(30/365, 100, 100, true, true, 0, 0, 0)).toBe(NaN)
        
        expect(math.theta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeGreaterThan(math.theta(30/365, 100, 100, true, true, 0, 0, 0.05))
        expect(math.theta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.theta(30/365, 100, 100, true, true, 0, 0.1, 0.01))
        expect(math.theta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.theta(30/365, 100, 100, true, true, 0.1, 0, 0.01))
        expect(math.theta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.theta(30/365, 100, 95, true, true, 0, 0, 0.01))
        expect(math.theta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.theta(30/365, 100, 105, true, true, 0, 0, 0.01))
        expect(math.theta(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.theta(60/365, 100, 100, true, true, 0, 0, 0.01))
    })
    it('Gamma', () => {
        expect(math.gamma(0/365, 100, 100, true, 0, 0, 0.01)).toBe(NaN)
        expect(math.gamma(30/365, 100, 100, true, 0, 0, 0)).toBe(NaN)
       
        expect(math.gamma(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.gamma(30/365, 100, 100, true, 0, 0, 0.05))
        expect(math.gamma(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.gamma(30/365, 100, 100, true, 0, 0.1, 0.01))
        expect(math.gamma(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.gamma(30/365, 100, 100, true, 0.1, 0, 0.01))
        expect(math.gamma(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.gamma(30/365, 100, 95, true, 0, 0, 0.01))
        expect(math.gamma(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.gamma(30/365, 100, 105, true, 0, 0, 0.01))
        expect(math.gamma(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.gamma(60/365, 100, 100, true, 0, 0, 0.01))
    })
    it('rho', () => {
        expect(math.rho(0/365, 100, 100, true, true, 0, 0, 0.01)).toBe(NaN)
        expect(math.rho(30/365, 100, 100, true, true, 0, 0, 0)).toBe(NaN)
       
        expect(math.rho(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeGreaterThan(math.rho(30/365, 100, 100, true, true, 0, 0, 0.05))
        expect(math.rho(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeGreaterThan(math.rho(30/365, 100, 100, true, true, 0, 0.1, 0.01))
        expect(math.rho(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.rho(30/365, 100, 100, true, true, 0.1, 0, 0.01))
        expect(math.rho(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.rho(30/365, 100, 95, true, true, 0, 0, 0.01))
        expect(math.rho(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeGreaterThan(math.rho(30/365, 100, 105, true, true, 0, 0, 0.01))
        expect(math.rho(30/365, 100, 100, true, true, 0, 0, 0.01))
        .toBeLessThan(math.rho(60/365, 100, 100, true, true, 0, 0, 0.01))
    
    })
    it('vega', () => {
        expect(math.vega(0/365, 100, 100, true, 0, 0, 0.01)).toBe(NaN)
        expect(math.vega(30/365, 100, 100, true, 0, 0, 0)).toBe(NaN)

        expect(math.vega(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.vega(30/365, 100, 100, true, 0, 0, 0.05))
        expect(math.vega(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.vega(30/365, 100, 100, true, 0, 0.1, 0.01))
        expect(math.vega(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.vega(30/365, 100, 100, true, 0.1, 0, 0.01))
        expect(math.vega(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.vega(30/365, 100, 95, true, 0, 0, 0.01))
        expect(math.vega(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeGreaterThan(math.vega(30/365, 100, 105, true, 0, 0, 0.01))
        expect(math.vega(30/365, 100, 100, true, 0, 0, 0.01))
        .toBeLessThan(math.vega(60/365, 100, 100, true, 0, 0, 0.01))   
    })
});