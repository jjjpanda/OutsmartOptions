import React from 'react';
import {
  Input,
  Icon,
  Card,
  AutoComplete,
  Button,
  Spin,
  Progress
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


const { request } = util;

const AutoCompleteOption = AutoComplete.Option;
const InputSearch = Input.Search;

class StockSymbol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
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
      request.postFetchReq('/api/market/guessSymbol', JSON.stringify({ text: e }), (data) => {
        console.log(data);
        this.setState(() => (
          {
            guess: data.error ? [] : data.guesses,
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
      if(val === this.state.symbol || val == ""){
        return
      }
      this.setState(() => ({ 
        loading: true, 
        exists: true, 
        symbol: e, 
        guess: [], 
        inWatchlist: false, 
        earningsDate: '', 
        historicalIV: '', 
        divYield: '',
        progress: 0
      }));
      const e = val.toUpperCase().trim();

      if (this.state.loggedIn) {
        request.postFetchReqAuth('/api/watchlist/view', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id') }), (data) => {
          if (data.list.includes(e)) {
            this.setState(() => ({ inWatchlist: true }));
          }
        });
      } else {
        // Not Logged in, don't care
      }

      request.postFetchReq('/api/market/quote', JSON.stringify({ ticker: e}), (data) => {
        let {quote} = data
        if(quote.found){
          this.setState(() => ({ 
            symbol: e, 
            price: quote.price, 
            priceChange: quote.change, 
            description: quote.name, 
            earningsDate: quote.earningsDate,
            divYield: quote.divYield,
            optionsChain: [['Empty', {}]], 
            progress: 25 
          }), () => {
            request.postFetchReq('/api/market/historical', JSON.stringify({ ticker: e }), (data) => {
              this.setState(() => ({ historical: data.historical, progress: 50 }), () => {
                console.log(this.state);
                request.postFetchReq('/api/market/chain', JSON.stringify({ ticker: e }), (data) => {
                  this.setState(() => ({ optionsChain: data.chain, progress: 75 }), () => {
                      request.postFetchReq('/api/market/iv', JSON.stringify({ ticker: e }), (data) => {
                        let iv = data.historicalIV
                        this.setState(() => ({ historicalIV: iv, loading: false, progress: 100 }), () => {
                          this.props.updateCallback(this.state); 
                        });
                      });
                    }
                  )
                })
              });
            });
            
          })
        }
        else{
          this.notFound(e);
          this.setState(() => ({ price: 0, priceChange: 0, exists: false }), 
            () => { this.props.updateCallback(this.state); 
          });
        }
      })

    };

    onStarClick = () => {
      if (this.state.loggedIn) {
        if (this.state.symbol != '') {
          request.postFetchReqAuth('/api/watchlist/edit', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id'), ticker: this.state.symbol }), (data) => {
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
                {this.state.loading ? <Progress percent={this.state.progress} status={"active"} /> : null}
              </Card>
            </div>
            <div style={{ width: '600px' }} />
          </div>
        </div>
      );
    }
}

export default StockSymbol;
