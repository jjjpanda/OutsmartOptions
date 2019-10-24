//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Input,
  version,
  Button,
  Switch,
  Modal,
  Table,
  Collapse,
  Checkbox,
  Icon,
  Layout,
  Menu,
} from 'antd';
const { Search } = Input
const { Panel } = Collapse
const { Header, Footer, Sider, Content } = Layout;
import {XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend} from 'recharts';

//JS Libraries
import * as optionsMath from './jsLib/optionsMathLibrary.js'
import * as timeMath from './jsLib/timeLibrary.js'
import * as structure from './jsLib/structuresEditingLibrary.js'
import * as post from './jsLib/fetchLibrary.js'

//Files
import logo from './img/logo.png'

//CSS
import "./css/logo.css";
import "./css/calculator.less";

//Treasury Yields
post.fetchReq('/treasury', '', (data) => {
  console.log(data)
})

class OptionsCalculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      symbol:"",
      exists: true,
      priceChange: 0, 
      price: 0,
      addLegModalVisible: false,
      optionsChain: [['Empty',{}]],
      optionsSelected: []
    };
  }

  onSearch = e => {
    //console.log(e);
    this.setState({exists: true})
    
    post.fetchReq('/price', JSON.stringify({ticker: e}), (data) => {
      console.log(data);
      if (data.price === undefined){
        data.price = 0;
        data.change = 0;
        this.setState({exists: false});
      }
      this.setState(() => ({symbol : e, price : data.price, priceChange : data.change, optionsSelected: []}), 
        () => {console.log(this.state)}); 
    })

    post.fetchReq('/divYield', JSON.stringify({ticker: e}), (data) => {
      this.setState({divYield : data.dividendAnnum/this.state.price})
    })

    post.fetchReq('/chain', JSON.stringify({ticker: e}), (data) => {
      data = data.filter((x)=>{
        return [x[0], x[1].map((y, index)=>{
            y['callIV'] = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.call, this.state.price, y.strike, true, 0,this.state.divYield);
            y['putIV'] = optionsMath.calculateIV(timeMath.timeTillExpiry(timeMath.stringToDate(x[0])), y.put, this.state.price, y.strike, false, 0,this.state.divYield);
            y['atmNess'] = x[1][index+1] != undefined ? ( (x[1][index].strike < this.state.price && x[1][index+1].strike > this.state.price) ? "atmStrike" : "" ) : ""; 
            return y    
        })]
      })
      this.setState(() => ({optionsChain: data}), () => {console.log(this.state)});
    })

  };
  
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
    console.log(this.state);
  }

  setAddLegModalVisible(addLegModalVisible) {
    this.setState({ addLegModalVisible: addLegModalVisible });
  }

  renderLegs() {
    return this.state.optionsSelected.map((option) => (
      <OptionsLeg key= {option.key} callback = {this.optionsSelectedMoreInfo} deleteSelf ={this.deleteOption} optionRepresented={option}/>
    ));
  }

  optionsSelectedMoreInfo = (e) => {
    console.log(e)
    this.setState(state => ({optionsSelected: [...state.optionsSelected.filter(item => !(item.key==e.key)), e]}), this.resortOptionsSelected)
  }
  
  onOk = () => {
    //console.log(this.state.optionsSelected)
    this.setAddLegModalVisible(false)
  }

  renderOptionsChain = () => {
    return this.state.optionsChain.map(e => (
      <Panel key = {e[0]+"_expiries"} header={e[0]}>
        <Table dataSource = {e[1]} columns ={this.columns(e[0])} 
          rowClassName={(record) => record.atmNess} 
          pagination={false} size="small" scroll={{ y: 500 }} /> 
      </Panel>
    ))
  }

  resortOptionsSelected = () => {
    this.setState((state) => ({optionsSelected : [...state.optionsSelected].sort((a, b) => {
      var t = timeMath.timeBetweenDates(timeMath.stringToDate(a.date),timeMath.stringToDate(b.date))
      if(t>0){
        return 1;
      }
      else if(t<0){
        return -1;
      }
      if(a.strike < b.strike){
        return 1;
      }
      else if(b.strike < a.strike){
        return -1;
      }
      if(a.isCall){
        return 1;
      }
      else{
        return -1;
      }
    })}), () => console.log(this.state))
  }



  addOption = (isCall, strike, price, date, iv) => {
    this.setState((state) => ({optionsSelected : [...state.optionsSelected, {key: date+strike+(isCall?"C":"P"), isCall:isCall, date:date, strike:strike, price:price, iv:iv}]}), this.resortOptionsSelected)
  }

  deleteOption = (isCall, strike, date) => {
    this.setState((state) => ({optionsSelected : state.optionsSelected.filter( (e) => !(e.key == date+strike+(isCall?"C":"P")))}))
  }

  onHandleOptionLegChange = (needToAdd, isCall, strike, price, date, iv) => {
    //console.log(needToAdd)
    //console.log((needToAdd ? "ADDING" : "DELETING")+' '+(isCall ? "Call" : "Put") + ' STRIKE: ' + strike + '@'+ price + ' => ' + date)
    if(needToAdd){
      this.addOption(isCall, strike, price, date, iv)
    }
    else{
      this.deleteOption(isCall, strike, date)
    }
  }

  profitTableFormatting = () => {
    this.setState((state) => 
      ({
        profitTableData: this.dataToTableConversion(state.mergedOptions.profit)
      })
    )
    this.setState((state) =>
      ({
        profitColumns: this.columnCreation(state.mergedOptions.profit)
      })
    )
  }

  profitGraphFormatting = () => {
    this.setState((state) =>
      ({
        profitGraphData: this.dataToGraphConversion(state.optionsSelected.map(option => {return {profit:option.profit, key:option.key}}))
      })
    ,()=>console.log(this.state))
  }

  legAddition = (data, dates, legs) => {
    for(var date of dates){
      for(var point of data){
        point[date] = 0
        for(var leg of legs){
          point[date] += point[leg+'a'+date]
        }
      }
    }
    return data
  }

  dataToTableConversion = (data) => {
    var dataConverted = []
  
    for(var i = data[0][1].length - 1, end = 0; i >= end; i--){
      var o ={};
      o['x'] = data[0][1][i][0].toFixed(2)
      for(var date of data){
        o[date[0]] = date[1][i][1].toFixed(2)
      }
      dataConverted.push(o)
    }
    return dataConverted
  }

  columnCreation = (data) => {
    var columns = [{title: '', dataIndex:"x"}, ...data.map(key => ({
      title: key[0],
      dataIndex: key[0],
      render: (text) => {return (<div style= {{ color: parseFloat(text)>= 0 ? '#006400': '#ff3311'}}>{text}</div> )}
    }))
    ]
    return columns
  }

  dataToGraphConversion = (data) => {
    var dataConverted = []
   
    var keyNameObj = {x:0}
    for(var option of data){
      for(var i = data[0].profit.length - 1, factor = Math.round(data[0].profit.length / 7) + 1; i >= 0; i-=factor){
        keyNameObj[option.key+"a"+option.profit[i][0]] = 0;
      }
    }
    for(var j = 0; j < data[0].profit[0][1].length; j++){
      //console.log(option.key+ option.profit[i][0]+ option.profit[i][1][j])
      dataConverted.push({...keyNameObj})
      dataConverted[dataConverted.length - 1].x = data[0].profit[0][1][j][0]
    }
    for(var option of data){
      for(var i = data[0].profit.length - 1, factor = Math.round(data[0].profit.length / 7) + 1; i >= 0; i-=factor){
        for(var j = 0; j < data[0].profit[i][1].length; j++){
          dataConverted[j][option.key+"a"+option.profit[i][0]] = option.profit[i][1][j][1]
        }
      }
    }
    return dataConverted
  }

  calculateProfits = () => {
    var selectedOptions = this.state.optionsSelected
    if(selectedOptions.length <= 0){
      return;
    }
    var rangeOfPrices = optionsMath.getRangeOfPrices(this.state.price, 1, 15, 0)
    for(var option of selectedOptions){
      option.greeks = optionsMath.calculateGreeks(timeMath.timeTillExpiry(timeMath.stringToDate(option.date)), this.state.price, option.strike, option.isCall, option.isLong,0,this.state.divYield, option.iv)  
      option.profit = []
      var d = timeMath.getCurrentDate();
      while(timeMath.timeBetweenDates(timeMath.stringToDate(option.date), d) > 0){
        option.profit.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
        for(var price of option.profit[option.profit.length-1][1]){
          price[1] = optionsMath.calculateOptionsPrice(timeMath.percentageOfYear(timeMath.timeBetweenDates(timeMath.stringToDate(option.date), d)), price[0], option.strike, option.isCall, option.isLong,0, this.state.divYield, option.iv) 
          price[1] -= option.limitPrice * (option.isLong?1:-1)
          price[1] *= option.quantity
        }
        d = timeMath.incrementOneDay(d)
      }

      //PROFIT AT EXPIRY
      option.profit.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
      for(price of option.profit[option.profit.length-1][1]){
          price[1] = optionsMath.calculateProfitAtExpiry(option.limitPrice, price[0], option.strike, option.isCall, option.isLong)
          price[1] *= option.quantity
      }

    }
    this.setState(() => ({optionsSelected : selectedOptions}), 
    ()=>{
      this.mergeOptions(selectedOptions)
    })
  }

  mergeOptions = (selectedOptions) => {
    var mergedOptions = {'limitPrice':0, 'date':"", 'greeks':{'delta':0, 'gamma':0, 'theta':0, 'vega':0, 'rho':0}, 'profit':{}}    
    
    for (var option of selectedOptions){
        mergedOptions.limitPrice += (option.isLong ? 1 : -1) * option.limitPrice * option.quantity

        mergedOptions.greeks.delta += option.greeks.delta * option.quantity
        mergedOptions.greeks.gamma += option.greeks.gamma * option.quantity
        mergedOptions.greeks.theta += option.greeks.theta * option.quantity
        mergedOptions.greeks.vega += option.greeks.vega * option.quantity
        mergedOptions.greeks.rho += option.greeks.rho * option.quantity
    }

    var optionsProfits = selectedOptions.map(o => o.profit)

    mergedOptions.date = timeMath.dateToString(selectedOptions.map( o => timeMath.stringToDate(o.date) ).sort(timeMath.timeBetweenDates)[0])
       
    mergedOptions.percentProfit = []
    mergedOptions.profit = this.mergeProfits(optionsProfits, mergedOptions.date) 
    for(var day of mergedOptions.profit){
        mergedOptions.percentProfit.push([day[0], []])
        for(var price of day[1]){
            mergedOptions.percentProfit[mergedOptions.percentProfit.length-1][1].push(
                [
                  parseFloat((price[0]).toFixed(2))
                  ,parseFloat(((price[1]).toFixed(2))+mergedOptions.limitPrice)/Math.abs(mergedOptions.limitPrice)
                ]
            )
        }
    }
    
    this.profitGraphFormatting()

    this.setState(() => ({mergedOptions: mergedOptions}),
    ()=>{
      this.profitTableFormatting()
      console.log(this.state)
    })
  }

  mergeProfits = (optionsProfits, expiry) => {
    var profitMap = []
    var d = timeMath.getCurrentDate()
    var rangeOfPrices = optionsMath.getRangeOfPrices(this.state.price, 1, 15, 0)
    while(timeMath.timeBetweenDates(timeMath.stringToDate(expiry), d) > -1){
        profitMap.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
        for(var price of profitMap[profitMap.length-1][1]){
            for(var profitSet of optionsProfits){
                price[1] += structure.mapToObject(structure.mapToObject(profitSet)[timeMath.dateToString(d)])[price[0]]
            }
        }
        d = timeMath.incrementOneDay(d)
    }
    return profitMap
  }

  columns = (expiry) => { return [
    {
      title: '',
      dataIndex: 'callAction',
      width: '10%',
      render: (text, row) =>
      <Checkbox checked= {this.state.optionsSelected.some(option => option.key === expiry+row.strike+"C") || false} onChange = {(e) => {this.onHandleOptionLegChange(e.target.checked, true, row.strike, row.call, expiry, row.callIV);}}></Checkbox>
    },
    {
      title: 'Call',
      dataIndex: 'call'
    },
    {
      title: 'Call Vol',
      dataIndex: 'callVol',
      width: '10%',
    },
    {
      title: 'Strike',
      dataIndex: 'strike'
    },
    {
      title: 'Put',
      dataIndex: 'put',
    },
    {
      title: 'Put Vol',
      dataIndex: 'putVol',
    },
    {
      title: '',
      dataIndex: 'putAction',
      render: (text, row) =>
      <Checkbox checked= {this.state.optionsSelected.some(option => option.key === expiry+row.strike+"P") || false} onChange = {(e) => {this.onHandleOptionLegChange(e.target.checked, false, row.strike, row.put, expiry, row.putIV);}}></Checkbox>
    },
  ]}

  render() { return (
    <div>
      <StockSymbol onSearch={this.onSearch} price={this.state.price} priceChange={this.state.priceChange} exists={this.state.exists}/>
      
      <hr id="hr" align='left'/>

      <div className="optionsList">{this.renderLegs()}</div>

      <div className="optionsButtons">
          <div id= "addLegButton">
            <Button icon="edit" onClick={() => this.setAddLegModalVisible(true)}>Edit Legs</Button>
            <div className="addLegButtonWrapper">
              <Modal
                title="Add Leg"
                centered
                width = "1"
                visible={this.state.addLegModalVisible}
                onOk={this.onOk}
                onCancel={() => this.setAddLegModalVisible(false)}
              >
                <Collapse accordion>
                  {this.renderOptionsChain()}
                </Collapse>
              </Modal>
            </div>

          </div>

          <div id= "ivSkewButton"><Button icon="profile">IV Skew</Button></div>
          <div id= "strategyButton"><Button icon="fund">Strategy</Button></div>
          <div id= "calculateButton"><Button onClick={this.calculateProfits} type="primary">Calculate</Button></div>
          <div id= "saveButton"><Button shape="circle" icon="save" /></div>
          <div id= "savedStrategyButton"><Button shape="circle" icon="download" /></div>
        </div>
        <br />
        <div>{
          this.state.mergedOptions != undefined ?
          (
            <div>
              <div className="profitGraphWrapper">
                <ProfitGraph data={this.state.profitGraphData} legAddition ={this.legAddition} keys={Object.keys(this.state.profitGraphData[0]).filter(o => o!="x")}/>
              </div>
              <hr />
              <Table dataSource={this.state.profitTableData} columns={this.state.profitColumns} pagination={false} size="small" />
            </div>
          ): 
          (
            <pre>
              {JSON.stringify(this.state.mergedOptions != undefined ?  this.state.mergedOptions.profit : undefined, null, 2)}
            </pre>
          )
        }</div>
    </div>);
    
  }
}

