// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';
import {
  Icon,
  Layout,
  Menu,
  Switch,
  Anchor,
} from 'antd';

// Files
import logo from './img/logo.png';

// CSS
import './css/logo.css';
import './css/index.less'
import {darkTheme, lightTheme} from './css/themes.js'

import HomePage from './HomePage.jsx';
import OptionsCalculator from './OptionsCalculator.jsx';
import Watchlist from './Watchlist.jsx';
import AboutPage from './AboutPage.jsx';
import LoginPage from './LoginPage.jsx';
import HelpPage from './HelpPage.jsx';
import Checkout from './Checkout.jsx';

import * as post from './jsLib/fetchLibrary.js';

const { Footer } = Layout;
const { Sider } = Layout;
const { Content } = Layout;

fetch('https://api.ipify.org?format=jsoniuhb',
  {
    method: 'get',
    headers: {
      Accept: 'application/json',
    },
  })
  .then((res) => res.text())
  .then((data) => {
    console.log(data);
    post.fetchReq('/api/bug/track', JSON.stringify({ ip: data }), (data) => console.log(data));
  });


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
      toggleTooltip: !this.state.toggleTooltip,
    });
    console.log('Toggled tooltip: ', +this.state.toggleTooltip);
  }

  toggleDarkMode = () => {
    this.setState({
      toggleDarkMode: !this.state.toggleDarkMode,
    });
    console.log('Toggled darkmode: ', +this.state.toggleDarkMode);

    window.less.modifyVars(
      this.state.toggleDarkMode ? darkTheme : lightTheme
      /*
      '@primary-color': '#1890ff',
      '@info-color': '#1890ff',
      '@warning-color': '#faad14',
      '@highlight-color': '#f5222d',
      '@body-background': '#fffffe',
      '@component-background': '#fffffd',
      '@heading-color': '#000000',
      '@text-color': '#000001',
      //'@text-color-secondary': 'fade(#000, 45%)',
      //'@border-color-base': 'hsv(0, 0, 85%)',
      //'@border-color-split': 'hsv(0, 0, 91%)',
      '@layout-body-background': '#f0f2f5',
      '@layout-header-background': '#001529',
      '@layout-sider-background': '#f0f2f5',
      '@layout-trigger-background': '#002140',
      '@layout-trigger-color': '#fffffc',
      //'@disabled-color': 'fade(#000, 25%)',
      //'@background-color-light': 'hsv(0, 0, 98%)',
      //'@background-color-base': 'hsv(0, 0, 96%)',
      '@item-active-bg': '#1890fe',
      '@item-hover-bg': '#1890fd,',
      '@btn-default-bg': '#',
      '@input-bg': '#fffffb',
      '@popover-bg': '#fffffe',
      '@menu-dark-submenu-bg': '#171F22',
      //'@table-header-bg': 'hsv(0, 0, 98%)',
      //'@table-row-hover-bg': 'hsv(0, 0, 98%)',
      '@table-selected-row-bg': '#1890ff',
      '@table-expanded-row-bg': '#fbfbfb',
      //'@tag-default-bg': 'hsv(0, 0, 98%)',
      //'@collapse-header-bg': 'hsv(0, 0, 98%)',
      //'@card-head-color': 'fade(#000, 85%)',
      '@card-head-background': '#ff7f75',
      '@card-actions-background': '#364889',
      '@card-background': '#cfd8dc',
    */
    ).then ((e) => console.log(e), (e) => console.log('error', e));
  }

  render() {
    return (
      <Sider
        collapsible={false}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        style={{ boxShadow: '1px 1px 2px 1px #888888', minHeight: '100vh' }}
      >
        <div className="logo"><img key="mainLogo" id="logo" src={logo} /></div>
        <Menu theme="dark" defaultSelectedKeys={['index']} mode="inline" onClick={this.handleClick}>

          <Menu.Item key="index">
            <Icon type="home" />
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="calc">
            <Icon type="calculator" />
            <Link to="/calc">Calculator</Link>
          </Menu.Item>

          <Menu.Item key="watch">
            <Icon type="eye" />
            <Link to="/watch">Watchlist</Link>
          </Menu.Item>

          <Menu.Item key="login">
            <Icon type="login" />
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item key="about">
            <Icon type="woman" />
            <Link to="/about">About</Link>
          </Menu.Item>

          <Menu.Item key="help">
            <Icon type="question-circle-o" />
            <Link to="/help">Help</Link>
          </Menu.Item>

          <Menu.Item key="darkmode" onClick={() => this.toggleDarkMode()}>
            <Icon type="bulb" theme="filled" />
          </Menu.Item>

          <Menu.Item key="tooltip" onClick={() => this.toggleTooltips()}>
            <Icon type="tool" theme="filled" />
          </Menu.Item>

          <Menu.Item key="checkout" onClick={() => this.checkout()}>
            <Icon type="dollar" />
            <Link to="/checkout">Checkout</Link>
          </Menu.Item>


        </Menu>
      </Sider>
    );
  }
}

ReactDOM.render(
  [
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
          <Content>
            <div className="contentWrapper">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/calc" component={OptionsCalculator} />
              <Route exact path="/watch" component={Watchlist} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/help" component={HelpPage} />
              <Route exact path="/checkout" component={Checkout} />
            </div>

          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Router>,
  ],
  document.getElementById('root'),
);
