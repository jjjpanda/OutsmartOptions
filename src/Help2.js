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
import ButtonGroup from 'antd/lib/button/button-group';

class Help2 extends React.Component{
    constructor(props){
        super(props)
    }

    state = { modalVisible: false };

    setModalVisible(modalVisible) {
      this.setState({ modalVisible });
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
                        <Icon type = "info-circle" onClick = {() => this.setModalVisible(true)}/>,
                        <Icon type = "book" />,
                    ]}
                > 
                    {index[3]}
                    <Modal
                        title={index[4]}
                        visible={this.state.modalVisible}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={() => this.setModalVisible(false)}
                    >
                        {this.renderCarousel1()}
                    </Modal>
                </Card>
            </Col>
          ));
    }

    renderCarousel1(){
        return(
          <div>
          <Carousel arrows padding="50px" ref="caros">
          <div>
            <p>
              Buying a stock in a company gives you ownership of a
              <b>share</b>
              {' '}
              of that company.
            </p>
            <p>The value of a share is a percentage of the company's profits. </p>
            <p>So the more shares you own, the larger percentage of the company you own. </p>
          </div>
          <div>
            <p>You want to buy stocks in companies that you believe will go up in value.</p>
            <p>The more money the company makes, the more money your shares are worth.</p>
            <p>The bigger the pie gets, the bigger your slice becomes.</p>
            <img src="/img/b_1.gif" alt="pie" height="100" width="200" />
          </div>
          <div>
            <p>End lesson</p>
          </div>
        </Carousel>
        <ButtonGroup>
            <Button type="primary" onClick={() => this.refs.caros.prev()}>
                  <Icon type="left" />
                  Prev
              </Button>
              <Button type="primary" onClick={() => this.refs.caros.next()}>
                  Next
                  <Icon type="right" />
              </Button>
        </ButtonGroup>
        </div>
        )
    }

    render(){
        //Fill in the following info for each card variable in this order: title, image, video link, sub text, modal title
        //Fill out the corresponding renderCarousel# function above to populate that card's info carousel
        var card1 = ["Title",
                    "https://www.thestreet.com/files/tsc/v2008/defaultImages/thestreet-picks-stockpickr.jpg",
                    "https://www.youtube.com/embed/JrGp4ofULzQ",
                    "Note",
                    "Buying Stocks"];

        var row1 = [card1, card1, card1];
        var row2 = [card1,card1, card1];

        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter = {16}>
                    {this.renderRow(row1)}
                </Row>
                <br></br>
                <Row gutter = {16}>
                    {this.renderRow(row2)}
                </Row>
            </div>
        )
    }
}

export default Help2;