class StockSymbol extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <div className = "stockSymbol">
          <div id= "stockSymbolHeading">Stock Symbol:</div>
          <div id="stockSymbolInput">
              <div id="searchWrapper"><Search placeholder="Enter..." onSearch={this.props.onSearch}/></div>
            <div id="exists">{this.props.exists ? null:(<Icon  type="close-circle" />)}</div>
          </div>
        </div>
        <div className="stockPrice">
          <div id= "stockPriceHeading">Stock Price:</div> 
          <div id="stockPriceBox"><Input placeholder={"$"+this.props.price} disabled/></div>
        </div>
        <div className="stockPriceChange">
          <div id= "priceChangeHeading">Stock Price Change:</div>
          <div id="priceChangeBox"><Input placeholder={this.props.priceChange+"%"} disabled/></div>
        </div>
      </div>
    );
  }
}

class OptionsLeg extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key: props.optionRepresented.date + props.optionRepresented.strike + (props.optionRepresented.isCall?"C":"P"),
      isCall : props.optionRepresented.isCall,
      date: props.optionRepresented.date,
      strike: props.optionRepresented.strike,
      price: props.optionRepresented.price,
      iv: props.optionRepresented.iv,
      isLong: true,
      quantity: 1,
      limitPrice: props.optionRepresented.price,
      hide: false
    };
    this.props.callback(this.state)
  }

  handleChange = (e) => {
    e.persist()
    this.setState(() => ({[e.target.id]: e.target.value}),
      () => {this.props.callback(this.state)}
    );
    //console.log(this.state);
  }

  handleSwitchChange = (checked) => {
    this.setState(() => ({isLong: checked}), 
      () => {this.props.callback(this.state)}
    )
    //console.log(`switch to ${checked}`);
    //console.log(this.state);
  }

  disableSelf = () => {
    this.setState((state) => ({hide: !state.hide}), 
      () => {this.props.callback(this.state)}
    )
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
          <div id= "buyWriteSwitch"><Switch checkedChildren="Buy" unCheckedChildren="Write" defaultChecked onChange={this.handleSwitchChange}/></div>
          <div id= "contractBox">
            <Input placeholder="Contract" value={this.state.date + " " + this.state.strike + " " + (this.state.isCall?"C":"P")} disabled/>
          </div>
          <div id= "quantityInput"><Input id="quantity" placeholder={this.state.quantity} onChange={this.handleChange}/></div>
          <div id= "atPriceInput"><Input id="limitPrice" placeholder={this.state.limitPrice} onChange={this.handleChange}/></div>
          <div id= "removeButton"><Button shape="circle" icon="delete" onClick={() => {this.props.deleteSelf(this.state.isCall, this.state.strike, this.state.date)}}/></div>
          <div id= "disableButton"><Button shape="circle" icon="stop" onClick={this.disableSelf}/></div>
        </div>
      </div>
    );
  }
}


