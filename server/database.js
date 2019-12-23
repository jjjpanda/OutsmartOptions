const env = require('dotenv').config();
const mongoose = require('mongoose');
const daemon = require('./db/earningsDaemon.js');


mongoose.connection.once('connected', () => {
  console.log('~MongoDB Database Connected~');
  daemon.start();
});
mongoose.connection.once('error', () => {
  console.log('~MongoDB Database Error~');
  daemon.stop();
});
mongoose.connection.once('disconnected', () => {
  console.log('~MongoDB Database Disconnected~');
  daemon.stop();
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
        console.log('Database Connect Callback Received');
        callback(true);
      },
      (error) => {
        console.log(error);
        try { callback(false) } catch (error) { console.log(error); }
      },
    ),

  disconnect: (callback) => mongoose.disconnect()
    .then(
      () => {
        console.log('Database Disconnect Callback Received');
        callback(true);
      },
      (error) => {
        console.log(error);
        try { callback(false) } catch (error) { console.log(error); }
      },
    ),

};
