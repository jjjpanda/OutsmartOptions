const env = require('dotenv').config();
const mongoose = require('mongoose');
const daemon = require('./db/earningsDaemon.js');
const appendLogs = require('./logs/appendLogs.js')

mongoose.connection.once('connected', () => {
  appendLogs('./server/logs/logs.txt','~MongoDB Database Connected~');
  //daemon.start();
});
mongoose.connection.once('error', () => {
  appendLogs('./server/logs/logs.txt','~MongoDB Database Error~');
  //daemon.stop();
});
mongoose.connection.once('disconnected', () => {
  appendLogs('./server/logs/logs.txt','~MongoDB Database Disconnected~');
  //daemon.stop();
});

module.exports = {

  connect: (url, callback) => mongoose.connect(`mongodb://${process.env.dbIP}:${process.env.dbPORT}/${url}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        authSource: 'admin',
        user: process.env.dbNAME,
        password: process.env.dbPWD,
      },
    })
    .then(
      () => {
        appendLogs('./server/logs/logs.txt','Database Connect Callback Received');
        callback(true);
      },
      (error) => {
        appendLogs('./server/logs/logs.txt',error);
        try { callback(false); } catch (error) { appendLogs('./server/logs/logs.txt',error); }
      },
    ),

  disconnect: (callback) => mongoose.disconnect()
    .then(
      () => {
        appendLogs('./server/logs/logs.txt','Database Disconnect Callback Received');
        callback(true);
      },
      (error) => {
        appendLogs('./server/logs/logs.txt',error);
        try { callback(false); } catch (error) { appendLogs('./server/logs/logs.txt',error); }
      },
    ),

};
