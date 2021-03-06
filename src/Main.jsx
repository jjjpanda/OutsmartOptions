// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Prompt,
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
import {
  utilique as util,
} from 'que-series';
import logo from './img/logo.png';

// CSS
import './css/logo.css';
import './css/index.less';
import { darkTheme, lightTheme } from './css/themes.js';

import SideMenuRoute from './components/SideMenu.jsx';
import HomePage from './pages/HomePage.jsx';
import OptionsCalculator from './pages/OptionsCalculator.jsx';
import Watchlist from './pages/Watchlist.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HelpPage from './pages/HelpPage.jsx';
import Checkout from './pages/checkout.jsx';

const { request } = util;

request.getFetchReq('https://api.ipify.org?format=jsoniuhb', {},
  (data) => {
    request.postFetchReq('/api/bug/track', JSON.stringify({ ip: data }), (data) => console.log(data));
  });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToGo: false,
    };
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          {/* <Prompt
            when={!this.state.readyToGo}
            message='You have unsaved changes, are you sure you want to leave?'
          /> */}
          <SideMenuRoute bypass={this.state.readyToGo} />
          <Layout>
            <Layout.Content>
              <div className="contentWrapper">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/calc" render={(props) => (<OptionsCalculator {...props} updateApp={(state) => { this.setState(() => ({ readyToGo: state.saved })); }} />)} />
                <Route exact path="/watch" component={Watchlist} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/help" component={HelpPage} />
                <Route exact path="/checkout" component={Checkout} />
              </div>

            </Layout.Content>
            <Layout.Footer>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a href="https://www.instagram.com/OutsmartOptions/">
                  Insta
                  {' '}
                  <Icon type="instagram" />
                </a>
                <a href="https://twitter.com/OutsmartO">
                  Twitter
                  {' '}
                  <Icon type="twitter" />
                </a>
                <a href="mailto:outsmartoptions@gmail.com?Subject=Hello%20Mr.Outsmart">
                  Email Us
                  {' '}
                  <Icon type="mail" />
                </a>
                <a href="https://www.reddit.com/r/OutsmartOptions/">
                  Reddit
                  {' '}
                  <Icon type="reddit" />
                </a>
              </span>
            </Layout.Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Main;
