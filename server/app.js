const express = require('express');

const app = express();

const env = require('dotenv').config();
const path = require('path');

const bodyParser = require('body-parser');
const realTimeData = require('./js/realTimeData.js');
const treasuryXML = require('./js/treasuryXMLConvert.js');
const reportBugs = require('./js/reportBug.js');

const mongoose = require('mongoose');

mongoose.connect("mongodb://"+process.env.dbNAME+":"+process.env.dbPWD+"@"+process.env.dbIP+":"+process.env.dbPORT, { useNewUrlParser: true })
  .catch(error => console.log(error));
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');

app.use(fileUpload());

const port = process.env.PORT; // change to 8181 or whatever when localhosting
const tradikey = process.env.tradier;
const alphakey = process.env.alpha;
const iptrackkey = process.env.iptrack;

const { bugUrl } = process.env;
const { ipUrl } = process.env;

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

app.post('/track', (req, res) => {
  reportBugs.getIP(iptrackkey, ipUrl, req.body.ip);
});

app.post('/price', (req, res) => {
  const { ticker } = req.body;
  // res.json({"test": "test"});
  realTimeData.getData(tradikey, ticker, (data) => {
    res.json(data);
  });
});

app.post('/chain', (req, res) => {
  const { ticker } = req.body;
  realTimeData.getExpiries(tradikey, ticker, (data) => {
    res.json(data);
  });
});

app.post('/historical', (req, res) => {
  const { ticker } = req.body;
  realTimeData.getStockHistoricalData(tradikey, ticker, (data) => {
    res.json(data);
  });
});

app.post('/guessSymbol', (req, res) => {
  const { text } = req.body;
  realTimeData.guessSymbol(alphakey, text, (data) => {
    res.json(data);
  });
});

app.post('/divYield', (req, res) => {
  const { ticker } = req.body;
  realTimeData.getDividend(alphakey, ticker, (data) => {
    res.json(data);
  });
});

app.post('/treasury', (req, res) => {
  treasuryXML.getYield((data) => {
    res.json(data);
  });
});

app.post('/report', (req, res) => {
  reportBugs.sendCalcError(bugUrl, req.body.options, (data) => {
    res.json(data);
  });
});

app.post('/imageReport', (req, res) => {
  reportBugs.sendImg(bugUrl, req.files.file.data);
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Bruh 404');
});

// Handle 500
app.use((error, req, res, next) => {
  res.status(500).send('500: Internal Server Error');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
