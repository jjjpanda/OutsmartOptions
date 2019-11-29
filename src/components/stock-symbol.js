import React from 'react'
import {
    Input,
    Icon,
    Menu, 
    Dropdown
} from 'antd';
const { Search } = Input
import {HelpTooltip} from "./help-tooltip.js"

import * as optionsMath from '../jsLib/optionsMathLibrary.js'
import * as timeMath from '../jsLib/timeLibrary.js'
import * as post from '../jsLib/fetchLibrary.js'
import * as outliers from '../jsLib/outliersLibrary.js'
import * as treasury from '../jsLib/treasuryLibrary.js'

class StockSymbol extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        symbol:"",
        exists: true,
        priceChange: 0, 
        price: 0,
        optionsChain: [['Empty',{}]],
        divYield : 0,
        historical: [],
        guess: []
      }
    }

    notFound = e => {
      post.fetchReq('/guessSymbol', JSON.stringify({text: e}), (data) => {
        data = JSON.parse(data)
        data = data['bestMatches'].filter(e => e['4. region'] === "United States")
        console.log(data)
        this.setState(() => (
          {
            guess : data
          }
        ))
      })
    }

    renderDropdown = () => {
      return (
      <Menu>
      {this.state.guess.map((guess, i) => {
        return (
          <Menu.Item key = {i}>
            <div>
              {guess['1. symbol']} - {guess['2. name']} 
            </div>
          </Menu.Item>
        )
      })}
      </Menu>
      )
    }
  
    onSearch = e => {
        this.setState(() => ({exists: true, symbol: e, guess: []}))
        
        post.fetchReq('/price', JSON.stringify({ticker: e}), (data) => {
          console.log(data);
          if (data.price === undefined || data.price === null){
            data.price = 0;
            data.change = 0;
            this.notFound(e)
            this.setState(() => ({exists: false}), () => {this.props.updateCallback(this.state)});
          }
          this.setState(() => ({symbol : e, price : data.price, priceChange : data.change, optionsChain: [['Empty', {}]]}), 
            () => {
                post.fetchReq('/divYield', JSON.stringify({ticker: e}), (data) => {
                    this.setState(() => ({divYield : data.dividendAnnum/this.state.price}), () => {
                        this.props.updateCallback(this.state)
                    })
                })
            }); 
        })
    
        if(this.props.options){
        post.fetchReq('/chain', JSON.stringify({ticker: e}), (data) => {
        data = data.filter((x)=>{
            var callVolSum = x[1].map(x => x.callVol).reduce((a,b) => a + b, 0)
            var putVolSum = x[1].map(x => x.putVol).reduce((a,b) => a + b, 0) 
            var callDist = outliers.setDistribution(x[1].map(x => x.strike), x[1].map(x => x.callVol))
            var putDist = outliers.setDistribution(x[1].map(x => x.strike), x[1].map(x => x.putVol)) 
            var callVolMean = outliers.getMean(callDist);
            var putVolMean = outliers.getMean(putDist)
            var callVolStd = outliers.getSD(callDist, callVolMean)
            var putVolStd = outliers.getSD(putDist, putVolMean)
            return [x[0], x[1].map((y, index)=>{
                var rfir = treasury.getRightYield(this.props.yieldCurve || [], timeMath.timeBetweenDates(timeMath.stringToDate(x[0]),timeMath.getCurrentDate())) / 100
                y['callIV'] = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.call, this.state.price, y.strike, true, rfir,this.state.divYield);
                y['putIV'] = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.put, this.state.price, y.strike, false, rfir,this.state.divYield);
                y['atmNess'] = x[1][index+1] != undefined ? ( (x[1][index].strike <= this.state.price && x[1][index+1].strike > this.state.price) ? "atmStrike" : "" ) : ""; 
                y['callOutlier'] =  outliers.isOutlier(y.callVol, callVolSum, y.strike, callVolMean, callVolStd)
                y['putOutlier'] = outliers.isOutlier(y.putVol, putVolSum, y.strike, putVolMean, putVolStd)
                return y    
            })]
        })
        this.setState(() => ({optionsChain: data}), () => {
            this.props.updateCallback(this.state)
            console.log(this.state)
        });
        })
        }

        if(this.props.historical){
            post.fetchReq('/historical', JSON.stringify({ticker: e}), (data) => {
                this.setState(() => ({historical : data}), () => {
                    this.props.updateCallback(this.state)
                })
            })
        }
    
    };
     
    render() {
      return (
        <div>
          <div style={{width:'60px', display: 'inline-block'}}/>
          <div className = "stockSymbol" step-name = "stock-symbol-input">
            <div id= "stockSymbolHeading">
              Stock Symbol:&nbsp;
              <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            </div>
            <div id="stockSymbolInput">
                <div id="searchWrapper">
                  <Dropdown overlay= {this.renderDropdown()}>
                    <Search placeholder="Enter..." onSearch={this.onSearch}/>
                  </Dropdown>
                </div>
              <div id="exists">{this.state.exists ? null:(<Icon step-name = "stock-nonexistent" type="close-circle" />)}</div>
            </div>
          </div>
          <div style={{width:'43px', display: 'inline-block'}}/>
          <div className="stockPrice" step-name = "stock-price" >
            <div id= "stockPriceHeading">
              Stock Price:&nbsp;
              <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            </div> 
            <div id="stockPriceBox"><Input placeholder={"$"+this.state.price} disabled/></div>
          </div>
          <div style={{width:'43px', display: 'inline-block'}}/>
          <div className="stockPriceChange" step-name="stock-percent-change">
            <div id= "priceChangeHeading">
              Stock Price Change:&nbsp;
              <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            </div>
            <div id="priceChangeBox"><Input placeholder={this.state.priceChange+"%"} disabled/></div>
          </div>
        </div>
      );
    }
}

export {StockSymbol}