class ProfitGraph extends React.Component{
  constructor(props){
    super(props)
    var legs = Array.from(new Set(props.keys.map(a=> a.substring(0, a.indexOf("a"))))).filter(a => a!="")
    var dates = Array.from(new Set(props.keys.map(a=> a.substring(a.indexOf("a")+1)))).filter(a => a!="")
    this.state = {
      data: props.legAddition(props.data, dates, legs),
      keys: props.keys, 
      legs: legs,
      dates: dates,
      disabledDates : []
    }
  }

  static getDerivedStateFromProps(props, state){
    if(props.keys !== state.keys){
      var legs = Array.from(new Set(props.keys.map(a=> a.substring(0, a.indexOf("a"))))).filter(a => a!="")
      var dates = Array.from(new Set(props.keys.map(a=> a.substring(a.indexOf("a")+1)))).filter(a => a!="")
      return {
        data: props.legAddition(props.data, dates, legs),
        keys: props.keys, 
        legs: legs,
        dates: dates,
        disabledDates : []
      }
    }
    else{
      return null;
    }
  }

  disableDate = (event) => {
    this.setState((state)=> {
      if(state.disabledDates.includes(event.dataKey)){
        return ({disabledDates : state.disabledDates.filter(a => a != event.dataKey)})
      }
      else{
        return ({disabledDates : [...state.disabledDates, event.dataKey]})
      }
    }
    )
  }

