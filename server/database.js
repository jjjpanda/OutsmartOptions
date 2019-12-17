const env = require('dotenv').config();
const daemon = require('./db/earningsDaemon.js')

const mongoose = require('mongoose');
mongoose.connection.once('connected', () => {
  callbackReset(() => {
    console.log("~MongoDB Database Connected~");  
    daemon.start()
  })
})
mongoose.connection.once('error', () => {
  callbackReset(() => {
    console.log('~MongoDB Database Did Not Connect~');
    console.log('~Daemon Not Started~')
  })
})
mongoose.connection.once('disconnected', () => {
  callbackReset(() => {
    console.log("~MongoDB Database Disconnected~");  
    daemon.stop()
  })
})

var globalCallback = () => {}
var callbackReset = (toDo) => {
  return new Promise((resolve, reject) => {
    toDo()
    globalCallback()
    resolve()
  }).then(() => {
    globalCallback = () => {}
  })
}

module.exports = {

  connect : (callback) => {
    globalCallback = callback
    mongoose.connect("mongodb://"+process.env.dbNAME+":"+process.env.dbPWD+"@"+process.env.dbIP+"2:"+process.env.dbPORT, 
    { useNewUrlParser: true, useUnifiedTopology: true })
  },

  disconnect: (callback) => {
    globalCallback = callback
    mongoose.disconnect()
  }

}

