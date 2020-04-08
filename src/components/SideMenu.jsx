
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
  Typography,
} from 'antd';
import Cookie from 'js-cookie';

// Files
import logo from '../img/logo.png';

// CSS
import '../css/logo.css';
import '../css/index.less';
import { darkTheme, lightTheme } from '../css/themes.js';

const Footer = Layout.Footer;
const Sider = Layout.Sider;
const Content = Layout.Content;

class SideMenu extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        collapsed: true,
        currentTab: 'index',
        toggleDarkMode: (Cookie.get('theme') === undefined ? false : Cookie.get('theme')) === 'true',
        toggleTooltip: true,
      };
      window.less.modifyVars(
        this.state.toggleDarkMode ? darkTheme : lightTheme,
      ).then((e) => console.log(e), (e) => console.log('error', e));
    }

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
      this.setState((state) => ({
        toggleTooltip: !state.toggleTooltip,
      }), () => {
        console.log('Toggled tooltip: ', +this.state.toggleTooltip);
      });
    }

    toggleDarkMode = () => {
      this.setState((state) => ({
        toggleDarkMode: !state.toggleDarkMode,
      }), () => {
        console.log('Toggled darkmode: ', +this.state.toggleDarkMode);
        Cookie.set('theme', this.state.toggleDarkMode, { expires: 365 });
        window.less.modifyVars(
          this.state.toggleDarkMode ? darkTheme : lightTheme,
        ).then((e) => console.log(e), (e) => console.log('error', e));
      });
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
              <Link to="/">
                <Icon type="home" />
                <Typography>Home</Typography>
              </Link>
            </Menu.Item>

            <Menu.Item key="/calc">
              <Link to="/calc">
                <Icon type="calculator" />
                <Typography>Calculator</Typography>
              </Link>
            </Menu.Item>

            <Menu.Item key="/watch">
              <Link to="/watch">
                <Icon type="eye" />
                <Typography>Watchlist</Typography>
              </Link>
            </Menu.Item>

            <Menu.Item key="/login">
              <Link to="/login">
                <Icon type="login" />
                <Typography>Login</Typography>
              </Link>
            </Menu.Item>

            <Menu.Item key="/about">
              <Link to="/about">
                <Icon type="info-circle-o" />
                <Typography>About</Typography>
              </Link>
            </Menu.Item>

            <Menu.Item key="/help">
              <Link to="/help">
                <Icon type="question-circle-o" />
                <Typography>Help</Typography>
              </Link>
            </Menu.Item>

            <Menu.Item key="darkmode" onClick={() => this.toggleDarkMode()}>
              <Icon type="bulb" theme="filled" />
              <Typography>Theme</Typography>
            </Menu.Item>

            <Menu.Item key="tooltip" onClick={() => this.toggleTooltips()}>
              <Icon type="tool" theme="filled" />
              <Typography>Toggle Tooltips</Typography>
            </Menu.Item>

            <Menu.Item key="/checkout" onClick={() => {}}>
              <Link to="/checkout">
                <Icon type="dollar" />
                <Typography>Checkout</Typography>
              </Link>
            </Menu.Item>

          </Menu>
        </Sider>
      );
    }
}

const SideMenuRoute = withRouter((props) => <SideMenu {...props} />);
export default SideMenuRoute;
