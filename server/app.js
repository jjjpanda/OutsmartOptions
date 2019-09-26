const express = require('express')
const app = express()

const path = require('path')

const realTimeData = require('./js/realTimeData.js')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.PORT; //change to 8181 or whatever when localhosting 
const key = process.env.tradier;

//NECESSARY FOR CALLS IN HTML
app.use('/css', express.static(path.join(__dirname, '../src/css')));
app.use('/img', express.static(path.join(__dirname, '../src/img')));

app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.post('/price', function(req, res){
  var ticker = req.body.ticker
  //res.json({"test": "test"});
  realTimeData.getData(key, ticker, function(data){
      res.json(data);
  });
})

app.post('/chain', function(req, res){
  var ticker = req.body.ticker
  realTimeData.getExpiries(key, ticker, function(data){
      res.json(data);
  });
})

app.post('/historical', function(req, res){
  var ticker = req.body.ticker
  realTimeData.getStockHistoricalData(key, ticker, function(data){
      res.json(data);
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))