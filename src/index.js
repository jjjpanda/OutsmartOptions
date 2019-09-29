import React from 'react';
import ReactDOM from 'react-dom';

import logo from './img/logo.png'

import {
  Input,
  version,
  Button,
} from 'antd';

import "./css/logo.css";

class StockSymbol extends React.Component{
  constructor(props){
    super(props);
    this.state = {data:0};
  }

  onChange = e => {
    e.persist()
    //console.log(e);
    this.setState({ data: e.target.value });
  };
  
  render() { return (<div className="App">
      <div>
        <Input placeholder="input with clear icon" allowClear onChange={this.onChange} />
        <pre>{this.state.data}</pre>
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
