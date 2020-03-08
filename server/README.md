# Outsmart Options Server

The server starts from [server.js](server.js), which calls 3 main subprocesses: the [routes](#routes-and-endpoints), the [discord bot](#discord-and-roku) and all [daemons](#daemons). 

## Routes and Endpoints
 
All routes come from [app.js](app.js). 

### /api/markets/

Here we got all of the market data: stonks, options, treasury yields... You name it.  
Here's your three route files:
[marketData.js](routes/marketData.js),
[earnings.js](routes/earnings.js) and
[treasury.js](routes/treasury.js)

#### /api/markets/price
This guy right here gives you the stonk price. 
#### /api/markets/chain
This guy? This is the options chain.
#### /api/markets/iv
HIV positive. Historical Implied Volatility.
#### /api/markets/historical
This gets ya some historical data.
#### /api/markets/guessSymbol
If you send some stupid symbol, send a request here for some recommendations.
#### /api/markets/divYield
This gal hands you the dividend data for a stock.
#### /api/markets/treasury
Fed up? Here's the yield curve data for today.
#### /api/markets/earningsDate
Never miss a move. Here's a stocks earnings date.

### /api/bugs/

[bugsAndReports.js](routes/bugsAndReports.js)

#### /api/bugs/track
Uhhhhhh. I should stop talking now.
#### /api/bugs/report
Hey look! Here's how you send state data to us.
#### /api/bugs/imageReport
Oh snap, you can send pictures too. That's crazy.

### /api/twitter/

[twitter.js](routes/twitter.js)

#### /api/twitter/search
Search for something on Twitter. Elon Musk or Dolan Dark or somethin'.

### /api/users/

[users.js](routes/users.js)

#### /api/users/register
Register an account with us.
#### /api/users/login
Login into the account.
#### /api/users/current
Using cookies and whatnot to get tokens and whatnot.
#### /api/users/change
Change your password with this.
#### /api/users/delete
Delete. 😢

### /api/watchlist/

[watchlist.js](routes/watchlist.js)

#### /api/watchlist/view
So you wanna see your watchlist huh?
#### /api/watchlist/edit
So you wanna add or remove something in your watchlist huh?

### /api/strategy/

[strategy.js](routes/strategy.js)

#### /api/strategy/load
See all your saved strats.
#### /api/strategy/delete
Delete a strategy. 
#### /api/strategy/save
Save a strategy.

### /dev/

[devRoutes.js](routes/devRoutes.js)

#### /dev/jest
View the [Jest](../test/report/index.html) HTML report file.
#### /dev/coverage
View the [Coverage](../coverage/lcov-report/index.html) report HTML. 
#### /dev/lint
View the [ESLint](./eslint/lintOutput.html) HTML report file.
#### /dev/logs
This will send you the [logs.txt](logs/logs.txt)

### Webpage Routes

Yes. There is a website.

## Discord and Roku

Yes. What's up?

## Daemons

### Server Warmer
The warmer sends continous GET requests to *localhost:PORT/* every 5 minutes. Here's the file: [serverWarmer.js](js/serverWarmer.js)