//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom' 
import {
  Icon,
  Layout,
  Menu,
  Anchor,
} from 'antd';
const { Footer, Sider, Content } = Layout;

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
              <Link to="/" ></Link>
            </Menu.Item>

            <Menu.Item key="calc">
              <Icon type="calculator" />
              <Link to="/calc" ></Link>
            </Menu.Item>

            <Menu.Item key="watch">
              <Icon type="eye" />
              <Link to="/watch" ></Link>
            </Menu.Item>

            <Menu.Item key="login">
              <Icon type="login" />
              <Link to="/login" ></Link>
            </Menu.Item>

            <Menu.Item key="help">
              <Icon type="question-circle-o" />
              <Link to="/help" ></Link>
            </Menu.Item>

          </Menu>
          </Anchor>
        </Sider>
    );
  }
}

ReactDOM.render(
  [
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
          <SideMenu/>
        <Layout>
          <Content>
          
            <Route exact path= "/calc" component = {OptionsCalculator}/> 
            <Route exact path = "/" />

          </Content>
          <Footer>
          </Footer>
        </Layout>
      </Layout>
    </Router>
  ],
  document.getElementById('root')
);