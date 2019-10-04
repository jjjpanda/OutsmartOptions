import React from 'react';
import ReactDOM from 'react-dom';

import logo from './img/logo.png'

import * as optionsMath from './jsLib/optionsMathLibrary.js'
import * as timeMath from './jsLib/timeLibrary.js'

import {
  Input,
  version,
  Button,
  Switch,
  Modal,
  Table,
  Collapse,
  Radio,
} from 'antd';

const { Search } = Input
const { Panel } = Collapse

import "./css/logo.css";
import "./css/calculator.less";

class OptionsCalculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      symbol:"", 
      price: 0,
      addLegModalVisible: false,
      optionsChain: [['Empty',{}]],
      optionsSelected: "",
      numOfLegs : 0
    };
  }

  onSearch = e => {
    //console.log(e);
    this.setState({ symbol: e, price : 0 });
    fetch("/price",
      {
        method: "post", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ticker: e})}
    )
    .then(res => res.json())
    .then( 
      (data) => {
        console.log(data);
        console.log(this.state);
        this.setState({symbol : e, price : data.price, priceChange : data.change});
      }
    );

    fetch("/chain",
      {
        method: "post", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ticker: e})}
    )
    .then(res => res.json())
    .then( 
      (data) => {
        console.log(data)
        data = data.filter((x)=>{
          return [x[0], x[1].map((y)=>{
              y['callIV'] = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.call, this.state.price, y.strike, true, 0,0);
              y['putIV'] = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.put, this.state.price, y.strike, false, 0,0);
              return y    
          })]
        })
        this.setState({optionsChain: data});
      }
    );
  };

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
    console.log(this.state);
  }

  setAddLegModalVisible(addLegModalVisible) {
    this.setState({ addLegModalVisible: addLegModalVisible });
  }

  renderLegs() {
    var legs = []
    for (var i = 0; i < this.state.numOfLegs; i++){ 
      legs.push(<OptionsLeg callback = {this.optionsSelectedMoreInfo} optionRepresented={this.state.optionsSelected[i]}/>);
    }
    return legs
  }

  optionsSelectedMoreInfo = (e) => {
    console.log(e)
    this.setState(state => ({optionsSelected: [...state.optionsSelected.filter(item => !(item.date==e.date && item.strike==e.strike && item.isCall==e.isCall)), e]}))
  }
  
  onOk = () => {
    this.setState({numOfLegs : this.state.optionsSelected.length})
    console.log(this.state.optionsSelected)
    this.setAddLegModalVisible(false)
  }

  renderOptionsChain = () => {
    var chain = []
    for (var expiry of this.state.optionsChain){
      chain.push(
      <Panel header={expiry[0]}>
        <Table dataSource = {expiry[1]} columns ={this.columns(expiry[0])} pagination={false} size="small" scroll={{ y: 500 }} /> 
      </Panel>);
    }
    return chain;
  }

  onHandleOptionLegChange = (needToAdd, isCall, strike, price, date, iv) => {
    console.log((needToAdd ? "ADDING" : "DELETING")+' '+(isCall ? "Call" : "Put") + ' STRIKE: ' + strike + '@'+ price + ' => ' + date)
    var option = {isCall:isCall, date:date, strike:strike, price:price, iv:iv}
    if(needToAdd){
      this.setState({optionsSelected : [...this.state.optionsSelected, option]})
    }
    else{
      this.setState({optionsSelected : this.state.optionsSelected.filter( (key) => !(key.isCall == isCall && key.date==date && key.strike == strike))})
    }
  }

  calculateProfits = () => {
    var selectedOptions = this.state.optionsSelected
    var rangeOfPrices = optionsMath.getRangeOfPrices(this.state.price, 1, 15, 0)
    for(var option of selectedOptions){
      option.greeks = optionsMath.calculateGreeks(timeMath.timeTillExpiry(timeMath.stringToDate(option.date)), this.state.price, option.strike, option.isCall, option.isLong,0,0, option.iv)  
      option.profit = []
      var d = timeMath.getCurrentDate();
      while(timeMath.timeBetweenDates(timeMath.stringToDate(option.date), d) > 0){
        option.profit.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
        for(var price of option.profit[option.profit.length-1][1]){
          price[1] = optionsMath.calculateOptionsPrice(timeMath.percentageOfYear(timeMath.timeBetweenDates(timeMath.stringToDate(option.date), d)), price[0], option.strike, option.isCall, option.isLong,0, 0, option.iv) 
          price[1] -= option.limitPrice * (option.isLong?1:-1)
          price[1] *= option.quantity
        }
        d = timeMath.incrementOneDay(d)
      }

      //PROFIT AT EXPIRY
      option.profit.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
      for(price of option.profit[option.profit.length-1][1]){
          price[1] = optionsMath.calculateProfitAtExpiry(option.limitPrice, price[0], option.strike, option.isCall, option.isLong)
          price[1] *= option.quantity
      }

    }
    this.setState({optionsSelected : selectedOptions})

    this.mergedOptions(selectedOptions)

    console.log(this.state)
  }

  mergedOptions = (selectedOptions) => {
    
    var mergedOptions = {'limitPrice':0, 'date':"", 'greeks':{'delta':0, 'gamma':0, 'theta':0, 'vega':0, 'rho':0}, 'profit':{}}    
    for (var option of selectedOptions){
        mergedOptions.limitPrice += (option.isLong ? 1 : -1) * option.limitPrice * option.quantity

        mergedOptions.greeks.delta += option.greeks.delta * option.quantity
        mergedOptions.greeks.gamma += option.greeks.gamma * option.quantity
        mergedOptions.greeks.theta += option.greeks.theta * option.quantity
        mergedOptions.greeks.vega += option.greeks.vega * option.quantity
        mergedOptions.greeks.rho += option.greeks.rho * option.quantity
    }

    var optionsProfits = selectedOptions.map(o => o.profit)

    mergedOptions.date = timeMath.dateToString(selectedOptions.map( o => timeMath.stringToDate(o.date) ).sort(timeMath.timeBetweenDates)[0])
       
    mergedOptions.percentProfit = []
    mergedOptions.profit = this.mergeProfits(optionsProfits, mergedOptions.date) 
    for(var day of mergedOptions.profit){
        mergedOptions.percentProfit.push([day[0], []])
        for(var price of day[1]){
            mergedOptions.percentProfit[mergedOptions.percentProfit.length-1][1].push((price[0]).toFixed(2)
                ,((price[1]).toFixed(2)+mergedOptions.limitPrice)/Math.abs(mergedOptions.limitPrice))
        }
    }

    this.setState({mergedOptions: mergedOptions})
  }

  mergeProfits = (optionsProfits, expiry) => {
    var profitMap = []
    var d = timeMath.getCurrentDate()
    var rangeOfPrices = optionsMath.getRangeOfPrices(this.state.price, 1, 15, 0)
    while(timeMath.timeBetweenDates(timeMath.stringToDate(expiry), d) > -1){
        profitMap.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
        for(var price of profitMap[profitMap.length-1][1]){
            for(var profitSet of optionsProfits){
                price[1] += mapToObject(mapToObject(profitSet)[timeMath.dateToString(d)])[price[0]]
            }
        }
        d = timeMath.incrementOneDay(d)
    }
    return profitMap
  }

  columns = (expiry) => { return [
    {
      title: '',
      dataIndex: 'callAction',
      width: '10%',
      render: (text, row) =>
      <Switch onChange = {(e) => {this.onHandleOptionLegChange(e, true, row.strike, row.call, expiry, row.callIV);}}></Switch>
    },
    {
      title: 'Call',
      dataIndex: 'call'
    },
    {
      title: 'Call Vol',
      dataIndex: 'callVol',
      width: '10%',
    },
    {
      title: 'Strike',
      dataIndex: 'strike'
    },
    {
      title: 'Put',
      dataIndex: 'put',
    },
    {
      title: 'Put Vol',
      dataIndex: 'putVol',
    },
    {
      title: '',
      dataIndex: 'putAction',
      render: (text, row) =>
      <Switch onChange = {(e) => {this.onHandleOptionLegChange(e, false, row.strike, row.put, expiry, row.putIV);}}></Switch>
    },
  ]}

  render() { return (
    <div className="StockSymbol">
      <div className = "stockHeadings">
        <div id= "stockSymbolHeading">Stock Symbol:</div>
        <div id= "stockPriceHeading">Stock Price:</div>
        <div id= "priceChangeHeading">Stock Price Change:</div>
      </div>
      <div className="stockInputs">
        <div id="stockSymbolInput"><Search placeholder="Enter..." onSearch={this.onSearch}/></div>
        <div id="stockPriceBox"><Input placeholder={"$"+this.state.price} disabled/></div>
        <div id="priceChangeBox"><Input placeholder={this.state.priceChange+"%"} disabled/></div>
      </div>
      <hr id="hr" align='left'/>

      <div className="optionsList">{this.renderLegs()}</div>

      <div className="optionsButtons">
          <div id= "addLegButton">
            <Button icon="edit" onClick={() => this.setAddLegModalVisible(true)}>Edit Legs</Button>
            <div className="addLegButtonWrapper">
              <Modal
                title="Add Leg"
                centered
                visible={this.state.addLegModalVisible}
                onOk={this.onOk}
                onCancel={() => this.setAddLegModalVisible(false)}
              >
                <Collapse accordion>
                  {this.renderOptionsChain()}
                </Collapse>
              </Modal>
            </div>

          </div>

          <div id= "ivSkewButton"><Button icon="profile">IV Skew</Button></div>
          <div id= "strategyButton"><Button icon="fund">Strategy</Button></div>
          <div id= "calculateButton"><Button onClick={this.calculateProfits} type="primary">Calculate</Button></div>
          <div id= "saveButton"><Button shape="circle" icon="save" /></div>
        </div>
        <pre>
          {JSON.stringify(this.state.mergedOptions != undefined ?  this.state.mergedOptions.profit : "", null, 2)}
        </pre>
    </div>);
    
  }
}

