import React from 'react';
import {
    Modal,
    Carousel,
    Button,
    Card,
    Col,
    Row,
    Icon,
} from 'antd';

class Help extends React.Component{
    constructor(props){
        super(props)
    }

    guide1(){

        Modal.info({
            title:"Guide 1",
            content: (
                <Carousel arrows>
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
                <Carousel arrows>
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

            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card 
                            title="Guide1" 
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            }
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide1()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click A Button
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Guide2"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            }
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide2()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click Something
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Guide3"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            } 
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide3()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click Click 
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card 
                            title="Guide1"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            } 
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide1()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click A Button
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Guide2"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            }
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide2()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click Something
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Guide3"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            } 
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide3()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click Click 
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card 
                            title="Guide1"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            } 
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide1()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click A Button
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Guide2"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            } 
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide2()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click Something
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Guide3"
                            cover = {
                                <img alt ="outsmart" src = "/img/logo.png" width = "100" height = "300"/>
                            } 
                            actions = {[
                                <Icon type = "video-camera"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide3()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Click Click 
                        </Card>
                    </Col>
                </Row>
            </div>     
        )
    }
}

export default Help;
