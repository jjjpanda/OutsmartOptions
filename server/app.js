const express = require('express')
const app = express()

const path = require('path')

const realTimeData = require('./js/realTimeData.js')
const treasuryXML = require('./js/treasuryXMLConvert.js')
const reportBugs = require('./js/reportBug.js')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.PORT; //change to 8181 or whatever when localhosting 
const tradikey = process.env.tradier;
const alphakey = process.env.alpha;
const iptrackkey = process.env.iptrack

const bugUrl = process.env.bugUrl
const ipUrl = process.env.ipUrl


//NECESSARY FOR CALLS IN HTML
app.use('/css', express.static(path.join(__dirname, '../src/css')));
app.use('/img', express.static(path.join(__dirname, '../src/img')));

var knownPaths = ["/", "/calc", "/help", "/login", "/watch"]
for(var webPath of knownPaths){
app.use(webPath, express.static('./dist', {
  index: "app.html"
}))
}

app.post('/track', function(req, res){
  reportBugs.getIP(iptrackkey, ipUrl);
})

app.post('/price', function(req, res){
  var ticker = req.body.ticker
  //res.json({"test": "test"});
  realTimeData.getData(tradikey, ticker, function(data){
      res.json(data);
  });
})

app.post('/chain', function(req, res){
  var ticker = req.body.ticker
  realTimeData.getExpiries(tradikey, ticker, function(data){
      res.json(data);
  });
})

app.post('/historical', function(req, res){
  var ticker = req.body.ticker
  realTimeData.getStockHistoricalData(tradikey, ticker, function(data){
      res.json(data);
  });
})

app.post('/divYield', function(req, res){
  var ticker = req.body.ticker
  realTimeData.getDividend(alphakey, ticker, function(data){
    res.json(data)
  });
})

app.post('/treasury', function(req, res){
  treasuryXML.getYield(function(data){
      res.json(data);
  });
})

app.post('/report', function(req, res){
  reportBugs.sendCalcError(bugUrl, req.body.options, function(data){
    res.json(data)
  })
})

// Handle 404
app.use(function(req, res) {
  res.status(404).send('Bruh 404');
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500).send('500: Internal Server Error');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))