import React from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';
import './css/home.css'
import chart from './img/graphBackground.png'
import waves from'./img/coolWaves.png'
import profit from'./img/profitGraph.png'

import {NoAxisGraph} from './components/graphs.js'
import {StockSymbol} from './components/stock-symbol.js'

class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            symbol:"",
            exists: true,
            priceChange: 0, 
            price: 0,
            historical: []
        }
    }

    updateSearchResults = (state) => {
        this.setState(() => ({
          symbol: state.symbol,
          exists: state.exists,
          priceChange: state.priceChange, 
          price: state.price,
          historical: state.historical
        }))
    }
    
    render(){
        return (
        <body>
        <h1 class = 'text' id = 'title'>Outsmart Options</h1>
        <div class = 'symbol'>
            <StockSymbol updateCallback = {this.updateSearchResults} options={false} historical = {true}/>

            {this.state.historical != [] && this.state.historical.length > 1 ? <NoAxisGraph data = {this.state.historical} xKey = {'date'} dataKey = {'close'}></NoAxisGraph> : null}

        </div>
        
        
        <h2 class = 'text' id = 'firstText'>Welcome to the future of options trading</h2>
        <h2 class = 'text' id = 'testimony1'>This is the platform that puts the power of trading in your hands</h2>
        <h2 class = 'text' id = 'testimony2'>"Big nut" - Warren Buffett</h2>   
        

        <div class = 'instagram' id = 'insta1'>
            <InstagramEmbed
                url='https://www.instagram.com/p/B5S-8Tshp51/'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            />
        </div>
        
        <div id = 'twitter'>
             <TwitterTimelineEmbed
                sourceType="profile"
                screenName="Outsmart Options"
                options={{height: 200}}
                />
                <a class="twitter-timeline" href="https://twitter.com/OutsmartO">Outsmart Options on Twitter</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>

        <img class = 'backgrounds' id = 'wavesBackground' src = {waves}></img>
        <img class = 'backgrounds' id = 'chartBackground' src = {chart}></img>
        <img class = 'backgrounds' id = 'profitBackground' src = {profit}></img>
    
    </body>
    )}
}

export default HomePage