# Outsmart Options Server

**THIS MAY BE INACCURATE. SERVER IS UNDER DEVELOPMENT AND MAY CHANGE. DOCUMENT DRIVEN DEVELOPMENT, YOU KNOW?**

The server starts from [server.js](server.js), which calls 3 main subprocesses: the [routes](#routes-and-endpoints), the [discord bot](#discord-and-roku) and all [daemons](#daemons). All logs go through [appendLogs.js](logs/appendLogs.js) to go into [logs.txt](logs/logs.txt). 

## Routes and Endpoints
 
All routes come from [app.js](app.js). 

### /api/markets/

Here we got all of the market data: stonks, options, treasury yields... You name it.  
Here's your three route files:
[marketData.js](routes/marketData.js),
[earnings.js](routes/earnings.js) and
[treasury.js](routes/treasury.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/quote        |This guy right here gives you the stonk price and stuff.     |`{ body: { ticker: String } }`|`{ price: Double, change: Double, name: String, average_volume: Integer, volume: Integer }`|
|POST|/optionsQuote |This dude here gives you the total options data.              |`{ body: { ticker: String } }`|`{ callOI: Integer, callVol: Integer, callIV: Double, putOI: Integer, putVol: Integer, putIV: Double, pcRatio: Double }`|
|POST|/chain        |This guy? This is the options chain.               |`{ body: { ticker: String } }`|`[ [ "2000-01-01", { strike: Double, callBid: Double, call: Double, callAsk: Double, callOI: Integer, callVol: Integer, callSymbol: String, key: String, putBid: Double, put: Double, putAsk: Double, putOI: Integer, putVol: Integer, putSymbol: String } ]... ]`|
|POST|/iv           |HIV positive. Historical Implied Volatility.       |`{ body: { ticker: String, length: 30 } }`|`[ { date: "2000-01-01", underlying: Double, strike: Double, price: Double, symbol: String, iv: Double }... ]`|
|POST|/historical   |This gets ya some historical data.                 |`{ body: { ticker: String, days: 720 } }`|`[ { date: "2000-01-01", open: Double, high: Double, low: Double, close: Double, volume: Integer }... ]`|
|POST|/guessSymbol  |Send a request here for symbol recommendations.    |`{ body: { text: String } }`|`{ bestMatches: [ { symbol: String, name: String, type: String}... ] }`|
|POST|/dividend     |This gal hands you the dividend data for a stock.  |`{ body: { ticker: String } }`|`{ divRate:Double, divYield: Double, date: "2000-01-01" }`|
|POST|/treasury     |Fed up? Here's the yield curve data for today.     |`{ body: {} }`|`[ { name: String, val: Double }... ]`|
|POST|/earningsDate |Never miss a move. Here's a stocks earnings date.  |`{ body: { ticker: String } }`|`{ earningsDate: "2000-01-01" }`|

### /api/bug/

[bugsAndReports.js](routes/bugsAndReports.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/track         |Uhhhhhh. I should stop talking now.               |`{ body: { ip: String } }`|`{ error: Boolean, details: String }`|
|POST|/report        |Hey look! Here's how you send state data to us.   |`{ body: { options: String } }`|`{ error: Boolean, details: String }`|
|POST|/imageReport   |Oh snap, you can send pictures too. That's crazy. |`{ files: { file: { data : Buffer } } }`|`{ error: Boolean, details: String }`|

### /api/twitter/

[twitter.js](routes/twitter.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/search    |Search for tweets on Twitter.|`{ body: { q: String } }`|`{ tweets: [ TweetObject... ] }`|

### /api/users/

[users.js](routes/users.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/register    |Register an account with us.                           |`{ body: { name: String, email: String, password: String, password2: String } }`|`{ name: String, email: String, date: String }`|
|POST|/login       |Login into the account.                                |`{ body: { email: String, password: String } }`|`{ success: Boolean, id: String, token: String }`|
|POST|/current     |Using cookies and whatnot to get tokens and whatnot.   |`{ header: { authorization: String }, body: { id: String } }`|`{ user: String, email: String }`|
|POST|/change      |Change your password with this.                        |`{ header: { authorization: String }, body: { id: String, oldPassword: String, newPassword: String, newPassword2: String } }`|`{ changed: Boolean }`|
|POST|/delete      |Delete.😢                                              |`{ header: { authorization: String }, body: { id: String } }`|`{ deleted: true }`|

### /api/watchlist/

[watchlist.js](routes/watchlist.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/view    |So you wanna see your watchlist huh?                       |`{ header: { authorization: String }, body: { id: String } }`|`{ list: [ String... ] }`|
|POST|/edit    |So you wanna add or remove something in your watchlist huh?|`{ header: { authorization: String }, body: { id: String, ticker: String } }`|`{ list: [ String... ] }`|

### /api/strategy/

[strategy.js](routes/strategy.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST |/load     |See all your saved strats. |`{ header: { authorization: String }, body: { id: String, ticker: String (default="") } }`|n
|POST |/delete   |Delete a strategy.         |`{ header: { authorization: String }, body: { id: String, ticker: String, strategy: Array of Objects } }`|a
|POST |/save     |Save a strategy.           |`{ header: { authorization: String }, body: { id: String, ticker: String, strategy: Array of Objects } }`|a

### /dev/

[devRoutes.js](routes/devRoutes.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|GET |/jest      |View the [Jest](../test/report/index.html) HTML report file.           |`{ query: {} }`|HTML File|
|GET |/coverage  |View the [Coverage](../coverage/lcov-report/index.html) report HTML.   |`{ query: {} }`|HTML File|
|GET |/lint      |View the [ESLint](./eslint/lintOutput.html) HTML report file.          |`{ query: {} }`|HTML File|
|POST |/logs     |This will send you the [logs.txt](logs/logs.txt).                      |`{ body: { token: String } }`|Text File|

### Webpage Routes

Yes. There is a website.

## Discord and Roku

Yes. What's up?

## Daemons

### The Database
So... yes, there's a database: [database.js](database.js).

### Server Warmer
The warmer sends continous GET requests to *localhost:PORT/* every 5 minutes. Here's the file: [serverWarmer.js](js/serverWarmer.js)