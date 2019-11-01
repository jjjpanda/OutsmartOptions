//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
  Input,
  version,
  Button,
  Switch,
  Modal,
  Table,
  Collapse,
  Checkbox,
  Icon,
  Layout,
  Menu,
  Anchor,
} from 'antd';
const { Search } = Input
const { Panel } = Collapse
const { Header, Footer, Sider, Content } = Layout;
import {XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend} from 'recharts';

//JS Libraries
import * as optionsMath from './jsLib/optionsMathLibrary.js'
import * as timeMath from './jsLib/timeLibrary.js'
import * as structure from './jsLib/structuresEditingLibrary.js'
import * as post from './jsLib/fetchLibrary.js'
import * as outliers from './jsLib/outliersLibrary.js'

//Files
import logo from './img/logo.png'

//CSS
import "./css/logo.css";
import "./css/calculator.less";

import OptionsCalculator from './calc.js'

class SideMenu extends React.Component {
  state = {
    collapsed: false,
    currentTab: 'index',
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

  render() {
    return (
      <Router>
      <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{boxShadow:"1px 1px 5px 1px #888888"}}
        >
          <div className="logo" ><img key="mainLogo" id = "logo" className = "spin" src={logo}></img>/></div>
          <Anchor>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
            <Menu.Item key="index">
              <Icon type="home" />
            </Menu.Item>
            <Menu.Item key="calc">
              <Icon type="calculator" />
            </Menu.Item>
            <Menu.Item key="watch">
              <Icon type="eye" />
            </Menu.Item>
            <Menu.Item key="login">
              <Icon type="login" />
            </Menu.Item>
            <Menu.Item key="help">
            <Icon type="question-circle-o" />
            </Menu.Item>
          </Menu>
          </Anchor>
        </Sider>
        </Router>
    );
  }
}

ReactDOM.render(
  [
    <Layout style={{ minHeight: '100vh' }}>
        <SideMenu/>
      <Layout>
        <Content>
        <OptionsCalculator key="theVoiceOfThePeople"/>
        
        </Content>
        <Footer>
        </Footer>
      </Layout>
    </Layout>
  ],
  document.getElementById('root')
);