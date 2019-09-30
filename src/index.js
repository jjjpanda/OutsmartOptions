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
        this.setState({symbol : e, price : data.price})
      }
    );
  };
  
  render() { return (<div className="App">
      <div>
        <Search placeholder="Stock Symbol" enterButton onSearch={this.onSearch} />
        <pre>STOCK: {this.state.symbol}</pre>
        <pre>IS AT ${this.state.price}</pre>
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
