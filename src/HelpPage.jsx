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

    renderVid(url, header) {
        Modal.info({
          title: header,
          content: (
            <iframe width="500" height="300" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ),
          width: 600,
        });
      }

    renderCarousel(header, caro){
      Modal.info({
        title: header,
        content: (
          caro
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
                        <Icon type = "youtube" onClick = {() => this.renderVid(index[2], index[0])}/>, 
                        <Icon type = "info-circle" onClick = {() => this.renderCarousel(index[0],index[5])}/>,
                        <Icon type = "book"/>,
                    ]}
                > 
                {index[3]}
                </Card>
            </Col>
          ));
    }

    createCarousel1(){
        return(
          <div>
          <Carousel  padding="50px" ref="caros1" dots="false">
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
        <br></br>
        <br></br>
        <ButtonGroup>
            <Button type="primary" onClick={() => this.refs.caros1.prev()}>
                  <Icon type="left" />
                  Prev
            </Button>
            <Button type="primary" onClick={() => this.refs.caros1.next()}>
                  Next
                  <Icon type="right" />
            </Button>
        </ButtonGroup>
        </div>
        )
    }


    createCarousel2(){
        return(
          <div>
            <Carousel  padding="50px" ref="caros3">
              <div>
                <p>An option contract facilitates the transaction of a security at a predetermined price, before a predetermined date.</p>
                <p>The predetermined price is known as the <b>strike price</b>.</p>
                <p>The predetermined date is known as the <b>expiration date</b>.</p>
                <p>The standard options contract covers 100 shares of the underlying security.</p>
              </div>
              <div>
                <p>The contract buyer has the right, but not the obligation, to buy or sell shares to the option writer before the expiration date.</p>
                <p>Options contracts are available in two forms: calls and puts.</p>
                <p>A call option gives the buyer the right to sell the shares, and a put option gives the buyer the right to buy the shares.</p>
                <p>We will go more in depth with calls and puts in their own lessons.</p>
              </div>
              <div>
                End Lesson
              </div>

            </Carousel>
            <br></br>
            <br></br>
            <ButtonGroup>
              <Button type="primary" onClick={() => this.refs.caros3.prev()}>
                  <Icon type="left" />
                  Prev
              </Button>
              <Button type="primary" onClick={() => this.refs.caros3.next()}>
                  Next
                  <Icon type="right" />
              </Button>
            </ButtonGroup>
        </div>
        )
    }

    createCarousel3(){
      return(
        <div>
        <Carousel  padding="50px" ref="caros2">
        <div>
          Carousel 3
        </div>
        <div>
          Hey  
        </div>
        <div>
          <p>End lesson</p>
        </div>
      </Carousel>
      <ButtonGroup>
          <Button type="primary" onClick={() => this.refs.caros2.prev()}>
                <Icon type="left" />
                Prev
          </Button>
          <Button type="primary" onClick={() => this.refs.caros2.next()}>
                Next
                <Icon type="right" />
          </Button>
      </ButtonGroup>
      </div>
      )
  }

    render(){
        //Fill in the following info for each card variable in this order: title, image, video link, sub text, modal title
        //Fill out the corresponding create# function above to populate that card's info carousel
        var caro1 =  this.createCarousel1();
        var caro2 = this.createCarousel2();      
        var caro3 = this.createCarousel3();

        var card1 = ["Buying Stocks",
                    "https://www.thestreet.com/files/tsc/v2008/defaultImages/thestreet-picks-stockpickr.jpg",
                    "https://www.youtube.com/embed/JrGp4ofULzQ",
                    "Stonks",
                    "Buying Stocks",
                    caro1];

        var card2 = ["Options Contracts",
                    "https://s3.amazonaws.com/multistate.us/shared/hubspot/export/AdobeStock_67425246-1200px.jpeg",
                    "https://www.youtube.com/embed/GzkKFRx1Dhk",
                    "Welcome to r/WallStreetBets",
                    "Options Contracts", 
                    caro2];


        var card3 = ["Excercise and Expiry",
                      "https://is2-ssl.mzstatic.com/image/thumb/Purple4/v4/90/37/b5/9037b5ac-701d-6e15-a56e-b13bff7c1602/Icon.png/1200x630bb.png",
                      "https://www.youtube.com/embed/zRi8bCfGhBo",
                      "When you work out and Die",
                      "Excercise and Expiry",
                      caro3];

        var card4 = ["Call Options Buyers",
                      "https://images.unsplash.com/photo-1516055619834-586f8c75d1de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                      "https://www.youtube.com/embed/fUNk8TjrZOA",
                      "1800-Call-NOW",
                      "Calls",
                      caro3]; 

        var card5 = ["Put Options Buyers",
                      "https://tinyurl.com/wxmkb9g",
                      "https://www.youtube.com/embed/z6lu992JvCk",
                      "Put it there",
                      "Puts",
                      caro3];

        var card6 = ["Puts vs Calls: Rights and Obligations",
                    "https://keydifferences.com/wp-content/uploads/2015/12/call-option-vs-put-option1.jpg",
                    "https://www.youtube.com/embed/uQLMSU2NNlk",
                    "Ups and Downs",
                    "Puts vs Calls: Rights and Obligations",
                    caro3];
        
        var card7 = ["Short Selling",
                    "https://i.udemycdn.com/course/750x422/2471182_20ec_4.jpg",
                    "https://www.youtube.com/embed/xX_9ud6B9Nw",
                    "Bear Gang",
                    "Short Selling",
                    caro3];

        var card8 = ["Futures",
                    "https://cdn.wegow.com/media/artists/future/future-1502361050.03.2560x1440.jpg",
                    "https://www.youtube.com/embed/Cj0fHhLVrv8",
                    "Freebandz",
                    "Futures",
                    caro3];
          
        var card9 = ["Intrinsic and Extrinsic Value",
                    "https://www.wrike.com/blog/content/uploads/2019/07/Intrinsic-vs.-Extrinsic-Motivation-How-to-Drive-People-to-Do-Amazing-Work-896x518.jpg",
                    "https://www.youtube.com/embed/r382h59p13M",
                    "Whats the difference?",
                    "Intrinsic and Extrinsic Value",
                    caro3];
                     

        var row1 = [card1, card2, card3];
        var row2 = [card4, card5, card6];
        var row3 = [card7, card8, card9];
        

        return(
            <div style={{ padding: '30px' }}>
                <Row gutter = {16}>
                    {this.renderRow(row1)}
                </Row>
                <br></br>
                <Row gutter = {16}>
                    {this.renderRow(row2)}
                </Row>
                <br></br>
                <Row gutter = {16}>
                  {this.renderRow(row3)}
                </Row>
            </div>
        )
    }
}

export default Help2;
