import React from 'react';
import ReactDOM from 'react-dom';
import "./css/logo.css"
import logo from './img/logo.png'

ReactDOM.render(
  [
    <img id = "logo" className = "spin" src={logo}></img>,
    <h1>Outsmart Options</h1>
  ],
  document.getElementById('root')
);
