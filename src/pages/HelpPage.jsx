import React from 'react';
import {
  Modal,
  Carousel,
  Button,
  Card,
  Col,
  Row,
  Icon,
  Popover,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import HelpTooltip from '../components/HelpTooltip.jsx';

class Help2 extends React.Component {
  constructor(props) {
    super(props);
  }

  // renders a modal containing youtube video for a card
  renderVid(url, header) {
    Modal.info({
      title: header,
      content: (
        <iframe width="500" height="300" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ),
      width: 600,
    });
  }

  // Code for a basic modal containing a carousel
  renderCarousel(header, caro) {
    Modal.info({
      title: header,
      content: (
        caro
      ),
      width: 600,
    });
  }

  // Code to render a row of cards
  renderRow(content) {
    return content.map((index) => (
      <Col span={8}>
        <Card
          title={index[0]}
          cover={
            <img alt="outsmart" src={index[1]} width="100" height="200" />
                    }
          actions={[
            <Icon type="youtube" onClick={() => this.renderVid(index[2], index[0])} />,
            <Icon type="info-circle" onClick={() => this.renderCarousel(index[0], index[5])} />,
          ]}
        >
          {index[3]}
        </Card>
      </Col>
    ));
  }

  // Write card carousels here
  createCarousel1() {
    // Buying stocks
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>
              Buying a stock in a company gives you ownership of a
              {' '}
              <b>share</b>
              {' '}
              of that company.
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
        <br />
        <br />
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
    );
  }

  createCarousel2() {
    // Options Contracts
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>An option contract facilitates the transaction of a security at a predetermined price, before a predetermined date.</p>
            <p>
              The predetermined price is known as the
              <b>strike price</b>
              .
            </p>
            <p>
              The predetermined date is known as the
              <b>expiration date</b>
              .
            </p>
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
        <br />
        <br />
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
    );
  }

  createCarousel3() {
    // Excercise and Expiry
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>
              Deciding to buy or sell an option contract's underlying security is known as
              <b>excercising</b>
              {' '}
              the option.
            </p>
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
            <p>
              If the option is not
              <b>in the money</b>
              {' '}
              at expiry, the buyer would lose money by excercising the option.
            </p>
            <p>A call option is in the money if the underlying security's price goes below strike price, allowing the buyer to buy the security for less than market price.</p>
            <p>A put option is in the money if the underlying security's price goes above strike price, allowing the buyer to sell the security for greater than market price.</p>
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
    );
  }

  createCarousel4() {
    // Call Option Buyers
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>We have mentioned the two types of options: calls and puts.</p>
            <p>Now we will go more in depth into buying calls.</p>
            <p>Remember, a call buyer pays a premium to the writer for a contract that gives them the right to buy the security.</p>
          </div>
          <div>
            <p>
              We will walk you through the process of buying calls, from purchase to expiration. Click
              <b>next</b>
              {' '}
              to traverse through the graphical lesson.
            </p>
            <img src="/img/helpPageImages/callBuyers/Slide1.jpeg" alt="pie" height="250" width="450" />
            <br />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callBuyers/Slide2.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callBuyers/Slide3.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callBuyers/Slide4.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callBuyers/Slide5.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callBuyers/Slide6.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callBuyers/Slide7.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callBuyers/Slide8.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            End Lesson.
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
    );
  }

  createCarousel5() {
  // Call Option Writers
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>Now its time to walk you through writing calls.</p>
            <p>Remember, a call writer sells a contract, for a premium, giving the buyer the right to buy a security from them.</p>
            <p>This can also be interpreted as the obligation to sell the securities to the buyer, should the buyer excercise the contract.</p>
          </div>
          <div>
            <p>
              Click
              <b>next</b>
              {' '}
              to traverse through the graphical lesson.
            </p>
            <img src="/img/helpPageImages/callWriters/Slide1.jpeg" alt="pie" height="250" width="450" />
            <br />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide2.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide3.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide4.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide5.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide6.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide7.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide8.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/callWriters/Slide9.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            End Lesson.
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
    );
  }

  createCarousel6() {
  // Put Option Buyers
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>Now we will go more in depth into buying puts.</p>
            <p>Remember, a put buyer pays a premium to the writer for a contract that gives them the right to sell the security.</p>
          </div>
          <div>
            <p>
              We will walk you through the process of buying puts, from purchase to expiration. Click
              <b>next</b>
              {' '}
              to traverse through the graphical lesson.
            </p>
            <img src="/img/helpPageImages/putBuyers/Slide1.jpeg" alt="pie" height="250" width="450" />
            <br />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putBuyers/Slide2.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putBuyers/Slide3.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putBuyers/Slide4.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putBuyers/Slide5.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putBuyers/Slide6.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putBuyers/Slide7.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putBuyers/Slide8.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            End Lesson.
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
    );
  }

  createCarousel7() {
  // Put Option Writers
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>Now its time to walk you through writing puts.</p>
            <p>Remember, a put writer sells a contract, for a premium, giving the buyer the right to sell a security to them.</p>
            <p>This can also be interpreted as the obligation to buy the securities from the contract buyer, should the buyer excercise the contract.</p>
          </div>
          <div>
            <p>
              Click
              <b>next</b>
              {' '}
              to traverse through the graphical lesson.
            </p>
            <img src="/img/helpPageImages/putWriters/Slide1.jpeg" alt="pie" height="250" width="450" />
            <br />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide2.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide3.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide4.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide5.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide6.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide7.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide8.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <br />
            <img src="/img/helpPageImages/putWriters/Slide9.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            End Lesson.
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
    );
  }

  createCarousel8() {
  // Rights and Obligations
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>We know, that was a lot of information.</p>
            <p>So we will summarize puts and calls and buyers and writers by breaking down the rights and obligations associated with each.</p>
            <p>In short, call writers and put buyers  make money if the stock price goes down, and call buyers and put writers make money if the stock price goes up.</p>
            <p>
              Click
              <b>next</b>
              {' '}
              to traverse through the graphical lesson.
            </p>
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
    );
  }

  createCarousel9() {
  // Intrinsic and Extrinsic value
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>Options contracts have intrinsic and extrinsic value.</p>
            <p>
              The
              <b>intrinsic</b>
              {' '}
              value of a contract is the difference between the strike price and the current market price.
              Basically, the money you would take away from the contract should you excercise now.
              {' '}
            </p>
            <p>
              The
              <b>extrinsic</b>
              {' '}
              value of a contract is governed by the time value and implied volatility of the option.
              This can be explained as the potential for the stock to get in the money before expiration.
            </p>
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
    );
  }

  createCarousel10() {
  // Short Selling
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>Traditionally, people buy stocks they think will go up in value, in order to make money.</p>
            <p>
              But it is also possible to profit on stock that will lose value, in a strategy known as
              <b>short selling</b>
              .
            </p>
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
    );
  }

  createCarousel11() {
  // Futures
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>We have been going pretty in depth into options (it is our brand after all), but there some other derivatives you should be familiar with.</p>
            <p>The most commonly used derivatives are futures, forwards, options 😎, warrants, and swaps (which we explained in the Short Selling lesson).</p>
            <p>Like options, these other derivatives are typically used for hedging and speculation.</p>
          </div>
          <div>
            <p>Options and Warrants are pretty similar; they both give the buyer the right to buy or sell, in turn obligating the writer to buy or sell.</p>
            <img src="/img/helpPageImages/forwardsFuturesOptionsAndWarrants/Slide1.jpeg" alt="pie" height="250" width="450" />
            <br />
          </div>
          <div>
            <p>The key differences lie in who writes the contracts, how they are exchanged, and their maturity.</p>
            <img src="/img/helpPageImages/forwardsFuturesOptionsAndWarrants/Slide2.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>Futures and forwards are also very similar derivatives. They both give the owner the obligation to buy or sell the given securities by a given date.</p>
            <img src="/img/helpPageImages/forwardsFuturesOptionsAndWarrants/Slide3.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>
              The main differences between futures and forwards are &nbsp;
              <Popover content="The money borrowed from a brokerage firm to purchase an investment." title="Margin" trigger="hover">
                <u>margin</u>
              </Popover>
            &nbsp;requirements,&nbsp;
              <Popover content="Probability that one of those involved in a transaction might default on its contractual obligation." title="Counter Party Risk" trigger="hover">
                <u>counter party risk</u>
              </Popover>
            &nbsp;, the exchange, and the settlement.
            </p>
            <img src="/img/helpPageImages/forwardsFuturesOptionsAndWarrants/Slide4.jpeg" alt="pie" height="250" width="450" />
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
    );
  }

  createCarousel12() {
  // Reading Profit Graphs
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>Now that you know what options are, its time for you to learn the potential outcomes of your strategies.</p>
            <p>
              One of the most important tools for outcome visualization is the
              <b>profit graph</b>
              .
            </p>
          </div>
          <div>
            <div>They look like this:</div>
            <img src="https://www.theoptionsguide.com/images/long-call.gif" alt="pie" height="250" width="450" />
            <div>The x axis shows different stock prices at expiration, and the y axis shows the profits or losses, in USD or %. </div>
            <div>This allows the options trader to see how much money they stand to gain or lose at different stock prices.</div>
            <br />
          </div>
          <div>
            <p>Lets say our options trader buys an ABC call for $.50 at a strike price of $30 that expires on 12/20.</p>
            <img src="/img/helpPageImages/profitGraphs/Slide1.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>If the contract expires at $30, which is the strike price, then our trader will lose $50, which is what they paid for the premium.</p>
            <img src="/img/helpPageImages/profitGraphs/Slide2.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>If the contract expires at anything lower than the strike price, our trader will still only lose what they paid for the premium.</p>
            <img src="/img/helpPageImages/profitGraphs/Slide3.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>If our trader wants to make any money, they will need the stock price to rise above $30.</p>
            <img src="/img/helpPageImages/profitGraphs/Slide4.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>The break even point can be seen where the line intersects the x axis.</p>
            <img src="/img/helpPageImages/profitGraphs/Slide5.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>The same idea can be applied to writing calls...</p>
            <img src="/img/helpPageImages/profitGraphs/Slide6.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>... buying puts...</p>
            <img src="/img/helpPageImages/profitGraphs/Slide7.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>... and writing puts.</p>
            <img src="/img/helpPageImages/profitGraphs/Slide8.jpeg" alt="pie" height="250" width="450" />
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
    );
  }

  createCarousel13() {
    // Delta Gamma Leverage
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>The next step in analyzing optios contracts is learning about the Greeks.</p>
            <p>The Greeks are broken up into delta, gamma, vega, theta, and Rho. Each measures a different factor that affects the price of an option.</p>
            <p>
              In this lesson, we will start with
              <b>delta</b>
              {' '}
              and
              <b>gamma</b>
              , and how they affect the leverage of your options contracts.
            </p>
          </div>
          <div>
            <p>Delta represents the ratio between the change in the price of an asset, in our case stocks, to the change in price of its derivative (option contract). </p>
            <p>A call option has a delta in the range of 0-1, because the price of a call option will increase when the price of its underlying stock increases.</p>
            <p>A put option has a delta in the range of -1-0, because the price of a put option will increase when the price of its underlying stock decreases.</p>
          </div>
          <div>
            <p>For example, if the delta of a call option on stock ABC is 0.5 and ABC goes up $1, the contract price will go up $0.50. If ABC goes down $1, the price will go down $0.50.</p>
            <img src="/img/helpPageImages/delta.gif" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>In the money options will approach 1 for calls and -1 for puts as the contract gets closer to expiration</p>
            <p>Out of the money options will approach 0 as the contract gets closer to expiration.</p>
            <p>This behaviour is indicative of the value of contracts: an ITM contract will get more expensive as it gets closer to expiration, and a OTM contract will lose value.</p>
          </div>
          <div>
            <p>Gamma is the first derivative of delta, meaning it is the ration between change of an option's delta and the change of the underlying security. </p>
            <p>This ratio is important because delta is constantly changing, so reading delta on its own does not paint the full picture. Traders can use gamma to get insight on how delta will change, and therefore how the option's price will change.</p>
          </div>
          <div>
            <p>Now remember that options contracts produce leverage; a contract gives the options trader control over 100 shares of a stock for a fraction of the stock's price.</p>
            <p>This means that the options trader has access to the gain of the underlying stock without paying full price to own the stock. This is leverage.</p>
            <p>Delta can be used to calculate leverage with the following equation:  LEVERAGE = DELTA EQUIVALENT STOCK PRICE - OPTION PRICE) / OPTION PRICE.</p>
            <p>Stock ABC is trading at $100. A call at strike price costs $5 and has a delta of 0.5. LEVERAGE = (.5 * 100 - 5)/5 = 9</p>
            <p>Whoa! So you can make 9 times the amount of profit on ABC with this contract, with the same amount of money, compared to just owning the stock.</p>
          </div>
          <div>
            <p>So you may be thinking Mo OTM =  Mo Leverage = Mo Money, but Mo OTM = Mo risk = Mo problems. </p>
            <p>Just becuase your deeply OTM contract has a crazy leverage multiplier will mean you will make money. That contract must get ITM before expiration, and its typically not safe to bet on big swings to save yoru position at the last second.</p>
            <p>Investing ITM is less risky, so you can make small, but consitent gains over time, instead of betting big and losing big premiums.</p>
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
    );
  }

  createCarousel14() {
    // Theta
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>
              The next Greek you need for your analyses is
              <b>theta</b>
              .
            </p>
            <p>Theta, also known as time decay, is a measure of the rate at which an option contract loses value.</p>
            <p>Everything else being equal, options lose value as they approach expiry. Specifically, they lose extrinsic value.</p>
            <p>For example, a contract with a theta of -0.5 will theoretically lose 50 cents in value until it expires.</p>
          </div>
          <div>
            <p>Once purchased, options begin to lose extrinsic value.</p>
            <img src="/img/helpPageImages/theta.jpeg" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>In terms of risk management, an options buyer would want to buy contracts with low theta.</p>
            <p>Suppose a buyer is deciding between two contracts that only differ in theta. They would want the contract that holds value better.</p>
            <p>Think of it this way: as an option gets closer to expiration, there is less probability that the underlying security moves in a way for the contract to be profitable.</p>
          </div>
          <div>
            <p>Options writers, on the other hand, like options with high theta.</p>
            <p>The less likely the option is to be profitable for the buyer, the more likely the writer can get away with the premium and not have to worry about the buyer excercising.</p>
            <p>Another way to think of it: theta represents the rate at which value transfers from the buyer to the writer over time.</p>
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
    );
  }

  createCarousel15() {
    // IV VEGA IV CRUSH
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false">
          <div>
            <p>
              The next Greek is
              <b>vega</b>
              . It's a measurement of an option's price relative to change in the underlying stock's implied volatility.
            </p>
            <p>Before we get ahead of ourselves, let us discuss implied volatilty, or IV.</p>
          </div>
          <div>
            <p>IV is a measure of predicted movement of a security's price. A security with high IV is expected to fluctuate or have a price swing. A security with low IV is expected to remain steady.</p>
            <p>IV does not predict which way the price will move, only that the price is expected to move.</p>
          </div>
          <div>
            <p>Take stock ABC, which is sitting at $50 with an IV of 20%. This means that ABC is expected to fluctuate within 20% of the price, at one standard deviation. Therefore one can expect ABC to fluctuate between $40 and $60.</p>
            <img src="https://www.optionsplaybook.com/media/images/graphics/normal_distribution.gif" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>Vega tells us how IV will affect the value of our options.</p>
            <p>The higher the IV, the higher the extrinsic value of the option. This is because the underlying stock is more likely to move and make the contract profitable. The opposite is true for low IV.</p>
            <img src="/img/helpPageImages/vega.gif" alt="pie" height="250" width="450" />
          </div>
          <div>
            <p>IV tends to increase leading up to the release of a company's earnings report, which subsequently causes the price of options on that stock to increase.</p>
            <p>
              Once the earnings are released, the IV tends to drop signifigantly, in a phenomena known as
              <b>IV Crush</b>
              .
            </p>
            <p>Options traders can use this predictable pattern to time their trades.</p>
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
    );
  }

  createCarousel16() {
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false" />
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
    );
  }

  createCarousel17() {
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false" />
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
    );
  }

  createCarousel18() {
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false" />
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
    );
  }

  createCarousel19() {
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false" />
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
    );
  }

  createCarousel20() {
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false" />
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
    );
  }

  createCarousel21() {
    return (
      <div>
        <Carousel padding="50px" ref="caros" dots="false" />
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
    );
  }

  render() {
    // Fill in the following info for each card variable in this order: title, image, video link, sub text, modal title
    // Fill out the corresponding create# function above to populate that card's info carousel
    const caro1 = this.createCarousel1();
    const caro2 = this.createCarousel2();
    const caro3 = this.createCarousel3();
    const caro4 = this.createCarousel4();
    const caro5 = this.createCarousel5();
    const caro6 = this.createCarousel6();
    const caro7 = this.createCarousel7();
    const caro8 = this.createCarousel8();
    const caro9 = this.createCarousel9();
    const caro10 = this.createCarousel10();
    const caro11 = this.createCarousel11();
    const caro12 = this.createCarousel12();
    const caro13 = this.createCarousel13();
    const caro14 = this.createCarousel14();
    const caro15 = this.createCarousel15();
    const caro16 = this.createCarousel16();
    const caro17 = this.createCarousel17();
    const caro18 = this.createCarousel18();
    const caro19 = this.createCarousel19();
    const caro20 = this.createCarousel20();
    const caro21 = this.createCarousel21();

    const card1 = ['Buying Stocks',
      'https://www.thestreet.com/files/tsc/v2008/defaultImages/thestreet-picks-stockpickr.jpg',
      'https://www.youtube.com/embed/JrGp4ofULzQ',
      'Stonks',
      'Buying Stocks',
      caro1];

    const card2 = ['Options Contracts',
      'https://s3.amazonaws.com/multistate.us/shared/hubspot/export/AdobeStock_67425246-1200px.jpeg',
      'https://www.youtube.com/embed/GzkKFRx1Dhk',
      'Welcome to r/WallStreetBets',
      'Options Contracts',
      caro2];


    const card3 = ['Excercise and Expiry',
      'https://is2-ssl.mzstatic.com/image/thumb/Purple4/v4/90/37/b5/9037b5ac-701d-6e15-a56e-b13bff7c1602/Icon.png/1200x630bb.png',
      'https://www.youtube.com/embed/zRi8bCfGhBo',
      'When you work out and Die',
      'Excercise and Expiry',
      caro3];

    const card4 = ['Call Options Buyers',
      'https://i.insider.com/5dfb7ebf855cc232fc6669ac?width=1100&format=jpeg&auto=webp',
      'https://www.youtube.com/embed/fUNk8TjrZOA',
      '1800-Call-NOW',
      'Buying Calls',
      caro4];

    const card5 = ['Call Options Writers',
      'https://www.horner.com.au/assets/uploads/2018/02/article-2542596-1AAA16E000000578-765_634x354-600x335.jpg',
      'https://www.youtube.com/embed/fUNk8TjrZOA',
      'Write it up',
      'Writing Calls',
      caro5];

    const card6 = ['Put Options Buyers',
      'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fjonhartley%2Ffiles%2F2015%2F11%2FThe-Big-Short-Ryan-Gosling-Forbes-Edit.jpg',
      'https://www.youtube.com/embed/fUNk8TjrZOA',
      'Put it there',
      'Buying Puts',
      caro6];

    const card7 = ['Put Options Writers',
      '/img/helpPageImages/BOGGED.png',
      'https://www.youtube.com/embed/z6lu992JvCk',
      'Put Put Pass',
      'Writing Puts',
      caro7];

    const card8 = ['Puts vs Calls: Rights and Obligations',
      'https://keydifferences.com/wp-content/uploads/2015/12/call-option-vs-put-option1.jpg',
      'https://www.youtube.com/embed/uQLMSU2NNlk',
      'Ups and Downs',
      'Puts vs Calls: Rights and Obligations',
      caro8];

    const card9 = ['Intrinsic and Extrinsic Value',
      'https://www.wrike.com/blog/content/uploads/2019/07/Intrinsic-vs.-Extrinsic-Motivation-How-to-Drive-People-to-Do-Amazing-Work-896x518.jpg',
      'https://www.youtube.com/embed/r382h59p13M',
      'Whats the difference?',
      'Intrinsic and Extrinsic Value',
      caro9];

    const card10 = ['Short Selling',
      'https://i.udemycdn.com/course/750x422/2471182_20ec_4.jpg',
      'https://www.youtube.com/embed/xX_9ud6B9Nw',
      'Bear Gang',
      'Short Selling',
      caro10];

    const card11 = ['Futures and Friends',
      'https://pbs.twimg.com/media/D521o-mX4AA4G33.jpg:large',
      'https://www.youtube.com/embed/Cj0fHhLVrv8',
      'Futures, Forwards, Options, and Warrants',
      'Futures',
      caro11];

    const card12 = ['Reading Profit Graphs',
      '/img/profitGraph.PNG',
      'https://www.youtube.com/embed/m2LOJRxYkRg',
      'When, where, and how to get the bag',
      'Profit Graphs',
      caro12];

    const card13 = ['Delta, Gamma, and Leverage',
      'https://www.optionsplaybook.com/media/images/graphics/meet_greeks.gif',
      'https://www.youtube.com/embed/FDCrfsYg0GU',
      'Introducing the Greeks',
      'Delta, Gamma, and Leverage',
      caro13];

    const card14 = ['Theta',
      'https://www.optionsplaybook.com/media/images/graphics/meet_greeks.gif',
      'https://www.youtube.com/embed/4X3HBFntkds',
      'Greeks Pt 2',
      'Theta',
      caro14];

    const card15 = ['IV, Vega, and IV Crush',
      'https://www.ally.com/do-it-right/images/2017/04/market-up-down-400x300.jpg',
      'https://www.youtube.com/embed/Q3XAlfAyMGI',
      'Lets get volatile',
      'IV, Vega, and IV Crush',
      caro15];

    const card16 = ['Rho',
      'https://epsilonoptions.com/wp-content/uploads/rho.jpg',
      'https://www.youtube.com/embed/Isy2i8dRAqU',
      'Stay Greecy',
      'Rho',
      caro16];

    const card17 = ['Multileg Strategies',
      '/img/helpPageImages/multileg.png',
      'https://www.youtube.com/embed/yX43RYerHhU',
      'Advanced Strats',
      'Multileg Strategies',
      caro17];

    const card18 = ['Straddles and Strangles',
      'https://i2-prod.mirror.co.uk/incoming/article3025296.ece/ALTERNATES/s615/Birds.jpg',
      'https://www.youtube.com/embed/p1zZOZgMhag',
      'Gettin Spicy',
      'Straddles and Strangles',
      caro18];

    const card19 = ['Spreads',
      'https://thumbs.gfycat.com/PoorBonyAppaloosa-size_restricted.gif',
      'https://www.youtube.com/embed/sMAOFz0eoBk',
      'No Flockin',
      'Spreads',
      caro19];

    const card20 = ['Condors and Flys',
      'https://www.nps.gov/grca/learn/news/images/CA-Condor-flying-Photo_Jim-Shuler-Utah-DWR.jpg',
      'https://www.youtube.com/embed/bqZvoLszVEo',
      'Gotta stay fly-y-y-y, y-y, y-y, y',
      'Condors and Flys',
      caro20];

    const card21 = ['Calendar Spreads',
      'https://s3-us-west-1.amazonaws.com/hopegrown/blog-images/Hopegrown-April-Calendar-420.jpg?mtime=20160420160129',
      'https://www.youtube.com/embed/laxOmN3EJ3g',
      'Save the Date',
      'Calendar Spreads',
      caro21];


    const row1 = [card1, card2, card3];
    const row2 = [card4, card5, card6];
    const row3 = [card7, card8, card9];
    const row4 = [card10, card11, card12];
    const row5 = [card13, card14, card15];
    const row6 = [card16, card17, card18];
    const row7 = [card19, card20, card21];


    return (
      <div style={{ padding: '30px' }}>
        <Row gutter={16}>
          {this.renderRow(row1)}
        </Row>
        <br />
        <Row gutter={16}>
          {this.renderRow(row2)}
        </Row>
        <br />
        <Row gutter={16}>
          {this.renderRow(row3)}
        </Row>
        <br />
        <Row gutter={16}>
          {this.renderRow(row4)}
        </Row>
        <br />
        <Row gutter={16}>
          {this.renderRow(row5)}
        </Row>
        <br />
        <Row gutter={16}>
          {this.renderRow(row6)}
        </Row>
        <br />
        <Row gutter={16}>
          {this.renderRow(row7)}
        </Row>
      </div>
    );
  }
}

export default Help2;
