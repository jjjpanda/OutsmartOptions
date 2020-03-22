import React from 'react';
import {
  Input,
  Button,
  Switch,
  Icon,
  Modal,
} from 'antd';

import {
  utilique as util,
} from 'que-series';
import { BarLineComboGraph } from './Graphs.jsx';
import HelpTooltip from './HelpTooltip.jsx';

const { post } = util;

class OptionsLeg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: props.optionRepresented.symbol,
      isFirst: props.isFirst,
      key: props.optionRepresented.symbol,
      isCall: props.optionRepresented.isCall,
      date: props.optionRepresented.date,
      strike: props.optionRepresented.strike,
      price: props.optionRepresented.price,
      iv: props.optionRepresented.iv,
      isLong: true,
      quantity: 1,
      limitPrice: props.optionRepresented.price,
      hide: false,
      visible: false,
    };
    post.fetchReq('/api/market/historical', JSON.stringify({ ticker: props.optionRepresented.symbol }), (data) => {
      this.setState(() => ({ historical: data }));
    });
    this.props.callback(this.state);
  }

    handleClick = () => {
      this.setState(() => ({ visible: true }));
    }

    handleOk = () => {
      this.setState(() => ({ visible: false }));
    }

    handleCancel = () => {
      this.setState(() => ({ visible: false }));
    }

    handleChange = (e) => {
      e.persist();
      this.setState(() => ({ [e.target.id]: e.target.value }),
        () => { this.props.callback(this.state); });
      // console.log(this.state);
    }

    handleSwitchChange = (checked) => {
      this.setState(() => ({ isLong: checked }),
        () => { this.props.callback(this.state); });
      // console.log(`switch to ${checked}`);
      // console.log(this.state);
    }

    disableSelf = () => {
      this.setState((state) => ({ hide: !state.hide }),
        () => { this.props.callback(this.state); });
    }

    render() {
      return (
        <div className="Options Editor">
          <div className="optionsHeadings">
            <div style={{ width: '60px', display: 'inline-block' }} />
            <div className="buyWrite" step-name={this.props.isFirst ? 'buy-or-write' : ''}>
              Buy or Write:&nbsp;
              {this.props.isFirst ? (
                <HelpTooltip hide={false} title="Buy or Write" content="Options can be bought or sold. So click to reveal what you want to do with this specific contract." />
              ) : null}
              <div id="buyWriteSwitch">
                <Switch checkedChildren="Buy" unCheckedChildren="Write" defaultChecked onChange={this.handleSwitchChange} />
              </div>
            </div>
            <div style={{ width: '60px', display: 'inline-block' }} />
            <div className="contract" step-name={this.props.isFirst ? 'contract-name' : ''}>
              Contract:&nbsp;
              {this.props.isFirst ? (
                <HelpTooltip hide={false} title="Contract" content={"Here's the name of contract. For example, 2019-12-20 180 C means a call contract with a strike price of 180 expiring on December 20, 2019. If you have no idea what that means, go to our help page."} />
              ) : null}
              <div id="contractBox">
                <Input placeholder="Contract" value={`${this.state.date} ${this.state.strike} ${this.state.isCall ? 'C' : 'P'}`} disabled />
                {this.state.hide ? (<Icon className="disabledLeg" type="close-circle" />) : null}
              </div>
            </div>
            <div id="xHeading">x</div>
            <div style={{ width: '30px', display: 'inline-block' }} />
            <div className="quantity" step-name={this.props.isFirst ? 'option-quantity' : ''}>
              Quantity:&nbsp;
              {this.props.isFirst ? (
                <HelpTooltip hide={false} title="Quantity" content="This is the number of contracts. You can buy 1, 3, 5, 1145." />
              ) : null}
              <div id="quantityInput"><Input id="quantity" placeholder={this.state.quantity} onChange={this.handleChange} /></div>
            </div>
            <div style={{ width: '63px', display: 'inline-block' }} />
            <div className="atPrice" step-name={this.props.isFirst ? 'limit-price' : ''}>
              At Price:&nbsp;
              {this.props.isFirst ? (
                <HelpTooltip hide={false} title="Price" content={"Suppose you made the mistake of buying a contract when it was a bit more valuable. Oof. Or maybe you've made a little profit but need some guidance. You can specify how much you paid for it so the calculator will account for that."} />
              ) : null}
              <div id="atPriceInput"><Input id="limitPrice" placeholder={this.state.limitPrice} onChange={this.handleChange} /></div>
            </div>
            <div className="removeDisable">
              <div id="removeButton"><Button shape="circle" icon="delete" onClick={() => { this.props.deleteSelf(this.state.key); }} /></div>
              <div id="disableButton"><Button shape="circle" icon="stop" onClick={this.disableSelf} /></div>
              <div id="contractGraphButton">
                <Button onClick={this.handleClick}>
                  <Icon type="fund" />
                </Button>
                <Modal
                  title={`${this.state.date} ${this.state.strike} ${this.state.isCall ? 'C' : 'P'}`}
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <BarLineComboGraph data={this.state.historical} xKey="date" lineKey="close" barKey="volume" />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default OptionsLeg;
