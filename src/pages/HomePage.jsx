import React from 'react';
import TwitterFeed from '../components/TwitterFeed.jsx';
import '../css/home.css';

import { BarLineComboGraph } from '../components/Graphs.jsx';
import StockSymbol from '../components/StockSymbol.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      exists: true,
      priceChange: 0,
      price: 0,
      historical: [],
      historicalIV: [],
    };
  }

    updateSearchResults = (state) => {
      this.setState(() => ({
        symbol: state.symbol,
        exists: state.exists,
        priceChange: state.priceChange,
        price: state.price,
        historical: state.historical,
        historicalIV: state.historicalIV,
      }), () => console.log(this.state));
    }

    render() {
      return (
        <div>
          <h1 className="text" id="title">Outsmart Options</h1>
          <div>
            <div className="symbol">
              <StockSymbol updateCallback={this.updateSearchResults} options={false} historical />
              <br />
              {this.state.historical != [] && this.state.historical.length > 1 ? <BarLineComboGraph data={this.state.historical} xKey="date" lineKey="close" barKey="volume" /> : null}
              {this.state.historicalIV != [] && this.state.historicalIV.length > 1 ? <BarLineComboGraph data={this.state.historicalIV} xKey="date" lineKey="iv" barKey="volume" /> : null}

            </div>
            <div id="twitter">
              <TwitterFeed key={this.state.symbol} symbol={this.state.symbol} />
            </div>
          </div>
          <div />
        </div>
      );
    }
}

export default HomePage;
