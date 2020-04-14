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
  Spin,
} from 'antd';

import Tour from 'reactour';
import Cookie from 'js-cookie';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {
  aesthetique as aes,
  mathematique as math,
  utilique as util,
} from 'que-series';
import * as moment from 'moment';
import { NoAxisGraph, ProfitGraph } from '../components/Graphs.jsx';
import { StrategyInfo } from '../components/StrategyInfo.jsx';
import OptionsChain from '../components/OptionsChain.jsx'
import IVSkew from '../components/IVSkew.jsx'
import EquityModal from '../components/EquityModal.jsx'
import CalculateMenu from '../components/CalculateMenu.jsx'
import ReportModal from '../components/ReportModal.jsx'
import StockSymbol from '../components/StockSymbol.jsx';
import StockCalendar from '../components/StockCalendar.jsx';
import StrategySelector from '../components/StrategySelector.jsx'
import OptionsLeg from '../components/OptionsLeg.jsx';
import verifyUser from '../components/UserVerifier.jsx';

// JS Libraries

import {tutorialSteps} from './tour/OptionCalculatorTour.jsx'

const optionsMath = math.options;
const { treasury } = math;

const percentageColor = aes.color;

const { request, structure } = util;

const ButtonGroup = Button.Group;
const CollapsePanel = Collapse.Panel;

