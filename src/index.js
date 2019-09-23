import React from 'react';
import ReactDOM from 'react-dom';
import "./css/logo.css"
import logo from './img/logo.png'

ReactDOM.render(
  <img id = "logo" class = "spin" src={logo}></img>,
  document.getElementById('root')
);
