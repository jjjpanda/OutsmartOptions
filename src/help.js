import React from 'react';
import {
    Modal,
    Carousel,
    Button,
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


    render(){
        return(
            <div>
                <h1>Helpful Guides</h1>

                <Button onClick = {() => this.guide1()}>Guide 1</Button>
                <br></br><br></br>
                <Button onClick = {() => this.guide2()}>Guide 2</Button>
                <br></br><br></br>
                <Button onClick = {() => this.guide3()}>Guide 3</Button>
                <br></br><br></br>

            </div>
               
        )
        
    }
}

export default Help;