// Treasury Yields
let yields = [];
request.postFetchReq('/api/market/yields', '', (data) => {
  yields = data.yields;
});

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
      numberIntervals: 15,
      percentInterval: 1,
      erVisible: false,
      calculateMenuVisible: false,
      reportLoading: false,
      editLegLoading: [],
      saved: false
    };
    verifyUser(({ loggedIn, user, email }) => {
      this.setState(() => ({ loggedIn }));
    });
    this.stockSymbol = React.createRef()
    
    this.props.updateApp(this.state)
  }

  updateSearchResults = (state, callback) => {
    console.log(state)
    this.setState(() => ({
      symbol: state.symbol,
      exists: state.exists,
      priceChange: state.priceChange,
      price: state.price,
      optionsChain: state.optionsChain,
      divYield: state.divYield,
      optionsSelected: [],
      earningsDate: state.earningsDate,
    }), () => {
      if(callback != undefined) {
        callback()
      }
    });
  }

  handleChange = (e) => {
    this.setState(() => ({ [e.target.id]: e.target.value }));
    console.log(this.state);
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


  resortOptionsSelected = (symbol) => {
    this.setState((state) => ({
      optionsSelected: [...state.optionsSelected].sort((a, b) => {
        const t = moment(a.date).diff(moment(b.date), 'hours');
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
        this.setState((state) => ({ editLegLoading: state.editLegLoading.filter((leg) => leg != (symbol)) }));
      }, 1000);
    });
  }

  addOption = (isCall, isLong, strike, price, cost, date, iv, symbol) => {
    this.setState((state) => ({
      optionsSelected: [...state.optionsSelected, {
        key: symbol, isCall, isLong, date, strike, price, cost, iv, symbol
      }],
    }), () => this.resortOptionsSelected(symbol));
  }

  deleteOption = (symbol) => {
    this.setState((state) => ({ optionsSelected: state.optionsSelected.filter((e) => !(e.key == symbol)) }), () => this.resortOptionsSelected(symbol));
  }

  loadInOptionsSelected = (legs) => {
    for(let leg of legs){
      const rfir = treasury.getRightYield(yields || [], moment(leg.date).diff(moment(), 'days')) / 100;
      const iv = optionsMath.calculateIV(moment(leg.date).diff(moment(), 'hours')/(365*24), leg.price, this.state.price, leg.strike, leg.isCall, rfir, this.state.divYield)
      const currentPrice = this.state.optionsChain.find(o => o[0] === leg.date)[1].find(o => o.strike === leg.strike)[`${leg.isCall ? "call" : "put"}`]
      console.log(currentPrice, leg.price)
      this.onHandleOptionLegChange(true, leg.isCall, leg.isLong, leg.strike, currentPrice, leg.price, leg.date, iv, leg.symbol)
    }

  }

  onHandleOptionLegChange = (needToAdd, isCall, isLong, strike, price, cost, date, iv, symbol) => {
    // console.log(needToAdd)
    // console.log((needToAdd ? "ADDING" : "DELETING")+' '+(isCall ? "Call" : "Put") + ' STRIKE: ' + strike + '@'+ price + ' => ' + date)
    if (needToAdd) {
      this.addOption(isCall, isLong, strike, price, cost, date, iv, symbol);
      this.setState((state) => ({ editLegLoading: [...state.editLegLoading, symbol] }), () => console.log(this.state.editLegLoading));
    } else {
      this.deleteOption(symbol);
      this.setState((state) => ({ editLegLoading: [...state.editLegLoading, symbol] }), () => console.log(this.state.editLegLoading));
    }
  }

  profitTableFormatting = () => {
    this.setState((state) => ({
      profitTableData: structure.dataToTableConversion(state.mergedOptions.profit),
    }));
    this.setState((state) => ({
      profitColumns: this.columnCreation(state.mergedOptions.profit, state.mergedOptions.percentProfit),
    }));
  }

  profitGraphFormatting = () => {
    this.setState((state) => ({
      profitGraphData: structure.dataToGraphConversion(state.optionsSelected.map((option) => ({ profit: option.profit, key: option.key }))),
    }),
    () => console.log(this.state));
  }

  columnCreation = (data, pData) => {
    const columns = [{ title: 'Price', dataIndex: 'x', fixed: 'left' }, ...data.map((key, i) => ({
      title: key[0],
      dataIndex: key[0],
      render: (text, record, index) =>
        //console.log(data[i][1][index][1], pData[i][1][index][1])
        (
          <div style={{ backgroundColor: percentageColor.hexColorFromPercentA([...pData[i][1]].reverse()[index][1]) }}>
            {text}
          </div>
        ),
    })),
    ];
    return columns;
  }

  calculateProfits = () => {
    const selectedOptions = this.state.optionsSelected;
    if (selectedOptions.filter((o) => !o.hide).length <= 0) {
      return;
    }
    
    for (const option of selectedOptions) {
      const rfir = treasury.getRightYield(yields || [], moment(option.date).diff(moment(), 'days')) / 100;
      option.greeks = optionsMath.calculateGreeks(moment(option.date).diff(moment(), 'hours') / (365*24), this.state.price, option.strike, option.isCall, option.isLong, rfir, this.state.divYield, option.iv);
      option.profit = optionsMath.calculateProfits(this.state.price, this.state.percentInterval, this.state.numberIntervals, option, rfir, this.state.divYield)
    }
    this.setState(() => ({ optionsSelected: selectedOptions }),
      () => {
        this.mergeOptions(selectedOptions);
      });
  }

  mergeOptions = (selectedOptions) => {
    const mergedOptions = {
      cost: 0,
      date: '',
      greeks: {
        delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0,
      },
      profit: [],
    };

    for (const option of selectedOptions) {
      mergedOptions.cost += (option.isLong ? 1 : -1) * parseFloat(option.cost) * (option.hide ? 0 : parseInt(option.quantity));

      mergedOptions.greeks.delta += option.greeks.delta * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.gamma += option.greeks.gamma * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.theta += option.greeks.theta * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.vega += option.greeks.vega * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.rho += option.greeks.rho * option.hide ? 0 : option.quantity;
    }

    const optionsProfits = selectedOptions.filter((o) => !o.hide).map((o) => o.profit);

    mergedOptions.date = moment(selectedOptions.filter((o) => !o.hide).map((o) => moment(o.date).format('YYYY-MM-DD')).sort((a, b) => moment(a).diff(moment(b)))[0]).format('YYYY-MM-DD');

    mergedOptions.profit = optionsMath.mergeProfits(this.state.price, this.state.percentInterval, this.state.numberIntervals, optionsProfits, mergedOptions.date);
    
    mergedOptions.percentProfit = optionsMath.percentProfit(mergedOptions.profit, mergedOptions.cost)

    this.profitGraphFormatting();

    this.setState(() => ({ mergedOptions }),
      () => {
        this.profitTableFormatting();
        console.log(this.state);
      });
  }

  

  startTutorial = () => {
    // introJs('.intro').start();
    this.setState(() => ({ isTourOpen: true }));
  }

  closeTutorial = () => {
    this.setState(() => ({ isTourOpen: false }));
  }

  render() {
    return (
      <div>
        <div style={{ width: '60px', paddingBottom: '20px' }} />
        <div style={{ width: '60px', display: 'inline-block' }} />
        <h1 key="mainTitle" step-name="title" style={{ width: '135px', display: 'inline-block' }}>Outsmart Options</h1>
        <StockSymbol ref={this.stockSymbol} updateCallback={this.updateSearchResults} yieldCurve={yields} options historical={false} />

        <hr id="hr" align="left" />

        <div className="optionsList" step-name="example-contract">{this.renderLegs()}</div>

        <div className="optionsButtons">
          <div style={{ width: '15px', display: 'inline-block' }} />
          {/* <EquityModal symbol={this.state.symbol} price={this.state.price} onHandleOptionLegChange={this.onHandleOptionLegChange} />
           */}
          <div style={{ width: '43px', display: 'inline-block' }} />
          <OptionsChain onHandleOptionLegChange={this.onHandleOptionLegChange} modalTrackSelected={this.modalTrackSelected} editLegLoading={this.state.editLegLoading} optionsSelected={this.state.optionsSelected} optionsChain= {this.state.optionsChain} />
          <div style={{ width: '43px', display: 'inline-block' }} />
          <IVSkew modalTrackSelected={this.modalTrackSelected} optionsChain={this.state.optionsChain} />
          <div style={{ width: '43px', display: 'inline-block' }} />
          <div id="strategyButton"><Button icon="fund" onClick={() => {}}>Strategy</Button></div>
          <div style={{ width: '43px', display: 'inline-block' }} />
          <div id="calculateButton" step-name="calculate-button">
            <ButtonGroup>
              <Button onClick={this.calculateProfits} type="primary">Calculate</Button>
              <Button type="primary" icon="setting" onClick={() => { this.setState(() => ({ calculateMenuVisible: true })); }} />
            </ButtonGroup>
          </div>
          <Modal
            title="Calculate Settings"
            visible={this.state.calculateMenuVisible}
            onOk={() => { this.setState(() => ({ calculateMenuVisible: false })); }}
            onCancel={() => { this.setState(() => ({ calculateMenuVisible: false })); }}
          >
            <CalculateMenu 
              calculateProfits={this.calculateProfits} 
              intervalChange={(e) => { this.setState(() => ({ percentInterval: e })); }} 
              numberChange ={(e) => { this.setState(() => ({ numberIntervals: e })); }} 
            />
          </Modal>
          <div id="strategyButtons"><StrategySelector loadInOptionsSelected={this.loadInOptionsSelected} forceSearch={(symbol, callback) => {this.stockSymbol.current.onSearch(symbol, undefined, callback)}} symbol={this.state.symbol} optionsSelected={this.state.optionsSelected} /></div>
          <div id="calendarButton"><StockCalendar earningsDate={this.state.earningsDate} /></div>
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
                  <ProfitGraph data={this.state.profitGraphData} keys={Object.keys(this.state.profitGraphData[0]).filter((o) => o != 'x')} />
                </div>

                <hr id="hr2" />
                <h3 style={{ marginLeft: '60px' }}>Profit Table:</h3>
                <div className="profitTableWrapper" step-name="profit-table" style={{ width: '80vw' }}>
                  <Table dataSource={this.state.profitTableData} columns={this.state.profitColumns} pagination={false} scroll={{ x: 'max-content' }} size="small" />
                </div>
                <ReportModal optionsSelected={this.state.optionsSelected} loading ={this.state.reportLoading} />
              </div>
            )
            : null
        }
        </div>
        <Tour
          steps={tutorialSteps(this.state, this)}
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
