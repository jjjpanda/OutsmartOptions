# Que Series

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
1. [aestheti**que**](###aesthetique)
2. [mathemati**que**](###mathematique)
3. [utili**que**](###utilique)

### Aesthetique

[**color**](./lib/aesthetique/colorLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|hexColorFromPercent|desc|`(Double)`|`String`|

### Mathematique

[**options**](./lib/mathematique/optionsMathLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|cndf||`(x: Double)`|`Double`|
|cndfInv||`(p: Double)`|`Double`|
|ndf||`(x: Double)`|`Double`|
|loss||`(a: Double, b: Double)`|`Double`|
|d1||`(p: Double, x: Double, t: Double, q: Double, r: Double, sigma: Double)`|`Double`|
|d2||`(p: Double, x: Double, t: Double, q: Double, r: Double, sigma: Double)`|`Double`|
|getRangeOfPrices||`(priceUnderlying: Double, percentInterval: Double, numOfIntervals: Integer, initialCost: Double)`|`[ [Double, Double]... ]`|
|delta||`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|gamma||`(t: Double, priceUnderlying: Double, strike: Double, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|theta||`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|vega||`(t: Double, priceUnderlying: Double, strike: Double, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|rho||`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|calculateGreeks||`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`{delta: Double, gamma: Double, theta: Double, vega: Double, rho: Double}`|
|calculateIV||`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, r: Double, divYield: Double)`|`Double`|
|calculateOptionsPrice||`(t: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean, r: Double, divYield: Double, iv: Double)`|`Double`|
|calculateProfitAtExpiry||`(initialCost: Double, priceUnderlying: Double, strike: Double, isCall: Boolean, isLong: Boolean)`|`Double`|
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

### Utilique

[**post**](./lib/utilique/fetchLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|fetchReq||
|fetchReqAuth||
|fileReq||

[**structures**](./lib/utilique/structuresEditingLibrary.js)

|Function|Description|Params|Returns|
|:-|:-:|:-:|:-:|
|mapToObject||
|objectToMap||
|dataURItoBlob||