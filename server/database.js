const env = require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connection.once('connect', () => {
  console.log("~MongoDB Database Connected~");  
  require('./db/earningsDaemon.js')()
})
mongoose.connection.once('error', () => {
  console.log('~MongoDB Database Did Not Connect~');
})
mongoose.connection.once('disconnect', () => {
  console.log("~MongoDB Database Disconnected~");  
})

module.exports = {

  connect : (callback) => {
    mongoose.connect("mongodb://"+process.env.dbNAME+":"+process.env.dbPWD+"@"+process.env.dbIP+":"+process.env.dbPORT, 
                      { useNewUrlParser: true, useUnifiedTopology: true }, callback)
  },

  disconnect: (callback) => {
    mongoose.disconnect(callback)
  }

}