  gradientOffset = (data, y) => {
    const dataMax = Math.max(...data.map((i) => i[y]));
    const dataMin = Math.min(...data.map((i) => i[y]));
    
    if (dataMax <= 0){
      return 0
    }
    else if (dataMin > 0){
      return 1
    }
    else{
      return Math.abs(dataMax) / Math.abs(dataMax - dataMin);
    }
  }

  opacities = (dates) => {
    var opacities = {} 
    if(dates.length == 1){
      opacities[dates[0]] = 1;
      return opacities
    }
    for (var date of dates){
      opacities[date] = timeMath.timeBetweenDates(timeMath.stringToDate(date), timeMath.getCurrentDate())
    }
    //console.log(opacities)
    var minOpacity = Math.min(...Object.values(opacities))
    var maxOpacity = Math.max(...Object.values(opacities))
    for (var date of dates){
      opacities[date] -= minOpacity - (maxOpacity-minOpacity)/2
      opacities[date] /= (maxOpacity-minOpacity)
    }
    return opacities
  }

  colorOfLine = (data, y, opacity) => {
    const arr = data.map((i) => i[y])
    if(arr.every(e => e === arr[0])){
      if(arr[0] > 0){
        return '#008000' + ("00"+Math.round(opacity*255).toString(16)).substr(-2)
      }
      else {
        return '#ff0000' + ("00"+Math.round(opacity*255).toString(16)).substr(-2)
      }
    }
    else{
      return "url(#splitColor" + y + ")"
    }
  }

