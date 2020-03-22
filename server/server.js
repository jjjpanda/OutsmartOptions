const env = require('dotenv').config();
const fs = require('fs');

// Log Reset
const appendLogs = require('./logs/appendLogs.js');

fs.writeFile('./server/logs/logs.txt', '', (err, date) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('Log text file reset');
  }
});

// Routes and Endpoints
const app = require('./app.js');

const port = process.env.PORT;
app.listen(port, () => appendLogs('./server/logs/logs.txt', `Mr. Outsmart is watching port ${port}!`));

// Discord Bot
const discord = require('./discord.js');

discord.start();

// Daemons
require('./daemons/database.js').connect('dev', (success) => {});
require('./daemons/serverWarmer.js')();
