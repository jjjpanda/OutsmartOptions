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
        //expect(math.calculateIV(27/365, 2.52, 149.5, 150, true, 0.0142, 0.0136)).toBeCloseTo(.16)
        //expect(math.calculateIV(27/365, 2.34, 149.5, 149, false, 0.0142, 0.0136)).toBeCloseTo(.165)
        //expect(math.calculateIV(0, 49.5, 149.5, 100, true, 0, 0)).toBeCloseTo(Infinity)
        //expect(math.calculateIV(.1, 49.5, 149.5, 100, true, 0, 0)).toBeCloseTo(math.calculateIV(.1, 49.49, 149.5, 100, true, 0, 0))
    })
});