  renderLines = () => {
    /*
    console.log(this.state.dates)
    console.log(this.state.disabledDates)
    console.log(this.state.dates.filter(a => !this.state.disabledDates.includes(a)))
    */
    var opacities = this.opacities(this.state.dates)

    var arr=[]   
    for( var date of this.state.dates){
      arr.push((<defs>
        <linearGradient id={"splitColor"+date} x1="0" y1="0" x2="0" y2="1">
          <stop offset={this.gradientOffset(this.state.data, date)} stopColor="green" stopOpacity={opacities[date]}/>
          <stop stopColor="red" stopOpacity={opacities[date]}/>
        </linearGradient>
      </defs>
      ))
      arr.push((
        <Line name = {date} type="monotone" dot={false} hide={this.state.disabledDates.includes(date)} dataKey={date} stroke={this.colorOfLine(this.state.data, date, opacities[date])} />
      ))
    }
    return arr
  }

	render () {
  	return (
    	<LineChart
        width={600}
        height={400}
        data={this.state.data}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={'x'}/>
        <YAxis/>
        {this.renderLines()}
        <Legend onClick= {this.disableDate} align="left" verticalAlign="middle" layout="vertical" />
        <Tooltip/>
      </LineChart>
    );
  }
}

class SideMenu extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" ><img key="mainLogo" id = "logo" className = "spin" src={logo}></img>/></div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="calculator" />
              <span>Calculator</span>
            </Menu.Item>
            <Menu.Item key="sub1">
              <Icon type="eye" />
              <span>Watchlist</span>
            </Menu.Item>
            <Menu.Item key="sub2">
              <Icon type="login" />
              <span>Login</span>
            </Menu.Item>
            <Menu.Item key="9">
            <Icon type="question-circle-o" />
              <span>Help</span>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}

ReactDOM.render(
  [
    <Layout style={{ minHeight: '100vh' }}>
        <SideMenu/>
      <Layout>
        <Content>
          {/*<img key="mainLogo" id = "logo" className = "spin" src={logo}></img>,*/}
          <h1 key = "mainTitle" style={{paddingLeft:'60px', paddingTop:'20px'}}>Outsmart Options</h1>
          <OptionsCalculator key="theVoiceOfThePeople"/>
        </Content>
        <Footer>
        </Footer>
      </Layout>
    </Layout>
  ],
  document.getElementById('root')
);
