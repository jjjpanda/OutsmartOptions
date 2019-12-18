const env = require('dotenv').config();
const daemon = require('./db/earningsDaemon.js')

const mongoose = require('mongoose');
mongoose.connection.once('connected', () => {
  console.log("~MongoDB Database Connected~");  
  daemon.start()
})
mongoose.connection.once('error', () => {
  console.log('~MongoDB Database Error~');
  daemon.stop()
})
mongoose.connection.once('disconnected', () => {
  console.log("~MongoDB Database Disconnected~");  
  daemon.stop()
})

module.exports = {

  connect : (callback) => {
    return mongoose.connect("mongodb://"+process.env.dbNAME+":"+process.env.dbPWD+"@"+process.env.dbIP+":"+process.env.dbPORT, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
      () => { 
        console.log('Database Connect Callback Received')
        callback()
      },
      error => {  
        console.log(error)
        try{callback.fail(new Error('Database Connect Error'))}
        catch(error){ console.log( error )}
      }
    );
  },

  disconnect: (callback) => {
    return mongoose.disconnect()
    .then(
      () => { 
        console.log('Database Disconnect Callback Received')
        callback()
      },
      error => {  
        console.log(error)
        try{callback.fail(new Error('Database Disconnect Error'))}
        catch(error){ console.log( error )}
      }
    );
  }

}
