const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// NECESSARY FOR CALLS IN HTML
app.use('/css', express.static(path.join(__dirname, '../src/css')));
app.use('/img', express.static(path.join(__dirname, '../src/img')));
app.use('/jsLib', express.static(path.join(__dirname, '../src/jsLib')));

const knownPaths = ['/', '/calc', '/help', '/login', '/watch', '/about'];
for (const webPath of knownPaths) {
  app.use(webPath, express.static('./dist', {
    index: 'app.html',
  }));
}

const marketData = require("./routes/marketData.js");
app.use("/", marketData);

const bugsAndReports = require('./routes/bugsAndReports.js')
app.use("/", bugsAndReports)

const treasury = require('./routes/treasury.js')
app.use("/", treasury)

const users = require("./routes/users.js");
app.use("/api", users);

const earnings = require('./routes/earnings.js');
app.use('/', earnings);

const watchlist = require('./routes/watchlist.js');
app.use('/api/watch', watchlist);

const strategy = require('./routes/strategy.js');
app.use('/api/strategy', strategy)

const passport = require("passport");
app.use(passport.initialize());
require("./db/passport.js")(passport);

// Handle 404
app.use((req, res) => {
  res.status(404).send('Bruh 404');
});

// Handle 500
app.use((error, req, res, next) => {
  res.status(500).send('500: Internal Server Error');
});

module.exports = app