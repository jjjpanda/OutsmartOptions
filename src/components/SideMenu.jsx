
// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter,
} from 'react-router-dom';
import {
  Icon,
  Layout,
  Menu,
  Switch,
  Anchor,
} from 'antd';
import Cookie from 'js-cookie';

// Files
import logo from '../img/logo.png';

// CSS
import '../css/logo.css';
import '../css/index.less';
import { darkTheme, lightTheme } from '../css/themes.js';

const { Footer } = Layout;
const { Sider } = Layout;
const { Content } = Layout;

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
      this.setState(() => ({
        toggleDarkMode: !this.state.toggleDarkMode,
      }), () => {
        Cookie.set('theme', this.state.toggleDarkMode);
      });
      console.log('Toggled darkmode: ', +this.state.toggleDarkMode);


      window.less.modifyVars(
        this.state.toggleDarkMode ? darkTheme : lightTheme,
      ).then((e) => console.log(e), (e) => console.log('error', e));
    }

    render() {
      console.log(this.props.location.pathname.match(/\/(.*[^\/])?/));
      return (
        <Sider
          collapsible={false}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ boxShadow: '1px 1px 2px 1px #000000', minHeight: '100vh' }}
        >
          <div className="logo"><img key="mainLogo" id="logo" src={logo} /></div>
          <Menu theme="dark" defaultSelectedKeys={this.props.location.pathname.match(/\/(.*[^\/])?/)} mode="inline" onClick={this.handleClick}>

            <Menu.Item key="/">
              <Icon type="home" />
              <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.Item key="/calc">
              <Icon type="calculator" />
              <Link to="/calc">Calculator</Link>
            </Menu.Item>

            <Menu.Item key="/watch">
              <Icon type="eye" />
              <Link to="/watch">Watchlist</Link>
            </Menu.Item>

            <Menu.Item key="/login">
              <Icon type="login" />
              <Link to="/login">Login</Link>
            </Menu.Item>

            <Menu.Item key="/about">
              <Icon type="woman" />
              <Link to="/about">About</Link>
            </Menu.Item>

            <Menu.Item key="/help">
              <Icon type="question-circle-o" />
              <Link to="/help">Help</Link>
            </Menu.Item>

            <Menu.Item key="darkmode" onClick={() => this.toggleDarkMode()}>
              <Icon type="bulb" theme="filled" />
            </Menu.Item>

            <Menu.Item key="tooltip" onClick={() => this.toggleTooltips()}>
              <Icon type="tool" theme="filled" />
            </Menu.Item>

            <Menu.Item key="/checkout" onClick={() => {}}>
              <Icon type="dollar" />
              <Link to="/checkout">Checkout</Link>
            </Menu.Item>

          </Menu>
        </Sider>
      );
    }
}

const SideMenuRoute = withRouter((props) => <SideMenu {...props} />);
export default SideMenuRoute;
