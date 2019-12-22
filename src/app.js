//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Link, 
  Route 
} from 'react-router-dom' 
import {
  Icon,
  Layout,
  Menu,
  Switch,
  Anchor,
} from 'antd';
const Footer = Layout.Footer
const Sider = Layout.Sider
const Content = Layout.Content

//Files
import logo from './img/logo.png'

//CSS
import "./css/logo.css";
import "./css/calculator.less";

import HomePage from "./HomePage"
import OptionsCalculator from './OptionsCalculator'
import Watchlist from './Watchlist'
import AboutPage from './AboutPage'
import LoginPage from './LoginPage'
import HelpPage from './HelpPage'

import * as post from './jsLib/fetchLibrary.js'

fetch('https://api.ipify.org?format=jsoniuhb',
  {
    method: "get", 
    headers: {
      'Accept': 'application/json',
    }
  }
)
.then(res => res.text())
.then((data) => {
  console.log(data)
  post.fetchReq('/api/bug/track', JSON.stringify({ip : data}), "")
  }
);

class SideMenu extends React.Component {
  state = {
    collapsed: true,
    currentTab: 'index',
    toggleDarkMode: true,
    toggleTooltip: true,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      currentTab: e.key,
    });
  };

  toggleTooltips = () => {
    this.setState({
      toggleTooltip: !this.state.toggleTooltip
    })
    console.log('Toggled tooltip: ', + this.state.toggleTooltip);

  }

  render() {
    return (
      <Sider
          collapsible = {false} 
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{boxShadow:"1px 1px 2px 1px #888888", minHeight: '100vh'}}
        >
          <div className="logo" ><img key="mainLogo" id = "logo" className = "spin" src={logo}></img></div>
          <Menu theme="dark" defaultSelectedKeys={['index']} mode="inline" onClick={this.handleClick} >
            
            <Menu.Item key="index">
              <Icon type="home" />
              <Link to="/" >Home</Link>
            </Menu.Item>

            <Menu.Item key="calc">
              <Icon type="calculator" />
              <Link to="/calc" >Calculator</Link>
            </Menu.Item>

            <Menu.Item key="watch">
              <Icon type="eye" />
              <Link to="/watch" >Watchlist</Link>
            </Menu.Item>

            <Menu.Item key="login">
              <Icon type="login" />
              <Link to="/login" >Login</Link>
            </Menu.Item>

            <Menu.Item key="about">
              <Icon type="woman" />
              <Link to="/about" >About</Link>
            </Menu.Item>

            <Menu.Item key="help">
              <Icon type="question-circle-o" />
              <Link to="/help" >Help</Link>
            </Menu.Item>

            <Menu.Item key="darkmode">
              <Icon type="bulb" theme="filled" />
              <Link to="/home" >Toggle Darkmode</Link>
            </Menu.Item>

            <Menu.Item key="tooltip" onClick= {() => this.toggleTooltips()}>
              <Icon type="tool" theme="filled" />
              <Link to="/home" >Toggle Tooltips</Link>
            </Menu.Item>

          </Menu>
        </Sider>
    );
  }
}

ReactDOM.render(
  [
    <Router>
      <Layout style={{ minHeight: '100vh'}}>
          <SideMenu/>
        <Layout>
          <Content>
            <div className="contentWrapper">
              <Route exact path = "/" component = {HomePage}/>
              <Route exact path = "/calc" component = {OptionsCalculator}/> 
              <Route exact path = "/watch" component = {Watchlist} />
              <Route exact path = "/login" component = {LoginPage} />
              <Route exact path = "/about" component = {AboutPage} />
              <Route exact path = "/help" component = {HelpPage} />
            </div>
 
          </Content>
          <Footer>
          </Footer>
        </Layout>
      </Layout>
    </Router>
  ],
  document.getElementById('root')
);