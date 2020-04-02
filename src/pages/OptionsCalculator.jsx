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
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { NoAxisGraph, ProfitGraph } from '../components/Graphs.jsx';
import { StrategyInfo } from '../components/StrategyInfo.jsx';
import SpinningLogo from '../components/SpinningLogo.jsx';
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
      activeOptionExpiry: '',
      numberIntervals: 15,
      percentInterval: 1,
      erVisible: false,
      calculateMenuVisible: false,
      reportLoading: false,
      editLegLoading: [],
    };
    verifyUser(({ loggedIn, user, email }) => {
      this.setState(() => ({ loggedIn }));
    });
  }

  updateSearchResults = (state) => {
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
          rowClassName={(record) => record.atm?"atmStrike":""}
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

  addOption = (isCall, strike, price, date, iv, symbol) => {
    this.setState((state) => ({
      optionsSelected: [...state.optionsSelected, {
        key: symbol, isCall, date, strike, price, iv, symbol,
      }],
    }), () => this.resortOptionsSelected(symbol));
  }

  deleteOption = (symbol) => {
    this.setState((state) => ({ optionsSelected: state.optionsSelected.filter((e) => !(e.key == symbol)) }), () => this.resortOptionsSelected(symbol));
  }

  onHandleOptionLegChange = (needToAdd, isCall, strike, price, date, iv, symbol) => {
    // console.log(needToAdd)
    // console.log((needToAdd ? "ADDING" : "DELETING")+' '+(isCall ? "Call" : "Put") + ' STRIKE: ' + strike + '@'+ price + ' => ' + date)
    if (needToAdd) {
      this.addOption(isCall, strike, price, date, iv, symbol);
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
      profitColumns: this.columnCreation(state.mergedOptions.profit),
    }));
  }

  profitGraphFormatting = () => {
    this.setState((state) => ({
      profitGraphData: structure.dataToGraphConversion(state.optionsSelected.map((option) => ({ profit: option.profit, key: option.key }))),
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
      limitPrice: 0,
      date: '',
      greeks: {
        delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0,
      },
      profit: [],
    };

    for (const option of selectedOptions) {
      mergedOptions.limitPrice += (option.isLong ? 1 : -1) * parseFloat(option.limitPrice) * (option.hide ? 0 : parseInt(option.quantity));

      mergedOptions.greeks.delta += option.greeks.delta * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.gamma += option.greeks.gamma * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.theta += option.greeks.theta * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.vega += option.greeks.vega * option.hide ? 0 : option.quantity;
      mergedOptions.greeks.rho += option.greeks.rho * option.hide ? 0 : option.quantity;
    }

    const optionsProfits = selectedOptions.filter((o) => !o.hide).map((o) => o.profit);

    mergedOptions.date = moment(selectedOptions.filter((o) => !o.hide).map((o) => moment(o.date).format('YYYY-MM-DD')).sort((a, b) => moment(a).diff(moment(b)))[0]).format('YYYY-MM-DD');

    mergedOptions.profit = optionsMath.mergeProfits(this.state.price, this.state.percentInterval, this.state.numberIntervals, optionsProfits, mergedOptions.date);
    
    mergedOptions.percentProfit = optionsMath.percentProfit(mergedOptions.profit, mergedOptions.limitPrice)

    this.profitGraphFormatting();

    this.setState(() => ({ mergedOptions }),
      () => {
        this.profitTableFormatting();
        console.log(this.state);
      });
  }

  openOptionsChainModal = () => this.setAddLegModalVisible(true)

  closeOptionsChainModal = () => this.setAddLegModalVisible(false)

  sendCalcError = () => {
    this.setState(() => ({ reportLoading: true }), () => {
      const input = document.getElementsByTagName('html')[0];
      html2canvas(input).then((c) => {
        const base64image = c.toDataURL('image/png');
        const formData = new FormData();
        formData.append('file', structure.dataURItoBlob(base64image), 'img');
        request.fileReq('/api/bug/imageReport', formData);
      });
      request.postFetchReq('/api/bug/report',
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
          this.setState(() => ({ reportLoading: false }));
          console.log(data);
        });
    });
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
      render: (text) => (<div>{isNaN(text) || text === null ? '-' : text.toFixed(2)}</div>),
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
      render: (text) => (<div>{isNaN(text) || text === null ? '-' : text.toFixed(2)}</div>),
    },
    {
      title: '',
      dataIndex: 'putAction',
      render: (text, row) => (this.state.editLegLoading.includes(row.putSymbol) ? <SpinningLogo /> : <Checkbox disabled={isNaN(row.putIV)} checked={this.state.optionsSelected.some((option) => option.key === row.putSymbol) || false} onChange={(e) => { this.onHandleOptionLegChange(e.target.checked, false, row.strike, row.put, expiry, row.putIV, row.putSymbol); }} />),
    },
  ]

  startTutorial = () => {
    // introJs('.intro').start();
    this.setState(() => ({ isTourOpen: true }));
  }

  closeTutorial = () => {
    this.setState(() => ({ isTourOpen: false }));
  }

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
    <Menu.Item key="3">
      <Button onClick={() => { this.setState(() => ({ erVisible: true, calculateMenuVisible: false })); }}>
        Show Calender
      </Button>
      <Modal
        visible={this.state.erVisible}
        onOk={() => { this.setState(() => ({ erVisible: false, calculateMenuVisible: true })); }}
        onCancel={() => { this.setState(() => ({ erVisible: false, calculateMenuVisible: true })); }}
      >
        <StockCalendar earningsDate={this.state.earningsDate} fullscreen={false} />
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
      <StockSymbol updateCallback={this.updateSearchResults} yieldCurve={yields} options historical={false} />

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
            <Button type="primary" icon="cloud" onClick={() => { this.setState(() => ({ calculateMenuVisible: true })); }} />
          </ButtonGroup>
        </div>
        <Modal
          visible={this.state.calculateMenuVisible}
          onOk={() => { this.setState(() => ({ calculateMenuVisible: false })); }}
          onCancel={() => { this.setState(() => ({ calculateMenuVisible: false })); }}
        >
          {this.renderCalculateMenu()}
        </Modal>
        <div id="strategyButtons"><StrategySelector symbol={this.state.symbol} optionsSelected={this.state.optionsSelected} /></div>
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
              <div className="profitTableWrapper" step-name="profit-table" style={{ width: '80vw' }}>
                <Table dataSource={this.state.profitTableData} columns={this.state.profitColumns} pagination={false} scroll={{ x: 500 }} size="small" />
              </div>
              <Button onClick={this.sendCalcError} loading={this.state.reportLoading}>Report Calculation Error</Button>
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
