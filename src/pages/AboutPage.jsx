import React from 'react';
import '../css/about.css';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>

        <h3 className="aStyle"><center>Outsmart Options</center></h3>

        <hr size="7" width="40%" align="center" color="green" />
        <br />
        <h3 className="bStyle" id="mission">
          <center>
            We’re a team of developers tired of the status quo.  We hate that online brokers think every-day
            investors don’t need complex data because they’re “amateurs”. You should have access to the same tools used by the pros in
            a market where every advantage counts. We created Outsmart Options so that every trader can plan their trades in a way that is beautiful to see,
            easy to use, and affordable to regular traders like us, and like you.
          </center>
        </h3>
        <br />
        <h3 className="bStyle"><center>Take a look around, the future of options trading is here</center></h3>
        <br />
        <hr size="7" width="40%" align="center" color="green" />

        <br />
        <br />
        <br />
        <br />
        <div id="contactInfo">
          <h2 className="dStyle">Feel free to contact our team</h2>
          <h2 className="cStyle">Feel free to contact the team with any questions</h2>
          <h2 className="cStyle">Email: help@outsmartoptions.com</h2>
          <h2 className="cStyle">Phone: 732-555-6969</h2>
          <h2 className="cStyle">1 Castle Point Terrace, Hoboken, New Jersey, 07030</h2>
        </div>
        <br />
        <br />

        <div id="disclaimers">
          <h2 className="eStyle"><center>Disclaimers</center></h2>
          <h3 className="fStyle"><center>Before placing any trades, please make sure you do the following</center></h3>
          <br />

          <h2 className="dStyle">Do your research</h2>
          <h1 className="cStyle">
            Our content is intended to be used for informational pursposes only. It is very important to do your own analysis before making any investment.
            You should not soley rely on this educational website for large financial decisions.
          </h1>
          <br />

          <h2 className="dStyle">Past Performance Does Not Predict Future Results</h2>
          <h1 className="cStyle">
            Past performance is not a guarantee of future return, nor is it necessarily indicative of future performance.
            Keep in mind that investing involves risk. The value of any options investment will fluctuate greatly over time and you will gain or lose money
          </h1>
          <br />

          <h2 className="dStyle">Some Data May be Delayed</h2>
          <h1 className="cStyle">
            In order to bring the best possible service at the lowest possible cost, Outsmart Options uses data that can be delayed by upt to 15 minutes.
            Because of this, the Outsmart Options team does not reccomend this website as a tool for active, intraday options trading.
            It is instead, a tool made for ordinary traders and investors to be more informed on options trades before they place them
          </h1>
        </div>
        <br />
        <br />


      </div>
    );
  }
}

export default AboutPage;