class OptionsLeg extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isCall : props.optionRepresented.isCall,
      date: props.optionRepresented.date,
      strike: props.optionRepresented.strike,
      price: props.optionRepresented.price,
      iv: props.optionRepresented.iv,
      isLong: true,
      quantity: 1,
      limitPrice: props.optionRepresented.price
    };
    this.props.callback(this.state)
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
    console.log(this.state);
    this.props.callback(this.state)
  }

  handleSwitchChange(checked) {
    this.setState({isLong: checked})
    console.log(`switch to ${checked}`);
    console.log(this.state);
    this.props.callback(this.state)
  }

  render() { 
    return (
      <div className="Options Editor">
        <div className="optionsHeadings">
          <div id= "buyWriteHeading">Buy or Write:</div>
          <div id= "contractHeading">Contract:</div>
          <div id= "xHeading">x</div>
          <div id= "quantityHeading">Quantity:</div>
          <div id= "atPriceHeading">At Price:</div>
        </div>
        <div className="optionsInputs">
          <div id= "buyWriteSwitch"><Switch checkedChildren="Buy" unCheckedChildren="Write" defaultChecked onChange={(e) => this.handleSwitchChange(e)}/></div>
          <div id= "contractBox">
            <Input placeholder="Contract" value={this.state.date + " " + this.state.strike + " " + (this.state.isCall?"C":"P")} disabled/>
          </div>
          <div id= "quantityInput"><Input id="quantity" placeholder={this.state.quantity} onChange={(e) => this.handleChange(e)}/></div>
          <div id= "atPriceInput"><Input id="atPrice" placeholder={this.state.limitPrice} onChange={(e) => this.handleChange(e)}/></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  [
    <img id = "logo" className = "spin" src={logo}></img>,
    <h1 style={{paddingLeft:'60px'}}>Outsmart Options</h1>,
    <OptionsCalculator />
  ],
  document.getElementById('root')
);

function mapToObject(map) {
  let obj = Object.create(null);
  for (let [k,v] of map) {
      obj[k] = v;
  }
  return obj;
}

function objectToMap(object){
  var map = Object.entries(object)
  for(var value of map){
      value[1] = Object.entries(value[1])
  }
  return map
}