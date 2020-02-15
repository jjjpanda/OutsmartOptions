const request = require('request');

const appendLogs = require('../logs/appendLogs.js')

module.exports = {

  getERCalendar: (date, callback) => {
    // appendLogs('./server/logs/logs.txt', `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`)
    request({
      method: 'get',
      url: `https://api.earningscalendar.net/?date=${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}/`,
    },
    (error, response, body) => {
      const dateString = response.request.path.substr(response.request.path.lastIndexOf('=') + 1, 10);
      const urlDate = new Date(dateString.split('-')[0], parseInt(dateString.split('-')[1]) - 1, dateString.split('-')[2]);
      if (!error && response.statusCode == 200 && body.length != 0) {
        for (const report of JSON.parse(body)) {
          callback(report.ticker, report.when == 'amc' ? new Date(urlDate.getFullYear(), urlDate.getMonth(), urlDate.getDate() + 1) : urlDate);
        }
      } else {
        // Error
        appendLogs('./server/logs/logs.txt', 'EARNINGS API ERROR');
      }
    });
  },

};
