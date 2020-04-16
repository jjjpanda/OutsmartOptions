# Que Series

**THIS MAY BE INACCURATE. QUE SERIES IS UNDER DEVELOPMENT AND MAY CHANGE. DOCUMENT DRIVEN DEVELOPMENT, YOU KNOW?**

eek que eek que

## Installation

So, this is a local package. Add this to the parent's package.json

```
"dependencies": {
    "bruh": "^1.0.0",
    ...
    ...
    ...
    "que-series": "file:./que-series",
    ...
    ...
    ...
    "uhhh": "^1.0.0"
}
```
and run `npm install` 

That'll also build the packages inside for usage.

## Usage

### React
```javascript
import { aesthetique, mathematique, utilique } from 'que-series'

let u = mathematique.options.cndf(0)
console.log(u) //Prints 0.5
```

### NodeJS
```javascript
const { aesthetique, mathematique, utilique } = require("que-series")

let u = mathematique.options.cndf(0)
console.log(u) //Prints 0.5
```

## The Stuff

So there's
1. [aestheti**que**](#aesthetique)
2. [mathemati**que**](#mathematique)
3. [utili**que**](#utilique)

### Aesthetique

[**color**](./lib/aesthetique/colorLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|hexColorFromPercent|Get rgb color string from percentage|`(Double)`|`String`|

### Mathematique

[**options**](./lib/mathematique/optionsMathLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|cndf|This is the cumulative normal dist function.|`(x: Double)`|`Double`|
|cndfInv|This is the inverse of the cndf.|`(p: Double)`|`Double`|
|ndf|This is the normal dist function.|`(x: Double)`|`Double`|
|loss|This is the difference between the two inputs.|`(a: Double, b: Double)`|`Double`|
|d1|Gets the d1 value in the Black Scholes formula|`(p: Double, x: Double, t: Double, q: Double, r: Double, sigma: Double)`|`Double`|
|d2|Gets the d2 value in the Black Scholes formula|`(p: Double, x: Double, t: Double, q: Double, r: Double, sigma: Double)`|`Double`|
|getRangeOfPrices|Returns an array of prices for calculating profits|`(priceUnderlying: Double, percentInterval: Double, numOfIntervals: Integer, initialCost: Double)`|`[ [Double, Double]... ]`|
|delta|Gets the delta of an option|`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|gamma|Gets the gamma of an option|`(t: Double, priceUnderlying: Double, strike: Double, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|theta|Gets the theta of an option|`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|vega|Gets the vega of an option|`(t: Double, priceUnderlying: Double, strike: Double, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|rho|Gets the rho of an option|`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|calculateGreeks|Gets the greeks of an option|`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`{delta: Double, gamma: Double, theta: Double, vega: Double, rho: Double}`|
|calculateIV|Calculate iv of an option|`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, r: Double, divYield: Double)`|`Double`|
|calculateOptionsPrice|Calculate options price with Black Scholes|`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|calculateProfitAtExpiry|Calculate options price at expiry|`(initialCost: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean)`|`Double`|
|collateralAnalysis||
|extractStrategies||
|assignmentRiskAnalysis||
|nakedLegsAnalysis||
|nameStrategy||


[**stats**](./lib/mathematique/outliersLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|getMean||
|getSD||
|getPDF||
|getPDFLaplace||
|setDistribution||
|isOutlier||

[**treasury**](./lib/mathematique/treasuryLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|getInt||
|getClose||
|getDays||
|getRightYield||

[**volatiltiy**](./lib/mathematique/volatilityLibrary.js)
|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|findSpikes|Finds volatility spikes in dataset as z-score outliers|`(dataset: [ JSON, JSON... ], mean: Double, std: Double)`| `[ JSON, JSON... ]`|
|filterSpikes|Consolidates volatility spikes of consecutive dates into single spike|`(dataset: [ JSON, JSON... ],spikes: [ JSON, JSON... ]`| `[ JSON, JSON... ]`|
|findTrough|Finds trough after volatility spike|`(dates:[ JSON, JSON... ], allSpikes: [ JSON, JSON... ])`| `JSON`)|

### Utilique

[**request**](./lib/utilique/fetchLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|getFetchReq||
|postFetchReq||
|postFetchReqAuth||
|fileReq||

[**structures**](./lib/utilique/structuresEditingLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|mapToObject||
|objectToMap||
|dataURItoBlob||