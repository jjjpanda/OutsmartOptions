const request = require('request');

module.exports = {

  getData(apikey, ticker, callback) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/quotes',
      qs: {
        symbols: ticker,
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body).quotes;
        if (body != null && 'quote' in body) {
          const price = body.quote.last;
          const change = body.quote.change_percentage;
          const name = body.quote.description;
          body = { price, change, name };
        }
        if (body === undefined) {
          body = null;
        }

        callback(body);
      } else {
        callback({ error, response: response.statusCode });
      }
    });
  },

  getExpiries(apikey, ticker, callback) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/options/expirations',
      qs: {
        symbol: ticker,
        includeAllRoots: 'true',
        strikes: 'false',
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body).expirations;
        if (body != null && body.date != undefined) {
          body = body.date;
          const bodyLen = body.length;
          const fullChain = [];
          let index = 0;
          function clback(data) {
            fullChain.push([body[index], data]);
            index++;
            if (index >= bodyLen) { // 1 works but not any more than 1
              callback(fullChain);
            } else {
              module.exports.getChain(apikey, ticker, body, index, clback);
            }
          }

          module.exports.getChain(apikey, ticker, body, index, clback);
        } else {
          callback(null);
        }
      } else {
        callback({ error, response: response.statusCode });
      }
    });
  },

  getChain(apikey, ticker, expiration, index, callback) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/options/chains',
      qs: {
        symbol: ticker,
        expiration: expiration[index],
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      // console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body).options;
        /*
            if(body.option != undefined){
                body = body.option;
                //console.log(body)
                bid = body.map(a => a.bid)
                ask = body.map(a => a.ask)
                strike = body.map(a => a.strike)
                vol = body.map(a => a.volume)
                avol = body.map(a => a.average_volume)
                oi = body.map(a => a.open_interest)
                type = body.map(a => a.option_type)
                data = zip([type, strike, bid, ask, vol, avol, oi])
            }
            data = data.map(function(x){
                return {
                    type: x[0],
                    strike: x[1],
                    bid: x[2],
                    ask: x[3],
                    vol: x[4],
                    avol: x[5],
                    oi: x[6]
                };
            });
            */
        let data;
        if (body.option != undefined) {
          body = body.option;
          data = body.map((a) => ({
            type: a.option_type,
            strike: a.strike,
            bid: a.bid,
            ask: a.ask,
            vol: a.volume,
            // avol: a.average_volume,
            oi: a.open_interest,
          }));
        }
        // REFACTOR
        const newData = [];
        const strikes = [];
        for (const option of data) {
          if (!strikes.includes(option.strike)) {
            strikes.push(option.strike);
            newData.push({
              strike: option.strike,
              [`${option.type}Bid`]: option.bid,
              [option.type]: ((option.bid + option.ask) / 2).toFixed(2),
              [`${option.type}Ask`]: option.ask,
              [`${option.type}Vol`]: option.vol,
              // [option.type+"AvgVol"]:option.avol,
              [`${option.type}OI`]: option.oi,
              key: expiration[index] + option.strike,
            });
          } else {
            newData.find((x) => x.strike === option.strike)[`${option.type}Bid`] = option.bid;
            newData.find((x) => x.strike === option.strike)[option.type] = ((option.bid + option.ask) / 2).toFixed(2);
            newData.find((x) => x.strike === option.strike)[`${option.type}Ask`] = option.ask;
            newData.find((x) => x.strike === option.strike)[`${option.type}Vol`] = option.vol;
            // newData.find(x => x.strike === option.strike)[option.type+"AvgVol"] = option.avol
            newData.find((x) => x.strike === option.strike)[`${option.type}OI`] = option.oi;
          }
        }
        // CHANGED DATA TO NEWDATA
        callback(newData.sort((a, b) => a.strike - b.strike));
      } else {
        callback({ error, response: response.statusCode });
      }
    });
  },

  getStockHistoricalData(apikey, ticker, callback) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/history',
      qs: {
        symbol: ticker,
        interval: 'daily',
        start: getDateFromYearsAgo(3),
        end: getDateFromYearsAgo(0),
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    },
    (error, response, body) => {
      if(error){
        callback({error: error})
      }
      else {
        body = JSON.parse(body);
        if (body != undefined && body.history != undefined && body.history != null) {
          callback(body.history.day);
        }
        else {
          callback(body)
        }
      }
    });
  },

  guessSymbol(apikey, data, callback) {
    request({
      method: 'get',
      url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${data}&apikey=${apikey}`,
    },
    (error, response, body) => {
      if (!error) {
        callback(body);
      }
    });
  },

  getDividend(apikey, ticker, callback) {
    request({
      method: 'get',
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${ticker}&apikey=${apikey}`,
    },
    (error, response, body) => {
      body = JSON.parse(body);
      body = body['Monthly Adjusted Time Series'];
      const dividend = { dividendAnnum: 0 };
      if (body === undefined || body === null) {
        callback({ yield: false });
        return;
      }
      const keys = Object.keys(body);
      for (let i = 0, end = keys.length; i < end; i++) {
        if (parseFloat(body[keys[i]]['7. dividend amount']) != 0) {
          dividend.dividendAnnum = 4 * parseFloat(body[keys[i]]['7. dividend amount']);
          break;
        }
      }
      callback(dividend);
    });
  },

};

/*
function zip(arrays) {
  return Array.apply(null, Array(arrays[0].length)).map((_, i) => arrays.map((array) => array[i]));
}
*/

const getDateFromYearsAgo = (n) => {
  const d = new Date();
  return `${d.getFullYear() - n}-${(`0${d.getMonth() + 1}`).slice(-2)}-${(`0${d.getDate()}`).slice(-2)}`;
};
