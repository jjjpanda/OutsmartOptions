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

class Help2 extends React.Component{
    constructor(props){
        super(props)
    }

    renderVid(url) {
        Modal.info({
          title: 'Lesson 1: Buying Stocks',
          content: (
            <iframe width="500" height="300" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ),
          width: 600,
        });
      }

    renderRow(content){
        return content.map((index) => (
            <Col span = {8}>
                <Card
                    title={index[0]}
                    cover = {
                        <img alt ="outsmart" src = {index[1]} width = "100" height = "200"/>
                    }
                    actions = {[
                        <Icon type = "youtube" onClick = {() => this.renderVid(index[2])}/>, 
                        <Icon type = "info-circle" onClick = {() => this.setModal1Visible(true)}/>,
                        <Icon type = "book" />,
                    ]}
                > 
                    {index[3]}
                </Card>
            </Col>
          ));
    }

    render(){
        var content = [["Title", "https://www.thestreet.com/files/tsc/v2008/defaultImages/thestreet-picks-stockpickr.jpg", "https://www.youtube.com/embed/JrGp4ofULzQ", "Note"], ["Title", "Cover", "URL", "Note"], ["Title", "Cover", "URL", "Note"]];
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter = {16}>
                    {this.renderRow(content)}
                </Row>
                <br></br>
                <Row gutter = {16}>
                    {this.renderRow(content)}
                </Row>
            </div>
        )
    }
}

export default Help2;
