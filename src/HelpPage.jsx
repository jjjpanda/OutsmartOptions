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

    //renders a modal containing youtube video for a card
    renderVid(url, header) {
        Modal.info({
          title: header,
          content: (
            <iframe width="500" height="300" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ),
          width: 600,
        });
      }

    //Code for a basic modal containing a carousel
    renderCarousel(header, caro){
      Modal.info({
        title: header,
        content: (
          caro
        ),
        width: 600,
      });
    }

    //Code to render a row of cards
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

    //Write card carousels here 
    createCarousel1(){
      //Buying stocks
        return(
          <div>
          <Carousel  padding="50px" ref="caros1" dots="false">
          <div>
            <p>
              Buying a stock in a company gives you ownership of a <b>share</b> of that company.
            </p>
            <p>The value of a share is a percentage of the company's profits. </p>
            <p>So the more shares you own, the larger percentage of the company you own. </p>
          </div>
          <div>
            <p>You want to buy stocks in companies that you believe will go up in value.</p>
            <p>The more money the company makes, the more money your shares are worth 🤑.</p>
            <p>The bigger the pie gets, the bigger your slice becomes.</p>
            <img src="/img/helpPageImages/stocks.gif" alt="pie" height="100" width="200" />
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
      //Options Contracts
        return(
          <div>
            <Carousel  padding="50px" ref="caros3" dots="false">
              <div>
                <p>An option contract facilitates the transaction of a security at a predetermined price, before a predetermined date.</p>
                <p>The predetermined price is known as the <b>strike price</b>.</p>
                <p>The predetermined date is known as the <b>expiration date</b>.</p>
                <p>The buyer must pay a premium to the writer of the contract, which is charged per share of the contract.</p>
                <p>The standard options contract covers 100 shares of the underlying security.</p>
              </div>
              <div>
                <p>Options contracts are available in two forms: calls and puts.</p>
                <p>A call option gives the buyer the right to sell the shares, and a put option gives the buyer the right to buy the shares.</p>
                <p>We will go more in depth with calls and puts in their own lessons.</p>
              </div>
              <div>
                <p>In summary, the contract buyer has the right, but not the obligation, to buy shares from or sell shares to the option writer before the expiration date.</p>
                <img src="/img/helpPageImages/options.gif" alt="pie" height="250" width="450" />
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
      //Excercise and Expiry
      return(
        <div>
        <Carousel  padding="50px" ref="caros2" dots = "false">
        <div>
          <p>Deciding to buy or sell an option contract's underlying security is known as <b>excercising</b> the option.</p>
          <p>European style options must be excercised on the contract's expiration date, whereas American options can be excercised at any point on or before the expiration date.</p>
        </div>
        <div>
          <p>Now you are probably thinking, what if the buyer never excercises the option?</p>
          <p>The answer is simple, if the contract expires without being excercised, it is deemed worthless.</p>
          <p>The buyer walks away with nothing, in addition to losing the money they paid for the contract's premium.</p>
        </div>
        <div>
          <img src="/img/helpPageImages/expiry.gif" alt="pie" height="250" width="450" /> 
        </div>
        <div>
          <p>Now why would someone allow their contract to expire?</p>
          <p>If the option is not <b>in the money</b> at expiry, the buyer would lose money by excercising the option.</p>
          <p>A call option is in the money if the underlying security's price goes below strike price, allowing the buyer to buy the security for less than market price.</p>
          <p>A put option is in the money if the underlying security's price goes above strike price, allowing the buyer to sell the security for greater than market price.</p>
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

  createCarousel4(){
    //Call Option Buyers
    return(
      <div>
        <Carousel  padding="50px" ref="caros2" dots = "false">
        <div>
          <p>We have mentioned the two types of options: calls and puts.</p>
          <p>Now we will go more in depth into buying calls.</p>
          <p>Remember, a call buyer pays a premium to the writer for a contract that gives them the right to buy the security.</p>
        </div>
        <div>
          <p>We will walk you through the process of buying calls, from purchase to expiration. Click <b>next</b> to traverse through the graphical lesson.</p>
          <img src="/img/helpPageImages/callBuyers/Slide1.jpeg" alt="pie" height="250" width="450" />
          <br></br>
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callBuyers/Slide2.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callBuyers/Slide3.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callBuyers/Slide4.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callBuyers/Slide5.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callBuyers/Slide6.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callBuyers/Slide7.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
         <br></br>
          <img src="/img/helpPageImages/callBuyers/Slide8.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          End Lesson.
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

createCarousel5(){
  //Call Option Writers
  return(
    <div>
      <Carousel  padding="50px" ref="caros2" dots = "false">
        <div>
          <p>Now its time to walk you through writing calls.</p>
          <p>Remember, a call writer sells a contract, for a premium, giving the buyer the right to buy a security from them.</p>
          <p>This can also be interpreted as the obligation to sell the securities to the buyer, should the buyer excercise the contract.</p>
        </div>
        <div>
          <p>Click <b>next</b> to traverse through the graphical lesson.</p>
          <img src="/img/helpPageImages/callWriters/Slide1.jpeg" alt="pie" height="250" width="450" />
          <br></br>
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide2.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide3.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide4.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide5.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide6.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide7.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide8.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/callWriters/Slide9.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          End Lesson.
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

createCarousel6(){
  //Put Option Buyers
  return(
    <div>
      <Carousel  padding="50px" ref="caros2" dots = "false">
      <div>
        <p>Now we will go more in depth into buying puts.</p>
        <p>Remember, a put buyer pays a premium to the writer for a contract that gives them the right to sell the security.</p>
      </div>
      <div>
        <p>We will walk you through the process of buying puts, from purchase to expiration. Click <b>next</b> to traverse through the graphical lesson.</p>
        <img src="/img/helpPageImages/putBuyers/Slide1.jpeg" alt="pie" height="250" width="450" />
        <br></br>
      </div>
      <div>
        <br></br>
        <img src="/img/helpPageImages/putBuyers/Slide2.jpeg" alt="pie" height="250" width="450" />
      </div>
      <div>
        <br></br>
        <img src="/img/helpPageImages/putBuyers/Slide3.jpeg" alt="pie" height="250" width="450" />
      </div>
      <div>
        <br></br>
        <img src="/img/helpPageImages/putBuyers/Slide4.jpeg" alt="pie" height="250" width="450" />
      </div>
      <div>
        <br></br>
        <img src="/img/helpPageImages/putBuyers/Slide5.jpeg" alt="pie" height="250" width="450" />
      </div>
      <div>
        <br></br>
        <img src="/img/helpPageImages/putBuyers/Slide6.jpeg" alt="pie" height="250" width="450" />
      </div>
      <div>
        <br></br>
        <img src="/img/helpPageImages/putBuyers/Slide7.jpeg" alt="pie" height="250" width="450" />
      </div>
      <div>
       <br></br>
        <img src="/img/helpPageImages/putBuyers/Slide8.jpeg" alt="pie" height="250" width="450" />
      </div>
      <div>
        End Lesson.
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

createCarousel7(){
  //Put Option Writers
  return(
    <div>
      <Carousel  padding="50px" ref="caros2" dots = "false">
        <div>
          <p>Now its time to walk you through writing puts.</p>
          <p>Remember, a put writer sells a contract, for a premium, giving the buyer the right to sell a security to them.</p>
          <p>This can also be interpreted as the obligation to buy the securities from the contract buyer, should the buyer excercise the contract.</p>
        </div>
        <div>
          <p>Click <b>next</b> to traverse through the graphical lesson.</p>
          <img src="/img/helpPageImages/putWriters/Slide1.jpeg" alt="pie" height="250" width="450" />
          <br></br>
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide2.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide3.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide4.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide5.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide6.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide7.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide8.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <br></br>
          <img src="/img/helpPageImages/putWriters/Slide9.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          End Lesson.
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

createCarousel8(){
  //Rights and Obligations
  return(
    <div>
      <Carousel  padding="50px" ref="caros2" dots = "false">
        <div>
          <p>We know, that was a lot of information.</p>
          <p>So we will summarize puts and calls and buyers and writers by breaking down the rights and obligations associated with each.</p>
          <p>In short, call writers and put buyers  make money if the stock price goes down, and call buyers and put writers make money if the stock price goes up.</p>
          <p>Click <b>next</b> to traverse through the graphical lesson.</p>
        </div>
        <div>
          <img src="/img/helpPageImages/rightsAndObligations/Slide1.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <img src="/img/helpPageImages/rightsAndObligations/Slide2.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          <img src="/img/helpPageImages/rightsAndObligations/Slide3.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          End Lesson.
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

createCarousel9(){
  //Intrinsic and Extrinsic value
  return(
    <div>
      <Carousel  padding="50px" ref="caros2" dots = "false">
        <div>
          <p>Options contracts have intrinsic and extrinsic value.</p>
          <p>The <b>intrinsic</b> value of a contract is the difference between the strike price and the current market price.
            Basically, the money you would take away from the contract should you excercise now. </p>
          <p>The <b>extrinsic</b> value of a contract is governed by the time value and implied volatility of the option.
            This can be explained as the potential for the stock to get in the money before expiration.</p>
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

createCarousel10(){
  //Short Selling 
  return(
    <div>
      <Carousel  padding="50px" ref="caros2" dots = "false">
        <div>
          <p>Traditionally, people buy stocks they think will go up in value, in order to make money.</p>
          <p>But it is also possible to profit on stock that will lose value, in a strategy known as <b>short selling</b>.</p>
          <p>A trader may short sell for speculative trading, or to hedge a long position.</p>
          <p>Short sellers can make great profits on declining stocks, but they can also theoretically stand to lose an infinite amount of money 😬. </p>
          <p>Lets show you how this works.</p>
        </div>
        <div>
          In this scenario, the market price of the stock our trader wants to short is $100.
          <img src="/img/helpPageImages/shortSelling/Slide1.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          First, our trader borrows the stocks from a broker with an assigned expiration date.
          <img src="/img/helpPageImages/shortSelling/Slide2.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          Next, our trader sells the stocks on the market.
          <img src="/img/helpPageImages/shortSelling/Slide3.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          Our trader now has $100 and needs the stock price to drop below $100 before expiration in order to make money.
          <img src="/img/helpPageImages/shortSelling/Slide4.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          Look! The stock dropped to $80!  Our trader now buys the same stocks from the market for the new price of $80.
          <img src="/img/helpPageImages/shortSelling/Slide5.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          Now, our trader uses these newly purchased stocks to replace the stocks they had borrowed.
          <img src="/img/helpPageImages/shortSelling/Slide6.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          Our trader walks away with $20 per share!
          <img src="/img/helpPageImages/shortSelling/Slide7.jpeg" alt="pie" height="250" width="450" />
        </div>
        <div>
          Finesse!
          <img src="/img/helpPageImages/shortSelling.gif" alt="pie" height="250" width="450" />
        </div>
        <div>
          <p>Remember, short selling is risky business, so make sure you are educated on your position before you start the process.</p>
          <p>The maximum you can make per share would occur if the stock price plummeted to $0; in our prior example you would make $100 per share.</p>
          <p>But there is no limit to how much money you can lose! The price can theoretically go up infinitely, meaning you would lose an infinite amount of money per share.</p>
          <p>There are other ways to go short on a stock, such as buying puts and writing calls, which we talked about in previous lessons.</p>
        </div>
        <div>
          End Lesson.
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
        var caro4 = this.createCarousel4();
        var caro5 = this.createCarousel5();
        var caro6 = this.createCarousel6();
        var caro7 = this.createCarousel7();
        var caro8 = this.createCarousel8();
        var caro9 = this.createCarousel9();
        var caro10 = this.createCarousel10();

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
                      "Buying Calls",
                      caro4];
        
        var card5 = ["Call Options Writers",
                      "https://images.unsplash.com/photo-1516055619834-586f8c75d1de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                      "https://www.youtube.com/embed/fUNk8TjrZOA",
                      "Write it up",
                      "Writing Calls",
                      caro5]; 

        var card6 = ["Put Options Buyers",
                      "https://tinyurl.com/wxmkb9g",
                      "https://www.youtube.com/embed/z6lu992JvCk",
                      "Put it there",
                      "Buying Puts",
                      caro6];

        var card7 = ["Put Options Writers",
                      "https://tinyurl.com/wxmkb9g",
                      "https://www.youtube.com/embed/z6lu992JvCk",
                      "Put Put Pass",
                      "Writing Puts",
                      caro7];

        var card8 = ["Puts vs Calls: Rights and Obligations",
                    "https://keydifferences.com/wp-content/uploads/2015/12/call-option-vs-put-option1.jpg",
                    "https://www.youtube.com/embed/uQLMSU2NNlk",
                    "Ups and Downs",
                    "Puts vs Calls: Rights and Obligations",
                    caro8];

        var card9 = ["Intrinsic and Extrinsic Value",
                    "https://www.wrike.com/blog/content/uploads/2019/07/Intrinsic-vs.-Extrinsic-Motivation-How-to-Drive-People-to-Do-Amazing-Work-896x518.jpg",
                    "https://www.youtube.com/embed/r382h59p13M",
                    "Whats the difference?",
                    "Intrinsic and Extrinsic Value",
                    caro9];
        
        var card10 = ["Short Selling",
                    "https://i.udemycdn.com/course/750x422/2471182_20ec_4.jpg",
                    "https://www.youtube.com/embed/xX_9ud6B9Nw",
                    "Bear Gang",
                    "Short Selling",
                    caro10];

        var card11 = ["Futures",
                    "https://cdn.wegow.com/media/artists/future/future-1502361050.03.2560x1440.jpg",
                    "https://www.youtube.com/embed/Cj0fHhLVrv8",
                    "Freebandz",
                    "Futures",
                    caro10];
          
        var card12 = ["Reading Profit Graphs",
                    "/img/profitGraph.PNG",
                    "https://www.youtube.com/embed/m2LOJRxYkRg",
                    "When, where, and how to get the bag",
                    "Profit Graphs",
                    caro10];

        var card13 = ["Delta, Gamma, and Leverage",
                    "https://www.optionsplaybook.com/media/images/graphics/meet_greeks.gif",
                    "https://www.youtube.com/embed/FDCrfsYg0GU",
                    "Greeks",
                    "Delta, Gamma, and Leverage",
                    caro10];

        var card14 = ["Theta",
                    "https://www.optionsplaybook.com/media/images/graphics/meet_greeks.gif",
                    "https://www.youtube.com/embed/4X3HBFntkds",
                    "More Greek",
                    "Theta",
                    caro10];
        
        var card15 = ["IV, Vega, and IV Crush",
                    "https://www.optionsplaybook.com/media/images/graphics/meet_greeks.gif",
                    "https://www.youtube.com/embed/Q3XAlfAyMGI",
                    "Lets get volatile",
                    "IV, Vega, and IV Crush",
                    caro10];
                     

        var row1 = [card1, card2, card3];
        var row2 = [card4, card5, card6];
        var row3 = [card7, card8, card9];
        var row4 = [card10, card11, card12];
        var row5 = [card13, card14, card15];
        

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
                <br></br>
                <Row gutter = {16}>
                  {this.renderRow(row4)}
                </Row>
                <br></br>
                <Row gutter = {16}>
                  {this.renderRow(row5)}
                </Row>
            </div>
        )
    }
}

export default Help2;
