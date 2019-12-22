import React from 'react';
import {
  TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton,
} from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';
import './css/home.css';
import chart from './img/graphBackground.png';
import waves from './img/coolWaves.png';
import profit from './img/profitGraph.png';

import { BarLineComboGraph } from './components/Graphs';
import StockSymbol from './components/StockSymbol';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      exists: true,
      priceChange: 0,
      price: 0,
      historical: [],
    };
  }

    updateSearchResults = (state) => {
      this.setState(() => ({
        symbol: state.symbol,
        exists: state.exists,
        priceChange: state.priceChange,
        price: state.price,
        historical: state.historical,
      }));
    }


    render() {
      return (
        <body>
          <h1 className="text" id="title">Outsmart Options</h1>
          <div>
            <div className="symbol">
              <StockSymbol updateCallback={this.updateSearchResults} options={false} historical />
              <br />
              {this.state.historical != [] && this.state.historical.length > 1 ? <BarLineComboGraph data={this.state.historical} xKey="date" lineKey="close" barKey="volume" /> : null}

            </div>
            <div id="twitter">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="Outsmart Options"
                options={{ height: 100 }}
              />
              <a className="twitter-timeline" href="https://twitter.com/OutsmartO">Outsmart Options on Twitter</a>
              {' '}
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
            </div>
            <div className="instagram" id="insta1">
              <InstagramEmbed
                url="https://www.instagram.com/p/B5S-8Tshp51/"
                maxWidth={320}
                hideCaption={false}
                containerTagName="div"
                protocol=""
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
            </div>
          </div>
          <div />
        </body>
      );
    }
}

export default HomePage;
