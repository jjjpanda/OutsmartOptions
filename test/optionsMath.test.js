import * as optionsMath from "../src/jsLib/optionsMathLibrary.js";

describe('Math Test', () => {
    it('Sums Numbers', () => {
        expect(1 + 2).toEqual(3);
        expect(2 + 2).toEqual(4);
    });
    it('Calculates IV', () => {
        expect(optionsMath.calculateIV((1/365), 5, 45, 40, true, 0, 0)).toBeCloseTo(.53);
        expect(optionsMath.calculateIV((1/365), 5, 45, 50, false, 0, 0)).toBeCloseTo(.47);

        expect(optionsMath.calculateIV((1/365), 6.99, 47, 40, true, 0, 0)).toBeCloseTo(.72);
        expect(optionsMath.calculateIV((1/365), 6.99, 47, 54, false, 0, 0)).toBeCloseTo(.72);

        expect(optionsMath.calculateIV((30/365), 0.8, 47, 50, true, 0, 0)).toBeCloseTo(.35);
        expect(optionsMath.calculateIV((30/365), 7.35, 47, 40, true, 0, 0)).toBeCloseTo(.40);
    });
});