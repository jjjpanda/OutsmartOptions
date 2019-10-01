import React from 'react';
import ReactDOM from 'react-dom';

import logo from './img/logo.png'

import {
  Input,
  version,
  Button,
} from 'antd';

const { Search } = Input

import "./css/logo.css";
import "./css/calculator.css";

class StockSymbol extends React.Component{
  constructor(props){
    super(props);
    this.state = {symbol:"", price:0};
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
        console.log(data)
        this.setState({symbol : e, price : data.price, priceChange : data.priceChange})
      }
    );
  };
  
  render() { return (
    <div className="App">
      <div className = "stockHeadings">
        <div className= "stockSymbolHeading">Stock Symbol:</div>
        <div className= "stockPriceHeading">Stock Price:</div>
        <div className= "priceChangeHeading">Stock Price Change:</div>
      </div>
      <div className="stockInputs">
        <div id="stockSymbolInput"><Search placeholder="Enter..." onSearch={this.onSearch}/></div>
        <div id="stockPriceBox"><Input placeholder={this.state.price} disabled/></div>
        <div id="priceChangeBox"><Input placeholder={this.state.priceChange} disabled/></div>
      </div>
    </div>);
  }
}

ReactDOM.render(
  [
    <img id = "logo" className = "spin" src={logo}></img>,
    <h1>Outsmart Options</h1>,
    <StockSymbol />
  ],
  document.getElementById('root')
);
