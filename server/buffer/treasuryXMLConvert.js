const request = require('request');
const convert = require('xml-js');

const appendLogs = require('../logs/appendLogs.js');

module.exports = {

  getYield(callback) {
    const date = new Date();
    if (date.getDay() == 0) {
      date.setDate(date.getDate() - 2);
    } else if (date.getDay() == 6) {
      date.setDate(date.getDate() - 1);
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    request({
      method: 'get',
      url: `https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%20${month}%20and%20year(NEW_DATE)%20eq%20${year}and%20day(NEW_DATE)%20eq%20${day}`,
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // appendLogs('./server/logs/logs.txt', body)
        let data = (convert.xml2json(body));
        try {
          data = JSON.parse(data).elements[0].elements[4].elements[6].elements[0].elements.slice(2, 14).map((k) => ({ name: k.name, val: parseFloat(k.elements[0].text) }));
        } catch (error) {
          //  appendLogs('./server/logs/logs.txt', error);
          data = [];
        }
        callback(data);
      } else {
        callback({ error, response: response.statusCode });
      }
    });
  },


};
