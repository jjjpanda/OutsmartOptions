import React from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
class HomePage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
        <div style={{paddingLeft:'60px', paddingTop:'20px'}}>
             <TwitterTimelineEmbed
                sourceType="profile"
                screenName="Outsmart Options"
                options={{height: 400}}
                />
                <a class="twitter-timeline" href="https://twitter.com/OutsmartO">Outsmart Options on Twitter</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            <br />
            <div> 
                What up Youtube. 
                <br />
                You're probably here for the calculator, 
                <br />
                so just click the calculator button at the side.
                <br />
            </div>
        </div>
    )}
}

export default HomePage