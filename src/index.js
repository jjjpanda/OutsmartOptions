import React from 'react';
import ReactDOM from 'react-dom';

import logo from './img/logo.png'

import {
  Input,
  version,
  Button,
} from 'antd';

import "./css/logo.css"

const onChange = e => {
  console.log(e);
};

ReactDOM.render(
  [
    <img id = "logo" className = "spin" src={logo}></img>,
    <h1>Outsmart Options</h1>,
    <div className="App">
      <div>
        <Input placeholder="input with clear icon" allowClear onChange={onChange} />
      </div>
    </div>
  ],
  document.getElementById('root')
);
