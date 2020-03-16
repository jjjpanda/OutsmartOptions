import React from 'react';
import {
  Input,
  InputNumber,
  Button,
  Switch,
  Modal,
  Table,
  Collapse,
  Checkbox,
  Icon,
  Menu,
  Popover,
  Calendar, 
  Spin
} from 'antd';

import Tour from 'reactour';
import Cookie from 'js-cookie';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { NoAxisGraph, ProfitGraph } from './components/Graphs.jsx';
import { StrategyInfo } from './components/StrategyInfo.jsx';
import SpinningLogo from './components/SpinningLogo.jsx';
import StockSymbol from './components/StockSymbol.jsx';
import StockCalendar from './components/StockCalendar.jsx';
import OptionsLeg from './components/OptionsLeg.jsx';
import verifyUser from './components/UserVerifier.jsx';

// JS Libraries

import * as math from 'mathematique';
let optionsMath = math.options
let treasury = math.treasury

import * as aes from 'aesthetique'
let percentageColor = aes.color

import html2canvas from 'html2canvas';

import * as util from 'utilique'
let structure = util.structures
let post = util.fetch

import * as moment from 'moment';

const ButtonGroup = Button.Group;
const CollapsePanel = Collapse.Panel;

// Treasury Yields
let yields = [];
post.fetchReq('/api/market/treasury', '', (data) => {
  yields = data;
});

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

class OptionsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      exists: true,
      priceChange: 0,
      price: 0,
      divYield: 0,
      addLegModalVisible: false,
      ivSkewModalVisible: false,
      isTourOpen: false,
      optionsChain: [['Empty', {}]],
      optionsSelected: [],
      activeOptionExpiry: '',
      numberIntervals: 15,
      percentInterval: 1,
      erVisible: false,
      calculateMenuVisible: false,
      reportLoading: false,
      editLegLoading: []
    };
    verifyUser(({ loggedIn, user, email }) => {
      this.setState(() => ({ loggedIn }));
    });
  }

  updateSearchResults = (state) => {
    this.setState(() => ({
      symbol: state.symbol,
      exists: state.exists,
      priceChange: state.priceChange,
      price: state.price,
      optionsChain: state.optionsChain,
      divYield: state.divYield,
      optionsSelected: [],
      earningsDate: state.earningsDate
    }));
  }

  handleChange = (e) => {
    this.setState(() => ({ [e.target.id]: e.target.value }));
    console.log(this.state);
  }

  setAddLegModalVisible(addLegModalVisible) {
    this.setState({ addLegModalVisible });
  }

  setIVSkewModalVisible(ivSkewModalVisible) {
    this.setState({ ivSkewModalVisible });
  }

  renderLegs() {
    return this.state.optionsSelected.map((option, index) => (
      <OptionsLeg isFirst={index === 0} key={option.key} callback={this.optionsSelectedMoreInfo} deleteSelf={this.deleteOption} optionRepresented={option} />
    ));
  }

  optionsSelectedMoreInfo = (e) => {
    console.log(e);
    this.setState((state) => ({ optionsSelected: [...state.optionsSelected.filter((item) => !(item.key == e.key)), e] }), () => this.resortOptionsSelected(e.symbol));
  }

  modalTrackSelected = (date) => {
    if (this.state.optionsSelected.map((e) => e.date).includes(date)) {
      return (
        <Icon type="pushpin" theme="twoTone" />
      );
    }

    return null;
  }

  renderOptionsChain = () => this.state.optionsChain.map((e) => (
    <CollapsePanel key={`${e[0]}_optionexpiries`} header={e[0]} extra={this.modalTrackSelected(e[0])}>
      <div step-name={`${e[0]}_optionexpiries`}>
        <Table
          dataSource={e[1]}
          columns={this.columns(e[0])}
          rowClassName={(record) => record.atmNess}
          pagination={false}
          size="small"
          scroll={{ y: 500 }}
        />
      </div>
    </CollapsePanel>
  ))

  renderIVSkew = () => this.state.optionsChain.map((e) => (
    <CollapsePanel key={`${e[0]}_ivexpiries`} header={e[0]} extra={this.modalTrackSelected(e[0])}>
      <div className="IVSkewGraphs">
        <div id="IVGraph1">
          <NoAxisGraph data={e[1]} xKey="strike" dataKey="callIV" />
        </div>
        <div id="IVGraph2">
          <NoAxisGraph data={e[1]} xKey="strike" dataKey="putIV" />
        </div>
      </div>
    </CollapsePanel>
  ))

  resortOptionsSelected = (symbol) => {
    this.setState((state) => ({
      optionsSelected: [...state.optionsSelected].sort((a, b) => {
        const t = moment(a.date).diff(moment(b.date), 'days')
        if (t > 0) {
          return 1;
        }
        if (t < 0) {
          return -1;
        }
        if (a.strike < b.strike) {
          return 1;
        }
        if (b.strike < a.strike) {
          return -1;
        }
        if (a.isCall) {
          return 1;
        }

        return -1;
      }),
    }), () => {
      setTimeout(() => {
        this.setState((state) => ({editLegLoading: state.editLegLoading.filter(leg => leg != (symbol))}))
      }, 1000)
    });
  }

  addOption = (isCall, strike, price, date, iv, symbol) => {
    this.setState((state) => ({
      optionsSelected: [...state.optionsSelected, {
        key: symbol, isCall, date, strike, price, iv, symbol,
      }],
    }), () => this.resortOptionsSelected(symbol));
  }

  deleteOption = (symbol) => {
    this.setState((state) => ({ optionsSelected: state.optionsSelected.filter( (e) => !(e.key == symbol) ) }), () => this.resortOptionsSelected(symbol));
  }

  onHandleOptionLegChange = (needToAdd, isCall, strike, price, date, iv, symbol) => {
    // console.log(needToAdd)
    // console.log((needToAdd ? "ADDING" : "DELETING")+' '+(isCall ? "Call" : "Put") + ' STRIKE: ' + strike + '@'+ price + ' => ' + date)
    if (needToAdd) {
      this.addOption(isCall, strike, price, date, iv, symbol);
      this.setState((state) => ({editLegLoading: [...state.editLegLoading, symbol]}), ()=>console.log(this.state.editLegLoading))
    } else {
      this.deleteOption(symbol);
      this.setState((state) => ({editLegLoading: [...state.editLegLoading, symbol]}), ()=>console.log(this.state.editLegLoading))
    }
  }

  profitTableFormatting = () => {
    this.setState((state) => ({
      profitTableData: this.dataToTableConversion(state.mergedOptions.profit),
    }));
    this.setState((state) => ({
      profitColumns: this.columnCreation(state.mergedOptions.profit),
    }));
  }

  profitGraphFormatting = () => {
    this.setState((state) => ({
      profitGraphData: this.dataToGraphConversion(state.optionsSelected.map((option) => ({ profit: option.profit, key: option.key }))),
    }),
    () => console.log(this.state));
  }

  legAddition = (data, dates, legs) => {
    for (const date of dates) {
      for (const point of data) {
        point[date] = 0;
        for (const leg of legs) {
          point[date] += point[`${leg}a${date}`];
        }
      }
    }
    return data;
  }

  dataToTableConversion = (data) => {
    const dataConverted = [];

    for (let i = data[0][1].length - 1, end = 0; i >= end; i--) {
      const o = {};
      o.x = data[0][1][i][0].toFixed(2);
      for (const date of data) {
        o[date[0]] = date[1][i][1].toFixed(2);
      }
      dataConverted.push(o);
    }
    return dataConverted;
  }

  columnCreation = (data) => {
    const columns = [{ title: 'Price', dataIndex: 'x', fixed: 'left' }, ...data.map((key, i) => ({
      title: key[0],
      dataIndex: key[0],
      render: (text, record, index) =>
        // console.log(percentageColor.hexColorFromPercent(data[i][1][index][1]))
        (
          <div style={{ border: percentageColor.hexColorFromPercent(data[i][1][index][1]) }}>
            {text}
          </div>
        ),
    })),
    ];
    return columns;
  }

  dataToGraphConversion = (data) => {
    const dataConverted = [];

    const keyNameObj = { x: 0 };
    for (var option of data) {
      for (var i = data[0].profit.length - 1, factor = Math.round(data[0].profit.length / 7) + 1; i >= 0; i -= factor) {
        keyNameObj[`${option.key}a${option.profit[i][0]}`] = 0;
      }
    }
    for (var j = 0; j < data[0].profit[0][1].length; j++) {
      // console.log(option.key+ option.profit[i][0]+ option.profit[i][1][j])
      dataConverted.push({ ...keyNameObj });
      dataConverted[dataConverted.length - 1].x = data[0].profit[0][1][j][0];
    }
    for (var option of data) {
      for (var i = data[0].profit.length - 1, factor = Math.round(data[0].profit.length / 7) + 1; i >= 0; i -= factor) {
        for (var j = 0; j < data[0].profit[i][1].length; j++) {
          dataConverted[j][`${option.key}a${option.profit[i][0]}`] = option.profit[i][1][j][1];
        }
      }
    }
    return dataConverted;
  }

  calculateProfits = () => {
    const selectedOptions = this.state.optionsSelected;
    if (selectedOptions.filter((o) => !o.hide).length <= 0) {
      return;
    }
    const rangeOfPrices = optionsMath.getRangeOfPrices(this.state.price, this.state.percentInterval, this.state.numberIntervals, 0);
    for (const option of selectedOptions) {
      const rfir = treasury.getRightYield(yields || [], moment(option.date).diff(moment(), 'days')) / 100;
      option.greeks = optionsMath.calculateGreeks(moment(option.date).diff(moment(), 'days') / 365.0, this.state.price, option.strike, option.isCall, option.isLong, rfir, this.state.divYield, option.iv);
      option.profit = [];
      let d = moment();
      while (moment(option.date).diff(d, 'days') > 0) {
        option.profit.push([d.format("YYYY-MM-DD"), rangeOfPrices.map((arr) => arr.slice())]);
        for (var price of option.profit[option.profit.length - 1][1]) {
          price[1] = optionsMath.calculateOptionsPrice(moment(option.date).diff(d, 'days') / 365.0, price[0], option.strike, option.isCall, option.isLong, rfir, this.state.divYield, option.iv);
          price[1] -= option.limitPrice * (option.isLong ? 1 : -1);
          price[1] *= option.hide ? 0 : option.quantity;
        }
        d = d.add(1, 'days');
      }

      // PROFIT AT EXPIRY
      option.profit.push([d.format("YYYY-MM-DD"), rangeOfPrices.map((arr) => arr.slice())]);
      for (price of option.profit[option.profit.length - 1][1]) {
        price[1] = optionsMath.calculateProfitAtExpiry(option.limitPrice, price[0], option.strike, option.isCall, option.isLong);
        price[1] *= option.hide ? 0 : option.quantity;
      }
    }
    this.setState(() => ({ optionsSelected: selectedOptions }),
      () => {
        this.mergeOptions(selectedOptions);
      });
  }

  mergeOptions = (selectedOptions) => {
    const mergedOptions = {
      limitPrice: 0,
      date: '',
      greeks: {
        delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0,
      },
      profit: [],
    };

    // var strategyCost = 0


    for (const option of selectedOptions) {
      mergedOptions.limitPrice += (option.isLong ? 1 : -1) * parseFloat(option.limitPrice) * (option.hide ? 0 : parseInt(option.quantity));

      mergedOptions.greeks.delta += option.greeks.delta * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.gamma += option.greeks.gamma * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.theta += option.greeks.theta * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.vega += option.greeks.vega * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.rho += option.greeks.rho * option.hide ? 0 : option.quantity;
      // strategyCost += option.limitPrice * option.quantity
    }

    console.log(selectedOptions.filter((o) => !o.hide));
    const optionsProfits = selectedOptions.filter((o) => !o.hide).map((o) => o.profit);

    mergedOptions.date = moment(selectedOptions.filter((o) => !o.hide).map((o) => moment(o.date).format("YYYY-MM-DD")).sort((a,b) => moment(a).diff(moment(b)))[0]).format("YYYY-MM-DD");

    mergedOptions.percentProfit = [];
    mergedOptions.profit = this.mergeProfits(optionsProfits, mergedOptions.date);
    for (const day of mergedOptions.profit) {
      mergedOptions.percentProfit.push([day[0], []]);
      for (const price of day[1]) {
        mergedOptions.percentProfit[mergedOptions.percentProfit.length - 1][1].push(
          [
            parseFloat((price[0]).toFixed(2)),
            parseFloat(((price[1]).toFixed(2)) + mergedOptions.limitPrice) / Math.abs(mergedOptions.limitPrice),
          ],
        );
      }
    }

    this.profitGraphFormatting();

    this.setState(() => ({ mergedOptions }),
      () => {
        this.profitTableFormatting();
        console.log(this.state);
      });
  }

  mergeProfits = (optionsProfits, expiry) => {
    const profitMap = [];
    let d = moment();
    const rangeOfPrices = optionsMath.getRangeOfPrices(this.state.price, this.state.percentInterval, this.state.numberIntervals, 0);
    while (moment(expiry).diff(d, 'days') > 0) {
      profitMap.push([d.format("YYYY-MM-DD"), rangeOfPrices.map((arr) => arr.slice())]);
      for (const price of profitMap[profitMap.length - 1][1]) {
        for (const profitSet of optionsProfits) {
          console.log(structure.mapToObject(profitSet))
          console.log(d.format("YYYY-MM-DD"))
          price[1] += structure.mapToObject(structure.mapToObject(profitSet)[d.format("YYYY-MM-DD")])[price[0]];
        }
      }
      d = d.add(1, 'days');
    }
    return profitMap;
  }

  openOptionsChainModal = () => this.setAddLegModalVisible(true)

  closeOptionsChainModal = () => this.setAddLegModalVisible(false)

  sendCalcError = () => {
    this.setState(() => ({reportLoading: true}), () => {
      const input = document.getElementsByTagName('html')[0];
      html2canvas(input).then((c) => {
        const base64image = c.toDataURL('image/png');
        const formData = new FormData();
        formData.append('file', structure.dataURItoBlob(base64image), 'img');
        post.fileReq('/api/bug/imageReport', formData);
      });
      post.fetchReq('/api/bug/report',
        JSON.stringify({
          options: this.state.optionsSelected
            .map((option) => Object.keys(option).filter((key) => key != 'profit')
              .reduce((obj, key) => {
                obj[key] = option[key];
                return obj;
              },
              {})),
        }),
        (data) => {
          console.log('Report Sent');
          this.setState(() => ({reportLoading: false}))
          console.log(data);
      });
    })
  }

  columns = (expiry) => [
    {
      title: '',
      dataIndex: 'callAction',
      width: '10%',
      render: (text, row) => (this.state.editLegLoading.includes(row.callSymbol) ? <SpinningLogo /> : <Checkbox disabled={isNaN(row.callIV)} checked={this.state.optionsSelected.some((option) => option.key === row.callSymbol) || false} onChange={(e) => { this.onHandleOptionLegChange(e.target.checked, true, row.strike, row.call, expiry, row.callIV, row.callSymbol); }} />),
    },
    {
      title: 'Call',
      dataIndex: 'call',
    },
    {
      title: 'Call Vol',
      dataIndex: 'callVol',
      width: '10%',
      render: (text, row) => (row.callOutlier ? (<strong>{text}</strong>) : (<div>{text}</div>)),
    },
    {
      title: 'Call IV',
      dataIndex: 'callIV',
      render: (text) => (<div>{isNaN(text) ? `-` : text.toFixed(2)}</div>),
    },
    {
      title: 'Strike',
      dataIndex: 'strike',
    },
    {
      title: 'Put',
      dataIndex: 'put',
    },
    {
      title: 'Put Vol',
      dataIndex: 'putVol',
      render: (text, row) => (row.putOutlier ? (<strong>{text}</strong>) : (<div>{text}</div>)),
    },
    {
      title: 'Put IV',
      dataIndex: 'putIV',
      render: (text) => (<div>{isNaN(text) ? `-` : text.toFixed(2)}</div>),
    },
    {
      title: '',
      dataIndex: 'putAction',
      render: (text, row) => (this.state.editLegLoading.includes(row.putSymbol) ? <SpinningLogo /> : <Checkbox disabled={isNaN(row.putIV)} checked={this.state.optionsSelected.some((option) => option.key === row.putSymbol) || false} onChange={(e) => { this.onHandleOptionLegChange(e.target.checked, false, row.strike, row.put, expiry, row.putIV, row.putSymbol); }} />),
    },
  ]

  saveStrategy = () => {
    if (this.state.symbol != '' && this.state.optionsSelected.length > 0) {
      if (Cookie.get(this.state.symbol.toUpperCase()) != undefined) {
        Cookie.set(this.state.symbol.toUpperCase(),
          [...Cookie.get(this.state.symbol.toUpperCase()), this.state.optionsSelected]);
      } else {
        Cookie.set(this.state.symbol.toUpperCase(),
          [this.state.optionsSelected]);
      }
    }

    if (this.state.loggedIn) {
      post.fetchReqAuth('/api/strategy/save', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id'), ticker: this.state.symbol, strategy: this.state.optionsSelected }), (data) => {
        console.log(data);
      });
    } else {
      // Not Logged in, reroute the uesr to login
    }
  }

  loadStrategy = () => {
    console.log(Cookie.get());
  }

  startTutorial = () => {
    // introJs('.intro').start();
    this.setState(() => ({ isTourOpen: true }));
  }

  closeTutorial = () => {
    this.setState(() => ({ isTourOpen: false }));
  }

  tutorialSteps = (state) => [
    // Step 1: Title
    {
      position: 'right',
      selector: '[step-name="title"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            What's up 😊? I'm Mr. Outsmart, a sentient AI that'll help guide you on your journey.
            Follow the arrows (⬅➡) and you'll get it in no time.
          <br />
          <a onClick={() => goTo(step)}> Click me ➡ when you're ready to go. </a>
        </div>
      ),
      style: {
        backgroundColor: 'black',
        color: 'white',
      },
    },
    // Step 2: Stock Symbol
    {
      position: 'right',
      selector: '[step-name="stock-symbol-input"]',
      content: ({ goTo, inDOM, step }) => {
        if (!state.exists || state.symbol != '') {
          goTo(step);
        }
        return (
          <div>
            First things first, you should type in a stock and press enter. 😎 (Try something like AAPL or MSFT)
          </div>
        );
      },
    },
    // Step 3: Stock Symbol Incorrect
    {
      position: 'right',
      selector: '[step-name="stock-nonexistent"]',
      content: ({ goTo, inDOM, step }) => {
        if (inDOM) {
          return (
            <div>
              Well, well, well 😒. Looks like we got a rebel here.
              <a onClick={() => {
                this.setState(() => ({ exists: true, symbol: '' }));
                goTo(1);
              }}
              >
                {' '}
Go back ⬅
              </a>
              and type in a stock that actually exists and has options.
            </div>
          );
        }

        goTo(step);
      },
    },
    // Step 4: Price
    {
      position: 'right',
      selector: '[step-name="stock-price"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            Once you type in the stock, you'll see the current price right here. Pretty cool right?
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to move on</a>
          <br />
          <a onClick={() => {
            this.setState(() => ({ symbol: '' }));
            goTo(1);
          }}
          >
Click here ⬅ to input a stock
          </a>
        </div>
      ),
    },
    // Step 5: Percent Change
    {
      position: 'right',
      selector: '[step-name="stock-percent-change"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            And here is the percent change for the day. We don't have premarket moves, so only during and after market hours will you see any changes.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to move on</a>
          <br />
          <a onClick={() => {
            this.setState(() => ({ symbol: '' }));
            goTo(1);
          }}
          >
Click here ⬅ to input a stock
          </a>
        </div>
      ),
    },
    // Step 6: Edit Leg Button
    {
      position: 'right',
      selector: '[step-name="edit-leg"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.addLegModalVisible) {
          goTo(step);
        }
        return (
          <div>
            So here is where we get into the meat 🍖 of this thing.
            This button will open up the options chain.
            Note that if you -sigh- didn't type in an stock that
            has an options chain 😓 the button will be disabled.
            However, if a stock doesn't immediately load the button, don't get scared 😯.
            It may take a while to load. So go ahead, click the button.
            <br />
            <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
          </div>
        );
      },
    },
    // Step 7: Show modal with expiries
    {
      position: 'right',
      selector: '[step-name="edit-leg-modal"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.activeOptionExpiry != undefined && state.activeOptionExpiry.length > 0) {
          goTo(step);
        }
        if (state.addLegModalVisible) {
          return (
            <div>
              Here it is 🎉.
              Each date displayed is an expiry date for the contracts available for the stock.
              So what are you waiting for? Pick an expiry.
              <br />
              <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
              <br />
              <a onClick={() => {
                this.closeOptionsChainModal();
                goTo(step - 2);
              }}
              >
                Click here ⬅ to go back.
              </a>
            </div>
          );
        }

        goTo(step - 2);
      },
    },
    // Step 8: Show selected expiry table
    {
      position: 'right',
      selector: `[step-name="${state.activeOptionExpiry || ' '}"]`,
      content: ({ goTo, inDOM, step }) => {
        if (inDOM && state.addLegModalVisible && state.activeOptionExpiry != undefined && state.activeOptionExpiry != '') {
          return (
            <div>
              Yikes 😬. A lot, right?
              You'll see call options on the left, put options on the right.
              If you found the green row, that is the at-the-money strike.
              Use the checkboxes ☑ to add a contract to your strategy. Or 3 contracts. Or 5. Up to you 🤷‍♀️.
              <br />
              If you don't know what these words mean 🤔, you should probably go to our help page. We explain stuff in detail there 🤓.
              <br />
              <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
              <br />
              <a onClick={() => {
                this.closeOptionsChainModal();
                goTo(step - 3);
              }}
              >
Click here ⬅ to go back.
              </a>
            </div>
          );
        }

        goTo(step - 2);
      },
    },
    // Step 9: Ok button on modal
    {
      position: 'right',
      selector: '[step-name="ok-button-modal"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.addLegModalVisible) {
          if (state.optionsSelected.length > 0) {
            return (
              <div>
                Once you select all the strategies your heart desires, click this ok button 🆗.
              </div>
            );
          }

          goTo(step - 2);
        } else {
          goTo(step);
        }
      },
    },
    // Step 10: Example option leg
    {
      position: 'right',
      selector: '[step-name="example-contract"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            Here's the list of the options you just selected.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(5)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 11: Option name
    {
      position: 'right',
      selector: '[step-name="contract-name"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            This is the name of the contract.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 12: Option long or short
    {
      position: 'right',
      selector: '[step-name="buy-or-write"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            Here you can specify whether this specific option is being written or bought.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 13: Option quantity.
    {
      position: 'right',
      selector: '[step-name="option-quantity"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            And here's some more input if you wanna increase the quantity of the specific contract 💸.
            Maybe you wanna buy 3, 4, 50 contracts. No judgement here 🤐.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 14: Option bought at price.
    {
      position: 'right',
      selector: '[step-name="limit-price"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            And another input 😪. This is for specifying the price you paid or got paid for this specific leg.
            For example, you may have already bought a contract and it didn't go so well 📉.
            In that case you can type in that you paid a bit more than the price now.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 15: Calculate button
    {
      position: 'right',
      selector: '[step-name="calculate-button"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.mergedOptions != undefined) {
          goTo(step);
        }
        return (
          <div>
            Finally, we get to the big cheese 🧀. Hit this calculate button for the results we've all been waiting for.
            <br />
            <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
          </div>
        );
      },
    },
    // Step 16: Cost of strat card
    {
      position: 'right',
      selector: '[step-name="cost-card"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            Here is the cost of the strategy.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => {
            this.setState(() => ({ mergedOptions: undefined }));
            goTo(step - 2);
          }}
          >
Click here ⬅ to go back.
          </a>
        </div>
      ),
    },
    // Step 17: Profit graph
    {
      position: 'right',
      selector: '[step-name="profit-graph"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            graf
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 18: Profit table
    {
      position: 'right',
      selector: '[step-name="profit-table"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
            table
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
  ]

renderCalculateMenu = () => (
  <Menu>
    <Menu.Item key="1">
      <InputNumber
        placeholder="Percent Interval"
        onPressEnter={this.calculateProfits}
        onChange={(e) => { this.setState(() => ({ percentInterval: e })); }}
        suffix={(
          <Icon type="percentage" />
      )}
      />
    </Menu.Item>
    <Menu.Item key="2">
      <InputNumber
        placeholder="Number of Intervals"
        onPressEnter={this.calculateProfits}
        onChange={(e) => { this.setState(() => ({ numberIntervals: e })); }}
        suffix={(
          <Icon type="number" />
      )}
      />
    </Menu.Item>
    <Menu.Item key='3'>
      <Button onClick = { () => {this.setState(() => ({erVisible : true, calculateMenuVisible: false}))} }>
        Show Calender
      </Button>
      <Modal
      visible = {this.state.erVisible}
      onOk = { () => {this.setState(() => ({erVisible : false, calculateMenuVisible: true}))} }
      onCancel = { () => {this.setState(() => ({erVisible : false, calculateMenuVisible: true}))} }
      >
        <StockCalendar earningsDate = {this.state.earningsDate} fullscreen={false} />
      </Modal>
    </Menu.Item>
  </Menu>
);

render() {
  return (
    <div>
      <div style={{ width: '60px', paddingBottom: '20px' }} />
      <div style={{ width: '60px', display: 'inline-block' }} />
      <h1 key="mainTitle" step-name="title" style={{ width: '135px', display: 'inline-block' }}>Outsmart Options</h1>
      <StockSymbol updateCallback={this.updateSearchResults} yieldCurve={yields} options={true} historical={false} />

      <hr id="hr" align="left" />

      <div className="optionsList" step-name="example-contract">{this.renderLegs()}</div>

      <div className="optionsButtons">
        <div style={{ width: '60px', display: 'inline-block' }} />
        <div id="addLegButton" step-name="edit-leg">
          <Button icon="edit" disabled={this.state.optionsChain[0] == undefined ? true : (this.state.optionsChain[0][0] == 'Empty')} onClick={this.openOptionsChainModal}>Edit Legs</Button>
          <div className="addLegButtonWrapper">
            <div>
              <Modal
                title="Add Leg"
                centered
                width="50%"
                visible={this.state.addLegModalVisible}
                footer={(
                  <Button key="ok" step-name="ok-button-modal" type="primary" onClick={this.closeOptionsChainModal}>
                    Ok
                  </Button>
                )}
                onCancel={this.closeOptionsChainModal}
              >
                <div step-name="edit-leg-modal">
                  <Collapse onChange={(e) => { this.setState(() => ({ activeOptionExpiry: e })); }} accordion>
                    {this.renderOptionsChain()}
                  </Collapse>
                </div>

              </Modal>
            </div>
          </div>
        </div>
        <div style={{ width: '43px', display: 'inline-block' }} />
        <div id="ivSkewButton">
          <Button
            icon="profile"
            disabled={this.state.optionsChain[0] == undefined ? true : (this.state.optionsChain[0][0]
            == 'Empty')}
            onClick={() => this.setIVSkewModalVisible(true)}
          >
IV Skew
          </Button>
          <div className="addLegButtonWrapper">
            <Modal
              title="IV Skew"
              centered
              width="50%"
              visible={this.state.ivSkewModalVisible}
              footer={(
                <Button key="ok" type="primary" onClick={() => this.setIVSkewModalVisible(false)}>
                  Ok
                </Button>
              )}
              onCancel={() => this.setIVSkewModalVisible(false)}
            >
              <Collapse accordion>
                {this.renderIVSkew()}
              </Collapse>
            </Modal>
          </div>
        </div>
        <div style={{ width: '43px', display: 'inline-block' }} />
        <div id="strategyButton"><Button icon="fund" onClick={() => {}}>Strategy</Button></div>
        <div style={{ width: '43px', display: 'inline-block' }} />
        <div id="calculateButton" step-name="calculate-button">
          <ButtonGroup>
            <Button onClick={this.calculateProfits} type="primary">Calculate</Button>
            <Button type="primary" icon="cloud" onClick={()=>{this.setState(() => ({calculateMenuVisible: true}))}} />
          </ButtonGroup>
        </div>
        <Modal 
        visible={this.state.calculateMenuVisible}
        onOk = {() => {this.setState(() => ({calculateMenuVisible: false}))}}
        onCancel = {() => {this.setState(() => ({calculateMenuVisible: false}))}}
        >
          {this.renderCalculateMenu()}
        </Modal>
        <div id="saveButton"><Button shape="circle" icon="save" onClick={this.saveStrategy} /></div>
        <div id="savedStrategyButton"><Button shape="circle" icon="download" onClick={this.loadStrategy} /></div>
      </div>
      <br />
      <div>
        {
        this.state.mergedOptions != undefined
          ? (
            <div>
              <div className="costStrategy">
                <StrategyInfo stockPrice={this.state.price} optionsSelected={this.state.optionsSelected} mergedOptions={this.state.mergedOptions} />
              </div>

              <div className="profitGraphWrapper" step-name="profit-graph">
                <ProfitGraph data={this.state.profitGraphData} legAddition={this.legAddition} keys={Object.keys(this.state.profitGraphData[0]).filter((o) => o != 'x')} />
              </div>

              <hr id="hr2" />
              <h3 style={{ marginLeft: '60px' }}>Profit Table:</h3>
              <div className="profitTableWrapper" step-name="profit-table" style={{width: '80vw'}}>
                <Table dataSource={this.state.profitTableData} columns={this.state.profitColumns} pagination={false} scroll={{ x: 500 }} size="small" />
              </div>
              <Button onClick={this.sendCalcError} loading = {this.state.reportLoading}>Report Calculation Error</Button>
            </div>
          )
          : null
      }
      </div>
      <Tour
        steps={this.tutorialSteps(this.state)}
        showNavigation={false}
        showNumber={false}
        showButtons={false}
        showCloseButton={false}
        disableKeyboardNavigation
        maskSpace={3}
        startAt={0}
        update={JSON.stringify(this.state)}
        onAfterOpen={(target) => disableBodyScroll(target)}
        onBeforeClose={(target) => enableBodyScroll(target)}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTutorial}
      />
    </div>
  );
}
}

export default OptionsCalculator;
