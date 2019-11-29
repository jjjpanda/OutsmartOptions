import * as math from '../src/jsLib/optionsMathLibrary.js'

describe('Options Math Test', () => {
    it('Collateral Calculation', () => {
        expect(math.collateralAnalysis([], {limitPrice: 0})).toBe(0);
    });
    it('Identify 1 Legged Strategies', () => {
    
    })
    it('Identify Spreads', () => {
        
    });
    it('Identify Diagonals and Calendars', () => {
    
    })
    it('Identify Synthetics', () => {
    
    })
    it('Identify Strangles and Straddles', () => {
    
    })
    it('Identify Condors and Boxes', () => {
    
    })
    it('Identify Butterflies', () => {
    
    })
    it('Identify ', () => {
    
    })
});