import React from 'react';
import {
    Button,
    Modal,
    Carousel,
  } from 'antd';

class Help extends React.Component{
    constructor(props){
        super(props)
    }

    guide1(){
        Modal.info({
            title:"Guide 1",
            content: (
                <Carousel arrows >
                        <div>
                            <p>Lesson 1: Bruh</p>
                            <img src = "/img/b_1.gif" alt = "pie" height = "150" width = "250"></img>
                        </div>
                        <div>
                            <p>End lesson</p>
                        </div>
                </Carousel>
            )
        });
    }

    guide2(){
        Modal.info({
            title:"Guide 2",
            content: (
                <Carousel arrows >
                        <div>
                            <p>Lesson 2: What are options ?</p>
                        </div>
                        <div>
                            <p>End Lesson</p>
                        </div>
                </Carousel>
            )
        });
    }

    guide3(){
        Modal.info({
            title:"Guide 3",
            content: (
                <Carousel arrows >
                        <div>
                            <p>Lesson 3: Buy High Sell Low</p>
                        </div>
                        <div>
                            <p>End of Lesson</p>
                        </div>
                </Carousel>
            )
        });
    }


    render(){ return (
        
        <div id = "Guides">
            <h2>Helpful Guides</h2>

            <Button onClick = {() => this.guide1()}>Guide 1</Button>
            <br></br><br></br>
            <Button onClick = {() => this.guide2()}>Guide 2</Button>
            <br></br><br></br>
            <Button onClick = {() => this.guide3()}>Guide 3</Button>
            <br></br><br></br>

            <h2>Contact Us</h2>
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

export {Help};
