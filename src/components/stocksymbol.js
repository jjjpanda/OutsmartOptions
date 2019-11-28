import React from 'react'
import {
    Input,
    Icon,
} from 'antd';
const { Search } = Input
import {HelpTooltip} from "./help-tooltip.js"

class StockSymbol extends React.Component {
    constructor(props){
      super(props);
  
    }
  
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
                <div id="searchWrapper"><Search placeholder="Enter..." onSearch={this.props.onSearch}/></div>
              <div id="exists">{this.props.exists ? null:(<Icon step-name = "stock-nonexistent" type="close-circle" />)}</div>
            </div>
          </div>
          <div style={{width:'43px', display: 'inline-block'}}/>
          <div className="stockPrice" step-name = "stock-price" >
            <div id= "stockPriceHeading">
              Stock Price:&nbsp;
              <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            </div> 
            <div id="stockPriceBox"><Input placeholder={"$"+this.props.price} disabled/></div>
          </div>
          <div style={{width:'43px', display: 'inline-block'}}/>
          <div className="stockPriceChange" step-name="stock-percent-change">
            <div id= "priceChangeHeading">
              Stock Price Change:&nbsp;
              <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            </div>
            <div id="priceChangeBox"><Input placeholder={this.props.priceChange+"%"} disabled/></div>
          </div>
        </div>
      );
    }
}

export {StockSymbol}