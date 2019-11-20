import React from 'react';
import {
    Button,
    Modal,
  } from 'antd';

class Help extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            guideModalVisible: false
        };
    }

    setGuideModalVisible(guideModalVisible) {
        this.setState({ guideModalVisible: guideModalVisible });
    }

    render(){ return (
        
        <div id = "Guides">
            <h1>Helpful Guides</h1>
            <Button onClick = {() => this.setGuideModalVisible(true)}>Guide 1</Button>
            <div>
                <Modal
                    title="Guide1"
                    centered
                    width = {"50%"}
                    visible={this.state.guideModalVisible}
                    footer = {(
                        <Button key="ok" type="primary" onClick = {() => this.setGuideModalVisible(false)}>
                            Ok
                        </Button>
                    )}
                    onCancel = {() => this.setGuideModalVisible(false)}>
                </Modal>
            </div>
            <br></br>
            <br></br>

            <h1>Contact Us</h1>
            <p>Feel free to contact the team with any questions</p>
            <p>Email: help@outsmart.com</p>
            <p>Phone: 732-555-6969</p>
            <br></br>
            <br></br>

            <h2>Disclaimers</h2>
            <h3>Before placing any trades, please make sure you do the following</h3>
            <br></br>

            <h2>Do your research!</h2>
            <p>Our content is intended to be used for informational pursposes only. It is very important to do your own analysis before making any investment.</p>
            <p>You should not soley rely on this educational website for large financial decisions.</p>
            <br></br>

            <h2>Past Performance Does Not Predict Future Results</h2>
            <p>Past performance is not a guarantee of future return, nor is it necessarily indicative of future performance.</p>
            <p>Keep in mind that investing involves risk. The value of any options investment will fluctuate greatly over time and you will gain or lose money</p>
            <br></br>
            
            <h2>Some Data May be Delayed</h2>
            <p>In order to bring the best possible service at the lowest possible cost, Outsmart Options uses data that can be delayed by upt to 15 minutes.</p>
            <p>Because of this, the Outsmart Options team does not reccomend this website as a tool for active, intraday options trading.</p>
            <p>It is instead, a tool made for ordinary traders and investors to be more informed on options traddes before they place them</p>
        </div>

       );
    }
}

export default Help;
