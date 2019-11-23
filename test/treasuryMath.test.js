import * as math from '../src/jsLib/treasuryLibrary.js'

var yields = [
    {name: "d:BC_1MONTH", val: 0.30},
    {name: "d:BC_2MONTH", val: 0.60},
    {name: "d:BC_3MONTH", val: 0.90},
    {name: "d:BC_6MONTH", val: 1.80},
    {name: "d:BC_1YEAR", val: 3.60},
    {name: "d:BC_2YEAR", val: 7.20},
    {name: "d:BC_3YEAR", val: 10},
    {name: "d:BC_5YEAR", val: 15},
    {name: "d:BC_7YEAR", val: 21},
    {name: "d:BC_10YEAR", val: 30}
]

describe('Treasury Math Test', () => {
    it('Interpolation', () => {
        expect(math.getClose(5, 100, 0, 10, 0)).toEqual(50);
    });
    it('Month or Year Identification', () => {
        expect(math.getInt('MONTH')).toEqual(30)
        expect(math.getInt('YEAR')).toEqual(365)
        expect(math.getInt('BRUH')).toEqual(1)
    });
    it('Getting Days from Yields', () => {
        expect(math.getDays(yields)).toEqual(
            [
                {name: "d:BC_1MONTH", days: 30, val: 0.30},
                {name: "d:BC_2MONTH", days: 60, val: 0.60},
                {name: "d:BC_3MONTH", days: 90, val: 0.90},
                {name: "d:BC_6MONTH", days: 180, val: 1.80},
                {name: "d:BC_1YEAR", days: 365, val: 3.60},
                {name: "d:BC_2YEAR", days: 730, val: 7.20},
                {name: "d:BC_3YEAR", days: 1095, val: 10},
                {name: "d:BC_5YEAR", days: 1825, val: 15},
                {name: "d:BC_7YEAR", days: 2555, val: 21},
                {name: "d:BC_10YEAR", days: 3650, val: 30}
            ]
        )
    });
    it('Yields', () => {
        expect(math.getRightYield(yields, 10)).toBeCloseTo(0.10)
        expect(math.getRightYield(yields, 20)).toBeCloseTo(0.20)
        expect(math.getRightYield(yields, 45)).toBeCloseTo(0.45)
        expect(math.getRightYield(yields, 60)).toBeCloseTo(0.60)
    });
});