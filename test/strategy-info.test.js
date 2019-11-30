import * as math from '../src/jsLib/optionsMathLibrary.js'

describe('Options Math Test', () => {
    
    it('Collateral Calculation', () => {
        expect(math.collateralAnalysis([], {limitPrice: 0})).toBe(0);
    });
    it('Jest Meta Testing', () => {
        expect({a:3, b:2}).toMatchObject({b:2, a:3})
        expect([{a:3, b:2}, {bruh: 2}]).toMatchObject([{b:2, a:3}, {bruh: 2}])
        expect([{a:3, b:2}, {bruh: 2}]).not.toMatchObject([{bruh: 2}, {b:2, a:3}])
    })
    it('Identify 1 Legged Strategies', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bull", type: "Call"}]);

        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: true, date: "2020-12-20", strike: 100, dir: "Bear", type: "Put"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: false, date: "2020-12-20", strike: 100, dir: "Bear", type: "Call"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: false, date: "2020-12-20", strike: 100, dir: "Bull", type: "Put"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bull", type: "Call"},
                            {isCall: true, isLong: true, date: "2020-12-20", strike: 100, dir: "Bull", type: "Call"}]);
    })
    it('Identify Spreads', () => {
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread"}]);

        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: false, date: "2020-12-20", upper: 101, lower: 100, dir: "Bear", type: "Call Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 101}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bear", type: "Put Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: false, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Put Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread"},
                            {isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread"},
                            {isCall: true, isLong: true, date: "2020-12-20", upper: 101, lower: 100, dir: "Bull", type: "Call Spread"}]);
    });
    it('Identify Calendars', () => {
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-13", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-13", strike: 100, dir: "Pin", type: "Call Calendar Spread"}]);

        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-13", strike: 100}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: false, date: "2020-12-13", strike: 100, dir: "Neu", type: "Put Calendar Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-13", strike: 100}, 
                                        {isCall: false, isLong: false, date: "2020-12-13", strike: 100},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: true, date: "2020-12-13", strike: 100, dir: "Pin", type: "Put Calendar Spread"},
                            {isCall: false, isLong: true, date: "2020-12-13", strike: 100, dir: "Pin", type: "Put Calendar Spread"}]);
    })
    it('Identify Call Diagonals', () => {
        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-13", strike: 101}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Diagonal Call Spread"}]);

        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-13", strike: 100},
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 101}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Diagonal Call Spread"}]);       
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-13", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: true, isLong: false, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Diagonal Call Spread"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-13", strike: 100},
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101}]))
            .toMatchObject([{isCall: true, isLong: false, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Diagonal Call Spread"}]);       
    
    })
    it('Identify Put Diagonals', () => {
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-13", strike: 101}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Diagonal Put Spread"}]);

        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-13", strike: 100},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 101}]))
            .toMatchObject([{isCall: false, isLong: true, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Diagonal Put Spread"}]);       
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-13", strike: 101}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isCall: false, isLong: false, date: "2020-12-13", upper:101, lower:100, dir: "Bear", type: "Diagonal Put Spread"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-13", strike: 100},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 101}]))
            .toMatchObject([{isCall: false, isLong: false, date: "2020-12-13", upper:101, lower:100, dir: "Bull", type: "Diagonal Put Spread"}]);       
    
    })
    it('Identify Synthetics', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-06", strike: 101},
                                        {isCall: true, isLong: true, date: "2020-12-06", strike: 101},
                                        {isCall: false, isLong: false, date: "2020-12-13", strike: 100},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isLong: true, date: "2020-12-06", upper: 101, lower:100, dir: "Bull", type: "Synthetic"},
                            {isLong: true, date: "2020-12-06", upper: 101, lower:100, dir: "Bull", type: "Synthetic"}]);

        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-06", strike: 101}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isLong: false, date: "2020-12-06", upper: 101, lower:100, dir: "Bear", type: "Synthetic"}]);
        
    })
    it('Identify Strangles and Straddles', () => {
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isLong: true, date: "2020-12-20", strike: 100, dir: "Neu", type: "Straddle"}]);

        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 101}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isLong: false, date: "2020-12-20", upper:101, lower:100, dir: "Pin", type: "Strangle"}]);
        
    })
    it('Identify Condors and Boxes', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 99}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isLong: true, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Pin", type: "Iron Condor"}]);

        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 99}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isLong: false, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Neu", type: "Iron Condor"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 99}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Pin", type: "Call Condor"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 99}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isCall: false, isLong: false, date: "2020-12-20", a:102, b:101, c:99, d:98, dir: "Neu", type: "Put Condor"}]);
        expect(math.extractStrategies([{isCall: false, isLong: true, date: "2020-12-20", strike: 101}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 101},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100}]))
            .toMatchObject([{isLong: true, date: "2020-12-20", upper: 101, lower:100, dir: "Pin", type: "Box Spread"}]);
    })
    it('Identify Butterflies', () => {
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100},
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 100}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isLong: true, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Pin", type: "Iron Fly"}]);

        expect(math.extractStrategies([{isCall: true, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 100},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isLong: false, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Neu", type: "Iron Fly"}]);
        expect(math.extractStrategies([{isCall: true, isLong: true, date: "2020-12-20", strike: 102}, 
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100},
                                        {isCall: true, isLong: false, date: "2020-12-20", strike: 100}, 
                                        {isCall: true, isLong: true, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isCall: true, isLong: true, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Pin", type: "Call Fly"}]);
        expect(math.extractStrategies([{isCall: false, isLong: false, date: "2020-12-20", strike: 102}, 
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100},
                                        {isCall: false, isLong: true, date: "2020-12-20", strike: 100}, 
                                        {isCall: false, isLong: false, date: "2020-12-20", strike: 98}]))
            .toMatchObject([{isCall: false, isLong: false, date: "2020-12-20", a:102, b:100, c:100, d:98, dir: "Neu", type: "Put Fly"}]);
    })
    it('Misc. Options Strategies', () => {
        expect(math.extractStrategies([{"isLong":true,"isCall":true,"strike":55,"date":"2019-12-20"},
                                        {"isLong":true,"isCall":false,"strike":54,"date":"2019-12-20"},
                                        {"isLong":false,"isCall":true,"strike":53,"date":"2019-12-20"},
                                        {"isLong":false,"isCall":true,"strike":53,"date":"2019-12-20"},
                                        {"isLong":true,"isCall":true,"strike":52.5,"date":"2019-12-20"}]))
            .toMatchObject([
                {date: '2019-12-20', a: 55, b: 53, c: 53, d: 52.5, isLong: true, isCall: true, dir: 'Pin', type: 'Call Fly'},
                {isLong: true, isCall: false, strike: 54, date: '2019-12-20', type: 'Put', dir: 'Bear' }
            ])    
        expect(math.extractStrategies([{"isLong":true,"isCall":true,"strike":76,"date":"2019-12-27"},
                                        {"isLong":false,"isCall":true,"strike":75.5,"date":"2019-12-27"},
                                        {"isLong":false,"isCall":false,"strike":75,"date":"2019-12-27"},
                                        {"isLong":true,"isCall":false,"strike":74.5,"date":"2019-12-27"},
                                        {"isLong":true,"isCall":true,"strike":76,"date":"2019-12-20"}]))
            .toMatchObject([
                {a:76, b:75.5, c:75, d:74.5, date:"2019-12-27", dir:"Pin", isLong:true, type: "Iron Condor"},
                {date: "2019-12-20", dir:"Bull", isCall:true, isLong:true, strike: 76, type: "Call"}
            ])
        expect(math.extractStrategies([{"isLong":true,"isCall":true,"strike":187.5,"date":"2019-12-27"},
                                        {"isLong":true,"isCall":true,"strike":185,"date":"2019-12-27"},
                                        {"isLong":false,"isCall":false,"strike":182.5,"date":"2019-12-27"},
                                        {"isLong":true,"isCall":true,"strike":182.5,"date":"2019-12-27"},
                                        {"isLong":false,"isCall":false,"strike":180,"date":"2019-12-27"},
                                        {"isLong":true,"isCall":false,"strike":177.5,"date":"2019-12-27"}]))
            .toMatchObject([
                {date: "2019-12-27",dir: "Bull",isLong: true,lower: 180,type: "Synthetic",upper: 187.5},
                {date: "2019-12-27",dir: "Bull",isCall: false,isLong: false,lower: 177.5,type: "Put Spread",upper: 182.5},
                {date: "2019-12-27",dir: "Bull",isCall: true,isLong: true,strike: 185,type: "Call"},
                {date: "2019-12-27",dir: "Bull",isCall: true,isLong: true,strike: 182.5,type: "Call"}
            ])
    })
});