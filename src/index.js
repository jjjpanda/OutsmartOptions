import React from 'react';
import ReactDOM from 'react-dom';

import logo from './img/logo.png'

import {
  Input,
  version,
  Button,
  Switch,
  Modal,
} from 'antd';

const { Search } = Input

import "./css/logo.css";
import "./css/calculator.css";

class OptionsCalculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      symbol:"", 
      price: 0,
      addLegModalVisible: false,
      optionsChain: "",
      optionsSelected: [],
      numOfLegs : 0
    };
  }

  onSearch = e => {
    //console.log(e);
    this.setState({ symbol: e, price : 0 });
    fetch("/price",
      {
        method: "post", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ticker: e})}
    )
    .then(res => res.json())
    .then( 
      (data) => {
        console.log(data);
        console.log(this.state);
        this.setState({symbol : e, price : data.price, priceChange : data.change});
      }
    );
    fetch("/chain",
      {
        method: "post", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ticker: e})}
    )
    .then(res => res.json())
    .then( 
      (data) => {
        console.log(data)
        this.setState({optionsChain: data});
      }
    );
  };

  addOption = e => {
    this.setState({options : [...this.state.optionsSelected, e]})
  }
  
  removeOption = e => {
    this.setState({options : this.state.optionsSelected.filter(ele => {return ele.key !== e })})
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
    console.log(this.state);
  }

  setAddLegModalVisible(addLegModalVisible) {
    this.setState({ addLegModalVisible: addLegModalVisible });
  }

  renderLegs() {
    var legs = []
    for (var i = 0; i < this.state.numOfLegs; i++){ 
      legs.push(<OptionsLeg onCreate={this.addOption} onDelete={this.removeOption}/>);
    }
    return legs
  }
  
  onOk = () => {
    this.setState({numOfLegs : this.state.numOfLegs+1})
    this.setAddLegModalVisible(false)
  }

  render() { return (
    <div className="StockSymbol">
      <div className = "stockHeadings">
        <div id= "stockSymbolHeading">Stock Symbol:</div>
        <div id= "stockPriceHeading">Stock Price:</div>
        <div id= "priceChangeHeading">Stock Price Change:</div>
      </div>
      <div className="stockInputs">
        <div id="stockSymbolInput"><Search placeholder="Enter..." onSearch={this.onSearch}/></div>
        <div id="stockPriceBox"><Input placeholder={"$"+this.state.price} disabled/></div>
        <div id="priceChangeBox"><Input placeholder={this.state.priceChange+"%"} disabled/></div>
      </div>
      <hr id="hr" align='left'/>
      <div className="optionsList">{this.renderLegs()}</div>
      <div className="optionsButtons">
          <div id= "addLegButton">
            <Button icon="plus" onClick={() => this.setAddLegModalVisible(true)}>Add Leg</Button>
            <Modal
              title="Add Leg"
              centered
              visible={this.state.addLegModalVisible}
              onOk={this.onOk}
              onCancel={() => this.setAddLegModalVisible(false)}
            >
              <p>Insert Table Here...</p>
              <pre style={{height: '200px', 'overflow-y': 'scroll'}}>{JSON.stringify(this.state.optionsChain, null, 1)}</pre>
        </Modal>

          </div>

          <div id= "ivSkewButton"><Button icon="profile">IV Skew</Button></div>
          <div id= "strategyButton"><Button icon="fund">Strategy</Button></div>
          <div id= "calculateButton"><Button type="primary">Calculate</Button></div>
          <div id= "saveButton"><Button shape="circle" icon="save" /></div>
        </div>
    </div>);
    
  }
}

class OptionsLeg extends React.Component {
  constructor(props){
    super(props);
    props.onCreate()
    this.state = {
      buyOrWrite: true,
      quantity: 0,
      atPrice: 0,
    };
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
    console.log(this.state);
  }

  handleSwitchChange(checked) {
    this.setState({buyOrWrite: checked})
    console.log(`switch to ${checked}`);
    console.log(this.state);
  }

  render() { 
    return (
      <div className="Options Editor">
        <div className="optionsHeadings">
          <div id= "buyWriteHeading">Buy or Write:</div>
          <div id= "contractHeading">Contract:</div>
          <div id= "xHeading">x</div>
          <div id= "quantityHeading">Quantity:</div>
          <div id= "atPriceHeading">At Price:</div>
        </div>
        <div className="optionsInputs">
          <div id= "buyWriteSwitch"><Switch checkedChildren="Buy" unCheckedChildren="Write" defaultChecked onChange={(e) => this.handleSwitchChange(e)}/></div>
          <div id= "contractBox"><Input placeholder="Contract" disabled/></div>
          <div id= "quantityInput"><Input id="quantity" placeholder="Enter..." onChange={(e) => this.handleChange(e)}/></div>
          <div id= "atPriceInput"><Input id="atPrice" placeholder="Enter..." onChange={(e) => this.handleChange(e)}/></div>
          <div id= "editButton"><Button shape="circle" icon="edit" /></div>
          <div id= "removeButton"><Button shape="circle" icon="delete" /></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  [
    <img id = "logo" className = "spin" src={logo}></img>,
    <h1 style={{paddingLeft:'60px'}}>Outsmart Options</h1>,
    <OptionsCalculator />
  ],
  document.getElementById('root')
);
