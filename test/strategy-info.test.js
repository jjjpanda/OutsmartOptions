import * as math from '../src/jsLib/optionsMathLibrary.js'

describe('Options Math Test', () => {
    it('Collateral Calculation', () => {
        expect(math.collateralAnalysis([], {limitPrice: 0})).toBe(0);
    });
    it('Identify 1 Legged Strategies', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bull", type: "Long Call"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bear", type: "Long Put"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bear", type: "Short Call"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bull", type: "Short Put"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bull", type: "Long Call", quantity:2}]);
    })
    it('Identify Spreads', () => {
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bear", type: "Call Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 101}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bear", type: "Put Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Put Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread", quantity: 2}]);
    });
    it('Identify Calendars', () => {
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-13", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-13", strike: 100, dir: "Pin", type: "Call Calendar Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-13", strike: 100}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: false, isLong: false, date: "2020-12-13", strike: 100, dir: "Neu", type: "Put Calendar Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-13", strike: 100}, 
                                        {isCall: false, isLong: false, date: "2020-12-13", strike: 100},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: false, isLong: true, date: "2020-12-13", strike: 100, dir: "Pin", type: "Put Calendar Spread", quantity: 2}]);
    })
    it('Identify Call Diagonals', () => {
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-13", strike: 101}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Long Call Diagonal Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: false, date: "2020-12-13", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Long Call Diagonal Spread"}]);       
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-13", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Short Call Diagonal Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: true, date: "2020-12-13", strike: 100}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Short Call Diagonal Spread"}]);       
    
    })
    it('Identify Put Diagonals', () => {
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-13", strike: 101}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: false, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Long Put Diagonal Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: false, date: "2020-12-13", strike: 100}]))
            .toBe([{isCall: false, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Long Put Diagonal Spread"}]);       
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-13", strike: 101}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isCall: false, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Short Put Diagonal Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: true, date: "2020-12-13", strike: 100}]))
            .toBe([{isCall: false, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Short Put Diagonal Spread"}]);       
    
    })
    it('Identify Synthetics', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: false, date: "2020-12-06", strike: 100},
                                        {isCall: false, isLong: false, date: "2020-12-06", strike: 100}]))
            .toBe([{isLong: true, date: "2020-12-06", upper: 101, lower:100, dir: "Bull", type: "Synthetic Long", quantity: 2}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-06", strike: 101}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isLong: false, date: "2020-12-06", upper: 101, lower:100, dir: "Bear", type: "Synthetic Short"}]);
        
    })
    it('Identify Strangles and Straddles', () => {
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isLong: true, date: "2020-12-20", strike: 100, dir: "Neu", type: "Straddle"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toBe([{isLong: false, date: "2020-12-20", upper:101, lower:100, dir: "Pin", type: "Strangle"}]);
        
    })
    it('Identify Condors and Boxes', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 99}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 98}]))
            .toBe([{isLong: true, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Pin", type: "Iron Condor"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 99}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 98}]))
            .toBe([{isLong: false, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Neu", type: "Iron Condor"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 99}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 98}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Pin", type: "Call Condor"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 99}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 98}]))
            .toBe([{isCall: false, isLong: false, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Neu", type: "Put Condor"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toBe([{isLong: true, date: "2020-12-20", upper: 101, lower:100, dir: "Pin", type: "Box Spread"}]);
    
    })
    it('Identify Butterflies', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 98}]))
            .toBe([{isLong: true, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Pin", type: "Iron Fly"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 98}]))
            .toBe([{isLong: false, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Neu", type: "Iron Fly"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100},
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 98}]))
            .toBe([{isCall: true, isLong: true, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Pin", type: "Call Fly"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100},
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 98}]))
            .toBe([{isCall: false, isLong: false, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Neu", type: "Put Fly"}]);
    })
});