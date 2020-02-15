const env = require('dotenv').config();
const fs = require('fs');
const app = require('./app');

const appendLogs = require('./logs/appendLogs.js');

fs.writeFile('./server/logs/logs.txt', '', (err, date) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('Log text file reset');
  }
});

const port = process.env.PORT;
app.listen(port, () => appendLogs('./server/logs/logs.txt', `Mr. Outsmart is watching port ${port}!`));

require('./js/serverWarmer.js')();
require('./database').connect('dev', (success) => {});
