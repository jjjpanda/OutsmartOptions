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
import HomePage from './HomePage.jsx';
import OptionsCalculator from './OptionsCalculator.jsx';
import Watchlist from './Watchlist.jsx';
import AboutPage from './AboutPage.jsx';
import LoginPage from './LoginPage.jsx';
import HelpPage from './HelpPage.jsx';
import Checkout from './checkout.jsx';


const { post } = util;

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

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenuRoute />
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
      </Router>
    );
  }
}

ReactDOM.render(
  [
    <App />,
  ],
  document.getElementById('root'),
);
