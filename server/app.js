const express = require('express')
const app = express()

const path = require('path')

const realTimeData = require('./js/realTimeData.js')
const treasuryXML = require('./js/treasuryXMLConvert.js')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.PORT; //change to 8181 or whatever when localhosting 
const tradikey = process.env.tradier;
const alphakey = process.env.alpha;

//NECESSARY FOR CALLS IN HTML
app.use('/css', express.static(path.join(__dirname, '../src/css')));
app.use('/img', express.static(path.join(__dirname, '../src/img')));

app.use('/', express.static('./dist', {
  index: "home.html"
}))

app.use('/calc', express.static('./dist', {
  index: "calc.html"
}))

app.use('/login', express.static('./dist', {
  index: "login.html"
}))

app.use('/help', express.static('./dist', {
  index: "help.html"
}))

app.use('/watch', express.static('./dist', {
  index: "watch.html"
}))


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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))