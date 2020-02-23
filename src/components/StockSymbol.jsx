import React from 'react';
import {
  Input,
  Icon,
  Card,
  AutoComplete,
  Button,
  Spin
} from 'antd';

import Cookie from 'js-cookie';
import HelpTooltip from './HelpTooltip.jsx';

import verifyUser from './UserVerifier.jsx';

import * as optionsMath from '../jsLib/optionsMathLibrary.js';
import * as timeMath from '../jsLib/timeLibrary.js';
import * as post from '../jsLib/fetchLibrary.js';
import * as outliers from '../jsLib/outliersLibrary.js';
import * as treasury from '../jsLib/treasuryLibrary.js';

const AutoCompleteOption = AutoComplete.Option;
const InputSearch = Input.Search;

import '../css/logo.css';

import logo from '../img/logo.png';
const spin = <Icon component={() => (<img key="mainLogo" id="logo" className="spin" src={logo} />)} />

class StockSymbol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      description: '',
      exists: true,
      priceChange: 0,
      price: 0,
      optionsChain: [['Empty', {}]],
      divYield: 0,
      historical: [],
      guess: [],
      inWatchlist: false,
      loading: false
    };
    verifyUser(({ loggedIn, user, email }) => {
      this.setState(() => ({ loggedIn }));
    });
  }

    notFound = (val) => {
      const e = val.trim();
      post.fetchReq('/api/market/guessSymbol', JSON.stringify({ text: e }), (data) => {
        data = JSON.parse(data);
        data = data.bestMatches.filter((e) => e['4. region'] === 'United States').filter((e) => e['3. type'] === 'Equity');
        console.log(data);
        this.setState(() => (
          {
            guess: data,
          }
        ));
      });
    }

    renderDropdown = () => this.state.guess.map((guess, i) => (
      <AutoCompleteOption key={guess['1. symbol']} value={guess['1. symbol']}>
        {guess['1. symbol']}
        <span>
          {' '}
          {guess['2. name']}
          {' '}
        </span>
      </AutoCompleteOption>
    ))

    onSearch = (val) => {
      this.setState(() => ({loading: true}))
      const e = val.toUpperCase().trim();
      this.setState(() => ({
        exists: true, symbol: e, guess: [], inWatchlist: false,
      }));

      post.fetchReq('/api/market/price', JSON.stringify({ ticker: e }), (data) => {
        console.log(data);
        if (data.price === undefined || data.price === null) {
          data.price = 0;
          data.change = 0;
          this.notFound(e);
          this.setState(() => ({ exists: false }), () => { this.props.updateCallback(this.state); });
        }
        this.setState(() => ({
          symbol: e, price: data.price, priceChange: data.change, description: data.name, optionsChain: [['Empty', {}]],
        }),
        () => {
          if (this.state.loggedIn) {
            post.fetchReqAuth('/api/watchlist/view', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id') }), (data) => {
              if (data.list.includes(e)) {
                this.setState(() => ({ inWatchlist: true }));
              }
            });
          } else {
            // Not Logged in, don't care
          }

          post.fetchReq('/api/market/earningsDate', JSON.stringify({ticker: e}), (data) => {
            this.setState(() => ({ earningsDate: data.earningsDate }), () => {
              this.props.updateCallback(this.state);
            });
          })

          post.fetchReq('/api/market/divYield', JSON.stringify({ ticker: e }), (data) => {
            this.setState(() => ({ divYield: data.dividendAnnum / this.state.price }), () => {
              this.props.updateCallback(this.state);
            });
          });
        });
      });

      if (this.props.options) {
        post.fetchReq('/api/market/chain', JSON.stringify({ ticker: e }), (data) => {
          if(data != null){
            data = data.filter((x) => {
              const callVolSum = x[1].map((x) => x.callVol).reduce((a, b) => a + b, 0);
              const putVolSum = x[1].map((x) => x.putVol).reduce((a, b) => a + b, 0);
              const callDist = outliers.setDistribution(x[1].map((x) => x.strike), x[1].map((x) => x.callVol));
              const putDist = outliers.setDistribution(x[1].map((x) => x.strike), x[1].map((x) => x.putVol));
              const callVolMean = outliers.getMean(callDist);
              const putVolMean = outliers.getMean(putDist);
              const callVolStd = outliers.getSD(callDist);
              const putVolStd = outliers.getSD(putDist);
              return [x[0], x[1].map((y, index) => {
                const rfir = treasury.getRightYield(this.props.yieldCurve || [], timeMath.timeBetweenDates(timeMath.stringToDate(x[0]), timeMath.getCurrentDate())) / 100;
                y.callIV = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.call, this.state.price, y.strike, true, rfir, this.state.divYield);
                y.putIV = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.put, this.state.price, y.strike, false, rfir, this.state.divYield);
                y.atmNess = x[1][index + 1] != undefined ? ((x[1][index].strike <= this.state.price && x[1][index + 1].strike > this.state.price) ? 'atmStrike' : '') : '';
                y.callOutlier = outliers.isOutlier(y.callVol, callVolSum, y.strike, callVolMean, callVolStd);
                y.putOutlier = outliers.isOutlier(y.putVol, putVolSum, y.strike, putVolMean, putVolStd);
                return y;
              })];
            });
  
            data = data.map((expiry) => {
              return [expiry[0], expiry[1].filter((strike) => {
                return (!isNaN(strike.callIV) && !isNaN(strike.putIV) && isFinite(strike.callIV) && isFinite(strike.putIV))
              })]
            })
  
            this.setState(() => ({ optionsChain: data, loading: false }), () => {
              this.props.updateCallback(this.state);
              console.log(this.state);
            });
          }
          else{
            this.setState(() => ({ optionsChain: [], loading: false }), () => {
              this.props.updateCallback(this.state);
              console.log(this.state);
            });
          }
        });
      }

      if (this.props.historical) {
        post.fetchReq('/api/market/historical', JSON.stringify({ ticker: e }), (data) => {
          this.setState(() => ({ historical: data, loading: false }), () => {
            console.log(this.state);
            this.props.updateCallback(this.state);
          });
        });
      }
    };

    onStarClick = () => {
      if (this.state.loggedIn) {
        if(this.state.symbol != ""){
          post.fetchReqAuth('/api/watchlist/edit', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id'), ticker: this.state.symbol }), (data) => {
            this.setState(() => ({ inWatchlist: data.list.includes(this.state.symbol) }));
          });
        }
      } else {
        // Not Logged in, reroute the uesr to login
      }
    }

    render() {
      return (
        <div>
          <div style={{ width: '60px', display: 'inline-block' }} />
          <div className="stockSymbol" step-name="stock-symbol-input">
            <div id="stockSymbolHeading">
              Stock Symbol:&nbsp;
              <HelpTooltip hide={false} title="Stonks" content="🙂 Pick a stonk, any stonk." />
            </div>
            <div id="stockSymbolInput">
              <div id="searchWrapper">
                <AutoComplete optionLabelProp="value" dataSource={this.renderDropdown()} dropdownMatchSelectWidth={false}>
                  <InputSearch placeholder="Enter..." onSearch={this.onSearch} />
                </AutoComplete>
              </div>
              <div id="exists">{this.state.exists && this.state.optionsChain ? null : (<Icon step-name="stock-nonexistent" type="close-circle" />)}</div>
            </div>
          </div>
          <div style={{ width: '43px', display: 'inline-block' }} />
          <div className="stockPrice" step-name="stock-price">
            <div id="stockPriceHeading">
              Stock Price:&nbsp;
              <HelpTooltip hide={false} title="Price" content={"Here's the stock price. United States Dollars, of course."} />
            </div>
            <div id="stockPriceBox"><Input placeholder={`$${this.state.price}`} disabled /></div>
          </div>
          <div style={{ width: '43px', display: 'inline-block' }} />
          <div className="stockPriceChange" step-name="stock-percent-change">
            <div id="priceChangeHeading">
              Stock Price Change:&nbsp;
              <HelpTooltip hide={false} title="%" content={"Here's the percent change for the day. This begins to update at 9:30 AM EST."} />
            </div>
            <div id="priceChangeBox"><Input placeholder={`${this.state.priceChange}%`} disabled /></div>
            <Button shape="circle" icon={this.state.inWatchlist ? 'minus' : 'star'} onClick={this.onStarClick} style={{ marginLeft: '5%' }} />

          </div>
          <div>
            <br />
            <div style={{ width: '60px', display: 'inline-block' }} />
            <div style={{ width: '410px', display: 'inline-block' }}>
              <Card>
                {this.state.description != null ? `${this.state.description} ${(this.state.optionsChain[0] != undefined ? '' : 'has no options chain')}` : "Stock Doesn't Exist"}
                {this.state.loading ? <Spin indicator={spin} /> : null}
              </Card>
            </div>
            <div style={{ width: '600px' }} />
          </div>
        </div>
      );
    }
}

export default StockSymbol;
