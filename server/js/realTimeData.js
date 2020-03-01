const request = require('request');
const moment = require('moment')

const appendLogs = require('../logs/appendLogs.js');

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

  getStrikes(apikey, ticker, expiration, callback) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/options/strikes',
      qs: {
        symbol: ticker,
        expiration: expiration,
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body)
        if(body != undefined){
          body = body.strikes
          callback(body)
        }
        else{
          callback({strike:[]})
        }
      }
      else{
        callback({ error, response: response.statusCode });
      }
    })
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
      // appendLogs('./server/logs/logs.txt', response.statusCode);
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body).options;
        let data;
        if (body != null && body.option != undefined) {

          body = body.option;
          data = body.map((a) => ({
            type: a.option_type,
            strike: a.strike,
            bid: a.bid,
            ask: a.ask,
            vol: a.volume,
            // avol: a.average_volume,
            oi: a.open_interest,
            symbol: a.symbol,
          }));
        
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
                [`${option.type}Symbol`]: option.symbol,
                key: expiration[index] + option.strike,
              });
            } else {
              newData.find((x) => x.strike === option.strike)[`${option.type}Bid`] = option.bid;
              newData.find((x) => x.strike === option.strike)[option.type] = ((option.bid + option.ask) / 2).toFixed(2);
              newData.find((x) => x.strike === option.strike)[`${option.type}Ask`] = option.ask;
              newData.find((x) => x.strike === option.strike)[`${option.type}Vol`] = option.vol;
              // newData.find(x => x.strike === option.strike)[option.type+"AvgVol"] = option.avol
              newData.find((x) => x.strike === option.strike)[`${option.type}OI`] = option.oi;
              newData.find((x) => x.strike === option.strike)[`${option.type}Symbol`] = option.symbol;
            }
          }

          // CHANGED DATA TO NEWDATA
          callback(newData.sort((a, b) => a.strike - b.strike));

        }
        else{
          callback({ error, response: response.statusCode });
        }
      } else {
        callback({ error, response: response.statusCode });
      }
    });
  },

  getStockHistoricalData(apikey, ticker, start, callback) {
    request({
      method: 'get',
      url: 'https://sandbox.tradier.com/v1/markets/history',
      qs: {
        symbol: ticker,
        interval: 'daily',
        start: moment().subtract(start, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      },
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: 'application/json',
      },
    },
    (error, response, body) => {
      if (error) {
        callback({ error });
      } else {
        body = JSON.parse(body);
        if (body != undefined && body.history != undefined && body.history != null) {
          const historical = body.history.day;
          // appendLogs('./server/logs/logs.txt', historical)
          if (historical.length > 1) {
            for(let i = 1; i < historical.length; i++){
              while(moment(historical[i].date).diff(moment(historical[i-1].date), 'days') > 1){
                historical.splice(i, 0, {date: moment(historical[i-1].date).add(1, 'days').format('YYYY-MM-DD'), open: historical[i-1].open, high: historical[i-1].high, low: historical[i-1].low, close: historical[i-1].close, volume: 0});
              }
            }
          }
          callback(historical);
        } else {
          callback(body);
        }
      }
    });
  },

  getIV(apikey, ticker, ivLength, callback){
    //XXX-YYMMDD-00000.000
    let iv = []
    module.exports.getStockHistoricalData(apikey, ticker, 200, (historical) => {
      let pastExpiries = historical.filter(d => moment(d.date).day() == 5);
      let index = 0;
      let rounder = [0.5, 1, 2, 2.5, 5, 10, 20, 50, 100];
      let roundIndex = 0;
      let looper = () => {
        module.exports.getStockHistoricalData(apikey, `${ticker}${moment(pastExpiries[index].date).format('YYMMDD')}C${('00000000'+Math.ceil(pastExpiries[index].close/rounder[roundIndex])*rounder[roundIndex]*1000).slice(-8)}`, moment().diff(moment(pastExpiries[index].date), 'days')+ivLength, (optionH) => {
          //console.log(pastExpiries[index].date ,`${ticker}${moment(pastExpiries[index].date).format('YYMMDD')}C${('00000000'+Math.ceil(pastExpiries[index].closerounder[roundIndex])*rounder[roundIndex]*1000).slice(-8)}`, optionH)
          if(optionH[0] != undefined && optionH[0] != null){
            iv.push({
              t: ivLength/365,
              expiry: moment(pastExpiries[index].date).format('YYYY-MM-DD'),
              date: moment(pastExpiries[index].date).subtract(ivLength, 'days').format('YYYY-MM-DD'), 
              underlying: pastExpiries[index].close, 
              strike: Math.ceil(pastExpiries[index].close/rounder[roundIndex])*rounder[roundIndex], 
              price: optionH[0].close
            })
            index++
            if(index >= pastExpiries.length){
              callback({iv})
            }
            else{
              looper()
            }
          }
          else{
            roundIndex++;
            if(roundIndex >= rounder.length){
              callback({iv: false})
            }
            else{
              looper()
            }
          }
        })
      }

      looper()
      /* for(let date of historical.filter(d => moment(d.date).day() == 5)){
        module.exports.getStockHistoricalData(apikey, `${ticker}${moment(date.date).format('YYMMDD')}C${('00000000'+Math.ceil(date.close/10)*10*1000).slice(-8)}`, 2, (optionH) => {
          console.log(date.date, `${ticker}${moment(date.date).format('YYMMDD')}C${('00000000'+Math.ceil(date.close/10)*10*1000).slice(-8)}`, optionH)
        })
      } */
    })
    //callback({bruh:true})
  }, 

  guessSymbol(apikey, data, callback) {
    request({
      method: 'get',
      url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${data}&apikey=${apikey}`,
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(body);
      } else {
        callback({ error: true });
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

  getEarnings(ticker, callback) {
    request({
      method: 'get',
      url: `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`,
    },
    (error, response, body) => {
      body = JSON.parse(body);
      let earnings;
      if(body.quoteResponse != undefined && body.quoteResponse.result[0] != undefined && body.quoteResponse.result[0].earningsTimestamp != undefined){
        earnings = new Date(body.quoteResponse.result[0].earningsTimestamp * 1000);
      }
      else {
        earnings = undefined
      }
      // appendLogs('./server/logs/logs.txt', earnings)
      callback({ earningsDate: earnings });
    });
  },

};

const getDateFromDaysAgo = (n) => {
  let d = new Date();
  d = new Date(d.setDate((new Date()).getDate() - n));
  return `${d.getFullYear()}-${(`0${d.getMonth() + 1}`).slice(-2)}-${(`0${d.getDate()}`).slice(-2)}`;
};

const ms_per_day = 1000 * 60 * 60 * 24;

const dateToString = (d) => (`${d.getFullYear()}-${(`0${d.getMonth() + 1}`).slice(-2)}-${(`0${d.getDate()}`).slice(-2)}`);

const stringToDate = (strDate) => {
  strDate = strDate.split('-');
  return new Date(strDate[0], (strDate[1] - 1), strDate[2]);
};

const timeBetweenDates = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return (Math.floor((utc1 - utc2) / ms_per_day));
};
