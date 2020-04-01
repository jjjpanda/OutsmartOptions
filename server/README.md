# Outsmart Options Server

The server starts from [server.js](server.js), 
which calls 3 main subprocesses: 
1. **[The Routes and Endpoints](#routes-and-endpoints)**
    - [Static Endpoints](#public-static-files-and-directories)
    - [API Endpoints](#apimarkets)
        - [/api/markets/](#apimarkets)
        - [/api/bug/](#apibug)
        - [/api/twitter/](#apitwitter)
        - [/api/users/](#apiusers)
        - [/api/watchlist/](#apiwatchlist)
        - [/api/strategy/](#apistrategy)
    - [Dev Endpoints](#dev/)
2. **[The Discord Bot](#discord-and-roku)**
3. **[The Daemons](#daemons)**
    - [The MongoDB Database](#the-database)
        - [Users](#the-database)
        - [Watchlist](#the-database)
        - [Strategy](#the-database)
        - [Earnings](#the-database)
        - [Option](#the-database)
    - [Earnings Calendar Daemon](#earnings-calendar)
    - [The Server Warmer](#server-warmer)

All logs go through [appendLogs.js](logs/appendLogs.js) to go into [logs.txt](logs/logs.txt). 

## Routes and Endpoints
 
All routes come from [app.js](app.js). 

The server uses ExpressJS middleware to set up all the routes.

There are 3 types of routes: static file endpoints, dev endpoints and API endpoints.
Static and dev endpoints are simple serves of files or directories. 
But API calls are bit more complex.
The structure for all API calls require up to a 3 step process before they send any response:

|Step|Title|Description|Error Response|
|:-|:-:|:-:|:-:|
|1|Request Validation|Making sure the inputs are valid.|Unauthorized or `{ error: true, details: "Validation Error from [function] in [file]" }`
|2|Data Stream Buffer|Making sure the data that the server requests from other API's is formatted and converted correctly.|`{ error: true, details: "Data Formatting Error from [function] in [file]" }`
|3|Calculations and Verification|Doing any math on the data that we need to and checking everything is ok.|`{ error: true, details: "Calculation/Verification Error from [function] in [file]" }`

### Public Static Files and Directories

Currently [app.js](app.js) lists out all of the static file endpoints starting from "/", for example: "/calc", "/login" and "/watch".
These all serve the same static [HTML file from dist](../dist/app.html). 

The app also serves full directories from ["/css"](../src/css) and ["/img"](../src/img).

### /api/markets/

Here we got all of the market data: stonks, options, treasury yields... You name it.  
Here's your route file: [market.js](routes/market.js).

1. Request Validation Files
    - [validateBody.js](routes/validation/validateBody.js)
    - [marketDataRequestValidation.js](routes/validation/marketDataRequestValidation.js)
2. Data Stream Buffers
    - [prepareAnswer.js](routes/buffer/prepareAnswer.js)
    - [tradierBuffer.js](routes/buffer/tradierBuffer.js)
    - [yFinanceBuffer.js](routes/buffer/yFinanceBuffer.js)
    - [treasuryBuffer.js](routes/buffer/treasuryBuffer.js)
3. Calculations and Verification
    - [optionsCalculation.js](routes/calculation/optionsCalculation.js)
    - [noCheckSend.js](routes/calculation/noCheckSend.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/quote        |This guy right here gives you the stonk price and stuff.     |`{ body: { ticker: String } }`|`{ quote: { found: Boolean, price: Double, change: Double, name: String, average_volume: Integer, volume: Integer, divRate: Double, divYield: Double, divDate: "2000-01-01", earningsDate: "2000-01-01" } }`|
|POST|/optionsQuote |This dude here gives you the total options data.              |`{ body: { ticker: String } }`|`{ optionsQuote: { callOI: Integer, callVol: Integer, callIV: Double, callIVArray: [ ["2000-01-01", Double]... ], putOI: Integer, putVol: Integer, putIV: Double, putIVArray: [ ["2000-01-01", Double]... ], pcRatioOI: Double, pcRatioVol: Double } }`|
|POST|/chain        |This guy? This is the options chain.               |`{ body: { ticker: String } }`|`{ chain: [ [ "2000-01-01", [ { atm: Boolean, moneyness: Double, strike: Double, callBid: Double, call: Double, callAsk: Double, callOI: Integer, callVol: Integer, callOutlier: Boolean, callIV: Double, callSymbol: String, key: String, putBid: Double, put: Double, putAsk: Double, putOI: Integer, putVol: Integer, putOutlier: Boolean, putIV: Double, putSymbol: String }... ] ]... ] }`|
|POST|/iv           |HIV positive. Historical Implied Volatility.       |`{ body: { ticker: String, length: 30, days: 720 } }`|`{ historicalIV: [ { date: "2000-01-01", underlying: Double, strike: Double, price: Double, symbol: String, iv: Double }... ] }`|
|POST|/historical   |This gets ya some historical data.                 |`{ body: { ticker: String, days: 720 } }`|`{ historical: [ { date: "2000-01-01", open: Double, high: Double, low: Double, close: Double, volume: Integer }... ] }`|
|POST|/guessSymbol  |Send a request here for symbol recommendations.    |`{ body: { text: String } }`|`{ guesses: [ { symbol: String, name: String, exchange: String, type: String }... ] }`|
|POST|/yields     |Fed up? Here's the yield curve data for today.     |`{ body: {} }`|`{ yields: [ { name: String, val: Double }... ] }`|

### /api/bug/

[bug.js](routes/bug.js)

1. Request Validation Files
    - [validateBody.js](routes/validation/validateBody.js)
    - [bugValidation.js](routes/validation/bugValidation.js)
2. Data Stream Buffers
    - [bugBuffer.js](routes/buffer/bugBuffer.js)
3. Calculations and Verification
    - N/A

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/track         |Uhhhhhh. I should stop talking now.               |`{ body: { ip: String } }`|`{ error: Boolean, details: String }`|
|POST|/report        |Hey look! Here's how you send state data to us.   |`{ body: { options: String } }`|`{ error: Boolean, details: String }`|
|POST|/imageReport   |Oh snap, you can send pictures too. That's crazy. |`{ files: { file: { data : Buffer } } }`|`{ error: Boolean, details: String }`|

### /api/twitter/

[twitter.js](routes/twitter.js)

1. Request Validation Files
    - [validateBody.js](routes/validation/validateBody.js)
    - [twitterValidation.js](routes/validation/twitterValidation.js)
2. Data Stream Buffers
    - [prepareAnswer.js](routes/buffer/prepareAnswer.js)
    - [twitterBuffer.js](routes/buffer/twitterBuffer.js)
3. Calculations and Verification
    - [noCheckSend.js](routes/calculation/noCheckSend.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/search    |Search for tweets on Twitter.|`{ body: { q: String } }`|`{ tweets: [ TweetObject... ] }`|

### /api/users/

[users.js](routes/users.js)

1. Request Validation Files
    - [validateBody.js](routes/validation/validateBody.js)
    - [authorizeUser.js](routes/validation/authorizeUser.js)
    - [userValidation.js](routes/validation/validateBody.js)
2. Data Stream Buffers
    - [userBuffer.js](routes/buffer/userBuffer.js)
3. Calculations and Verification
    - N/A

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/register    |Register an account with us.                           |`{ body: { name: String, email: String, password: String, password2: String } }`|`{ registered: { name: String, email: String, date: String } }`|
|POST|/login       |Login into the account.                                |`{ body: { email: String, password: String } }`|`{ login: { success: Boolean, id: String, token: String } }`|
|POST|/current     |Using cookies and whatnot to get tokens and whatnot.   |`{ header: { authorization: String }, body: { id: String } }`|`{ current: { name: String, email: String } }`|
|POST|/change      |Change your password with this.                        |`{ header: { authorization: String }, body: { id: String, oldPassword: String, newPassword: String, newPassword2: String } }`|`{ changed: Boolean }`|
|POST|/delete      |Delete.😢                                              |`{ header: { authorization: String }, body: { id: String } }`|`{ deleted: Boolean }`|

### /api/watchlist/

[watchlist.js](routes/watchlist.js)

1. Request Validation Files
    - [validateBody.js](routes/validation/validateBody.js)
    - [authorizeUser.js](routes/validation/authorizeUser.js)
    - [marketDataRequestValidation.js](routes/validation/marketDataRequestValidation.js)
2. Data Stream Buffers
    - [prepareAnswer.js](routes/buffer/prepareAnswer.js)
    - [tradierBuffer.js](routes/buffer/tradierBuffer.js)
    - [watchlistBuffer.js](routes/buffer/watchlistBuffer.js)
3. Calculations and Verification
    - N/A

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST|/view    |So you wanna see your watchlist huh?                       |`{ header: { authorization: String }, body: { id: String } }`|`{ list: [ String... ] }`|
|POST|/add    |So you wanna add something in your watchlist huh?|`{ header: { authorization: String }, body: { id: String, ticker: String } }`|`{ list: [ String... ] }`|
|POST|/remove    |So you wanna remove something in your watchlist huh?|`{ header: { authorization: String }, body: { id: String, ticker: String } }`|`{ list: [ String... ] }`|

### /api/strategy/

[strategy.js](routes/strategy.js)

1. Request Validation Files
    - [validateBody.js](routes/validation/validateBody.js)
    - [authorizeUser.js](routes/validation/authorizeUser.js)
    - [marketDataRequestValidation.js](routes/validation/marketDataRequestValidation.js)
    - [strategyFormatting.js](routes/validation/strategyFormatting.js)
2. Data Stream Buffers
    - [strategyBuffer.js](routes/buffer/strategyBuffer.js)
3. Calculations and Verification
    - N/A

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|POST |/load     |See all your saved strats. |`{ header: { authorization: String }, body: { id: String, ticker: "" } }`|`{ strategies: [ { ticker: String, legs: [ Option... ] }... ] }`|
|POST |/save     |Save a strategy.           |`{ header: { authorization: String }, body: { id: String, ticker: String, legs: [ Option... ] } }`|`{ saved: Boolean }`|
|POST |/delete   |Delete a strategy.         |`{ header: { authorization: String }, body: { id: String, ticker: String, legs: [ Option... ] } }`|`{ deleted: Boolean }`|


### /dev/

[dev.js](routes/dev.js)

|Type|Route|Description|Parameters|Returns|
| :-|:- |:-:|:-:|:-:|
|GET |/jest      |View the [Jest](../test/report/index.html) HTML report file.           |`{ query: {} }`|HTML File|
|GET |/coverage  |View the [Coverage](../coverage/lcov-report/index.html) report HTML.   |`{ query: {} }`|HTML File|
|GET |/lint      |View the [ESLint](./eslint/lintOutput.html) HTML report file.          |`{ query: {} }`|HTML File|
|POST |/logs     |This will send you the [logs.txt](logs/logs.txt).                      |`{ body: { token: String } }`|Text File|

## Discord and Roku

Yes. What's up? The Discord bot starts out from [discord.js](discord.js), with self-contained code. The bot connects back to the Outsmart Options discord server and is named Roku. Saying "roku" or @ing the bot will let you know whether the server is up or not.

## Daemons

### The Database
So... yes, there's a connection to a Mongo backend database: [database.js](daemons/database.js). And you can interact with the server with the [Mango Discord Bot](https://github.com/jjjpanda/MongomodelsDiscormodelsot). 

The [database folder](daemons/models), holds the models and objects that are used in the server:
1. [User](daemons/models/User.js)
    - **name**: String
    - **email**: String
    - **password**: String
    - **date**: Date
2. [Watchlist](daemons/models/Watchlist.js)
    - **user**: User
    - **stocks**: Array of Strings
3. [Strategy](daemons/models/Strategy.js)
    - **user**: User
    - **ticker**: String
    - **key**: String
    - **legs**: Array of Options
4. [Earnings](daemons/models/Earnings.js)
    - **date**: Date
    - **company**: String
5. [Option](daemons/models/Option.js)
    - **date**: String (YYYY-MM-DD)
    - **strike**: Double
    - **price**: Double
    - **isCall**: Boolean
    - **isLong**: Boolean
    - **quantity**: Integer
    - **symbol**: String

*But Earnings is currently not being used. See more in the [next section](#earnings-calendar)*

### Earnings Calendar
**Currently not in use.**

Note that the earnings daemon is called by the database daemon [described above](#the-database).
The earnings [daemon](daemons/earningsDaemon.js) updates the database ER calendar. 

### Server Warmer
The warmer sends continous GET requests to *localhost:PORT/* every 5 minutes. Here's the file: [serverWarmer.js](daemons/serverWarmer.js)