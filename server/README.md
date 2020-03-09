# Outsmart Options Server

**THIS MAY BE INACCURATE. SERVER IS UNDER DEVELOPMENT AND MAY CHANGE. DOCUMENT DRIVEN DEVELOPMENT, YOU KNOW?**

The server starts from [server.js](server.js), which calls 3 main subprocesses: the [routes](#routes-and-endpoints), the [discord bot](#discord-and-roku) and all [daemons](#daemons). 

## Routes and Endpoints
 
All routes come from [app.js](app.js). 

### /api/markets/

Here we got all of the market data: stonks, options, treasury yields... You name it.  
Here's your three route files:
[marketData.js](routes/marketData.js),
[earnings.js](routes/earnings.js) and
[treasury.js](routes/treasury.js)

|Route|Description|Parameters|Returns|
| :- |:-:|:-:|-:|
|POST /price        |This guy right here gives you the stonk price.     |`{ body: { ticker: String } }`|n
|POST /chain        |This guy? This is the options chain.               |`{ body: { ticker: String } }`|a
|POST /iv           |HIV positive. Historical Implied Volatility.       |`{ body: { ticker: String, length: 30 } }`|a
|POST /historical   |This gets ya some historical data.                 |`{ body: { ticker: String, days: 720 } }`|a
|POST /guessSymbol  |Send a request here for symbol recommendations.    |`{ body: { text: String } }`|a|
|POST /divYield     |This gal hands you the dividend data for a stock.  |`{ body: { ticker: String } }`|a|
|POST /treasury     |Fed up? Here's the yield curve data for today.     |`{ body: {} }`|a|
|POST /earningsDate |Never miss a move. Here's a stocks earnings date.  |`{ body: { ticker: String } }`|a|

### /api/bugs/

[bugsAndReports.js](routes/bugsAndReports.js)

|Route|Description|Parameters|Returns|
| :- |:-:|:-:|-:|
|POST /track         |Uhhhhhh. I should stop talking now.               |`{ body: { ip: String } }`|n
|POST /report        |Hey look! Here's how you send state data to us.   |`{ body: { options: String } }`|a
|POST /imageReport   |Oh snap, you can send pictures too. That's crazy. |`{ files: { file: { data : Buffer } } }`|a

### /api/twitter/

[twitter.js](routes/twitter.js)

|Route|Description|Parameters|Returns|
| :- |:-:|:-:|-:|
|POST /search    |Search for tweets on Twitter.|`{ body: { q: String } }`|n

### /api/users/

[users.js](routes/users.js)

|Route|Description|Parameters|Returns|
| :- |:-:|:-:|-:|
|POST /register    |Register an account with us.                           |`{ body: { name: String, email: String, password: String, password2: String } }`|n
|POST /login       |Login into the account.                                |`{ body: { email: String, password: String } }`|a
|POST /current     |Using cookies and whatnot to get tokens and whatnot.   |`{ header: { authorization: String }, body: { id: String } }`|a
|POST /change      |Change your password with this.                        |`{ header: { authorization: String }, body: { id: String, oldPassword: String, newPassword: String, newPassword2: String } }`|a|
|POST /delete      |Delete.😢                                              |`{ header: { authorization: String }, body: { id: String } }`|a|

### /api/watchlist/

[watchlist.js](routes/watchlist.js)

|Route|Description|Parameters|Returns|
| :- |:-:|:-:|-:|
|POST /view    |So you wanna see your watchlist huh?                       |`{ header: { authorization: String }, body: { id: String } }`|n
|POST /edit    |So you wanna add or remove something in your watchlist huh?|`{ header: { authorization: String }, body: { id: String, ticker: String } }`|a

### /api/strategy/

[strategy.js](routes/strategy.js)

|Route|Description|Parameters|Returns|
| :- |:-:|:-:|-:|
|POST /load     |See all your saved strats. |`{ header: { authorization: String }, body: { id: String, ticker: String (default="") } }`|n
|POST /delete   |Delete a strategy.         |`{ header: { authorization: String }, body: { id: String, ticker: String, strategy: Array of Objects } }`|a
|POST /save     |Save a strategy.           |`{ header: { authorization: String }, body: { id: String, ticker: String, strategy: Array of Objects } }`|a

### /dev/

[devRoutes.js](routes/devRoutes.js)

|Route|Description|Parameters|Returns|
| :- |:-:|:-:|-:|
|GET /jest      |View the [Jest](../test/report/index.html) HTML report file.           |`{ query: {} }`|n
|GET /coverage  |View the [Coverage](../coverage/lcov-report/index.html) report HTML.   |`{ query: {} }`|a
|GET /lint      |View the [ESLint](./eslint/lintOutput.html) HTML report file.          |`{ query: {} }`|a
|POST /logs     |This will send you the [logs.txt](logs/logs.txt).                      |`{ body: { token: String } }`|a

### Webpage Routes

Yes. There is a website.

## Discord and Roku

Yes. What's up?

## Daemons

### Server Warmer
The warmer sends continous GET requests to *localhost:PORT/* every 5 minutes. Here's the file: [serverWarmer.js](js/serverWarmer.js)