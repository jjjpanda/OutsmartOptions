const http = require('http');
const env = require('dotenv').config();

const appendLogs = require('../logs/appendLogs.js')

module.exports = () => {
  setInterval(() => {
    http.get(`http://localhost:${process.env.PORT}`, (res) => {
      if (!res.error && res.statusCode == 200) {
        appendLogs('./server/logs/logs.txt', '~Server Warmed for Another 5 Minutes~');
      } else {
        appendLogs('./server/logs/logs.txt', '~Server Cooled Down; Oops~');
      }
    });
  }, 150000);
};
