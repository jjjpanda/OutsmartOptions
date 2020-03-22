import React from 'react';
import {
  Input,
  Icon,
  Card,
  AutoComplete,
  Button,
  Spin,
} from 'antd';

import Cookie from 'js-cookie';
import {
  aesthetique as aes,
  mathematique as math,
  utilique as util,
} from 'que-series';
import * as moment from 'moment';
import HelpTooltip from './HelpTooltip.jsx';

import verifyUser from './UserVerifier.jsx';

// JS Libraries


import SpinningLogo from './SpinningLogo.jsx';

import '../css/logo.css';

const optionsMath = math.options;
const outliers = math.stats;
const { treasury } = math;


const { post } = util;

const AutoCompleteOption = AutoComplete.Option;
const InputSearch = Input.Search;

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
      historicalIV: [],
      guess: [],
      inWatchlist: false,
      loading: false,
    };
    verifyUser(({ loggedIn, user, email }) => {
      this.setState(() => ({ loggedIn }));
    });
  }

    notFound = (val) => {
      const e = val.trim();
      post.fetchReq('/api/market/guessSymbol', JSON.stringify({ text: e }), (data) => {
        console.log(data);
        this.setState(() => (
          {
            guess: data.error ? [] : data,
          }
        ));
      });
    }

    renderDropdown = () => this.state.guess.map((guess, i) => (
      <AutoCompleteOption key={guess.symbol} value={guess.symbol}>
        {guess.symbol}
        <span>
          {' '}
          {guess.name}
          {' '}
        </span>
      </AutoCompleteOption>
    ))

    onSearch = (val) => {
      this.setState(() => ({ loading: true }));
      const e = val.toUpperCase().trim();
      this.setState(() => ({
        exists: true, symbol: e, guess: [], inWatchlist: false, earningsDate: '', historicalIV: '', divYield: '',
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
        });
      });

      const checkFinished = () => {
        if (this.state.earningsDate != ' ' && this.state.historicalIV != '' && this.state.divYield != '') {
          this.setState(() => ({ loading: false }), () => this.props.updateCallback(this.state));
        }
      };

      post.fetchReq('/api/market/earningsDate', JSON.stringify({ ticker: e }), (data) => {
        this.setState(() => ({ earningsDate: data.earningsDate }), checkFinished);
      });

      post.fetchReq('/api/market/iv', JSON.stringify({ ticker: e }), (data) => {
        console.log(data.iv);
        const iv = data.iv.map((d) => ({
          date: d.date,
          iv: optionsMath.calculateIV(d.t, d.price, d.underlying, d.strike, true, 0, 0),
        }));
        console.log(iv);
        this.setState(() => ({ historicalIV: iv }), checkFinished);
      });

      post.fetchReq('/api/market/divYield', JSON.stringify({ ticker: e }), (data) => {
        this.setState(() => ({ divYield: data.dividendAnnum / this.state.price }), checkFinished);
      });

      if (this.props.options) {
        post.fetchReq('/api/market/chain', JSON.stringify({ ticker: e }), (data) => {
          if (data != null) {
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
                const rfir = treasury.getRightYield(this.props.yieldCurve || [], moment(x[0]).diff(moment(), 'days')) / 100;
                y.callIV = optionsMath.calculateIV(moment(x[0]).diff(moment(), 'days') / 365.0, y.call, this.state.price, y.strike, true, rfir, this.state.divYield);
                y.putIV = optionsMath.calculateIV(moment(x[0]).diff(moment(), 'days') / 365.0, y.put, this.state.price, y.strike, false, rfir, this.state.divYield);
                y.atmNess = x[1][index + 1] != undefined ? ((x[1][index].strike <= this.state.price && x[1][index + 1].strike > this.state.price) ? 'atmStrike' : '') : '';
                y.callOutlier = outliers.isOutlier(y.callVol, callVolSum, y.strike, callVolMean, callVolStd);
                y.putOutlier = outliers.isOutlier(y.putVol, putVolSum, y.strike, putVolMean, putVolStd);
                return y;
              })];
            });

            /*
            Filters NaN
            data = data.map((expiry) => {
              return [expiry[0], expiry[1].filter((strike) => {
                return (!isNaN(strike.callIV) && !isNaN(strike.putIV) && isFinite(strike.callIV) && isFinite(strike.putIV))
              })]
            })
            */

            this.setState(() => ({ optionsChain: data }), () => {
              this.props.updateCallback(this.state);
              console.log(this.state);
            });
          } else {
            this.setState(() => ({ optionsChain: [] }), () => {
              this.props.updateCallback(this.state);
              console.log(this.state);
            });
          }
        });
      }

      if (this.props.historical) {
        post.fetchReq('/api/market/historical', JSON.stringify({ ticker: e }), (data) => {
          this.setState(() => ({ historical: data }), () => {
            console.log(this.state);
          });
        });
      }
    };

    onStarClick = () => {
      if (this.state.loggedIn) {
        if (this.state.symbol != '') {
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
                {this.state.loading ? <SpinningLogo /> : null}
              </Card>
            </div>
            <div style={{ width: '600px' }} />
          </div>
        </div>
      );
    }
}

export default StockSymbol;
