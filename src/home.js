import React from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';
import './css/home.css'
import chart from './img/graphBackground.png'
import waves from'./img/coolWaves.png'
import profit from'./img/profitGraph.png'
class HomePage extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
        <body>
        
        <h1 class = 'title'>Outsmart Options</h1>
        <img class = 'backgrounds' id = 'chartBackground' src = {chart}></img>
        <img class = 'backgrounds' id = 'wavesBackground' src = {waves}></img>
        <img class = 'backgrounds' id = 'profitBackground' src = {profit}></img>

        <h2 class = 'firstText'>Welcome to the future of options trading</h2>
        <h2 class = 'testimony1'>This is the platform that puts the power of trading in your hands</h2>
        <h2 class = "testimony2">"Technology that changed the way I see options" - Houston, 22</h2>
        <h2 class = 'testimony3'>"Big nut" - Warren Buffett</h2>
        
        
        
        <div class = 'instagram' id = 'insta1'>
            <InstagramEmbed
                url='https://www.instagram.com/p/B5JC05qpw2g/'
                maxWidth={320}
                hideCaption={true}
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
        <br />
    
    </body>
    )}
}

export default HomePage