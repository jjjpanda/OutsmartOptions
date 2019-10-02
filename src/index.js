import React from 'react';
import ReactDOM from 'react-dom';

import logo from './img/logo.png'

import {
  Input,
  version,
  Button,
  Switch,
} from 'antd';

const { Search } = Input

import "./css/logo.css";
import "./css/calculator.css";

class StockSymbol extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      symbol:"", 
      price: 0,
      buyOrWrite: true,
      quantity: 0,
      atPrice: 0,
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
  };

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
    console.log(this.state);
  }

  handleSwitchChange(checked) {
    this.setState({buyOrWrite: checked})
    console.log(`switch to ${checked}`);
    console.log(this.state);
  }
  
  render() { return (
    <div className="App">
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
      <div className="optionsHeadings">
        <div id= "buyWriteHeading">Buy or Write:</div>
        <div id= "contractHeading">Contract:</div>
        <div id= "xHeading">x</div>
        <div id= "quantityHeading">Quantity:</div>
        <div id= "atPriceHeading">At Price:</div>
      </div>
      <div className="optionsInputs">
        <div id= "buyWriteSwitch"><Switch checkedChildren="Buy" unCheckedChildren="Write" defaultChecked onChange={(e) => this.handleSwitchChange(e)}/></div>
        <div id= "contractBox"><Input placeholder="Contract" disabled/></div>
        <div id= "quantityInput"><Input id="quantity" placeholder="Enter..." onChange={(e) => this.handleChange(e)}/></div>
        <div id= "atPriceInput"><Input id="atPrice" placeholder="Enter..." onChange={(e) => this.handleChange(e)}/></div>
        <div id= "editButton"><Button shape="circle" icon="edit" /></div>
        <div id= "removeButton"><Button shape="circle" icon="delete" /></div>
      </div>
      <div className="optionsButtons">
        <div id= "addLegButton"><Button icon="plus">Add Leg</Button></div>
        <div id= "ivSkewButton"><Button icon="profile">IV Skew</Button></div>
        <div id= "strategyButton"><Button icon="fund">Strategy</Button></div>
        <div id= "calculateButton"><Button type="primary">Calculate</Button></div>
        <div id= "saveButton"><Button shape="circle" icon="save" /></div>
      </div>
    </div>);
  }
}

ReactDOM.render(
  [
    <img id = "logo" className = "spin" src={logo}></img>,
    <h1 style={{paddingLeft:'60px'}}>Outsmart Options</h1>,
    <StockSymbol />
  ],
  document.getElementById('root')
);
