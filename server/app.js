const appendLogs = require('./logs/appendLogs.js');

const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');

app.use(fileUpload());

// HTML Calls
app.use('/css', express.static(path.join(__dirname, '../src/css')));
app.use('/img', express.static(path.join(__dirname, '../src/img')));
app.use('/jsLib', express.static(path.join(__dirname, '../src/jsLib')));

//Routes
const knownPaths = ['/', '/calc', '/help', '/login', '/watch', '/about', '/checkout'];
for (const webPath of knownPaths) {
  app.use(webPath, express.static('./dist', {
    index: 'app.html',
  }));
}

app.use('/api/market', require('./routes/market.js'));

app.use('/api/bug', require('./routes/bug.js'));

app.use('/api/twitter', require('./routes/twitter.js'));

app.use('/api/users', require('./routes/users.js'));

app.use('/api/watchlist', require('./routes/watchlist.js'));

app.use('/api/strategy', require('./routes/strategy.js'));

app.use('/dev', require('./routes/dev.js'));

// Handle 404
app.use((req, res) => {
  appendLogs('./server/logs/logs.txt', `The URL ${req.originalUrl} 404ed.`)
  res.status(404).send('Bruh 404');
});

// Handle 500
app.use((error, req, res, next) => {
  appendLogs('./server/logs/logs.txt', `The URL ${req.originalUrl} 500ed on you.`)
  res.status(500).send('500: Internal Server Error');
});

//Database
const passport = require('passport');

app.use(passport.initialize());
require('./db/passport.js')(passport);

module.exports = app;
