import React from 'react';
import {
  Input,
  Card,
  Button,
  Switch,
  Modal,
  Table,
  Collapse,
  Checkbox,
  Icon,
} from 'antd';
const { Panel } = Collapse

import {NoAxisGraph, ProfitGraph} from './components/graphs.js'
import {HelpTooltip} from "./components/help-tooltip.js"
import {StockSymbol} from './components/stocksymbol.js'

import Tour from 'reactour'
import Cookies from 'js-cookie'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

//JS Libraries
import * as optionsMath from './jsLib/optionsMathLibrary.js'
import * as timeMath from './jsLib/timeLibrary.js'
import * as structure from './jsLib/structuresEditingLibrary.js'
import * as post from './jsLib/fetchLibrary.js'
import * as treasury from './jsLib/treasuryLibrary.js'

//Treasury Yields
var yields;
post.fetchReq('/treasury', '', (data) => {
  yields = data;
})

class OptionsCalculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      symbol:"",
      exists: true,
      priceChange: 0, 
      price: 0,
      divYield: 0,
      addLegModalVisible: false,
      ivSkewModalVisible: false,
      isTourOpen: false,
      optionsChain: [['Empty',{}]],
      optionsSelected: [],
      activeOptionExpiry: ""
    };
  }

  updateSearchResults = (state) => {
    this.setState(() => ({
      symbol: state.symbol,
      exists: state.exists,
      priceChange: state.priceChange, 
      price: state.price,
      optionsChain: state.optionsChain,
      divYield: state.divYield,
      optionsSelected : []
    }))
  }

  handleChange = e => {
    this.setState(() => ({[e.target.id]: e.target.value}));
    console.log(this.state);
  }

  setAddLegModalVisible(addLegModalVisible) {
    this.setState({ addLegModalVisible: addLegModalVisible });
  }

  setIVSkewModalVisible(ivSkewModalVisible) {
    this.setState({ ivSkewModalVisible: ivSkewModalVisible });
  }

  renderLegs() {
    return this.state.optionsSelected.map((option, index) => (
      <OptionsLeg isFirst={index===0 ? true:false} key= {option.key} callback = {this.optionsSelectedMoreInfo} deleteSelf ={this.deleteOption} optionRepresented={option}/>
    ));
  }

  optionsSelectedMoreInfo = (e) => {
    console.log(e)
    this.setState(state => ({optionsSelected: [...state.optionsSelected.filter(item => !(item.key==e.key)), e]}), this.resortOptionsSelected)
  }

  modalTrackSelected = (date) => {
    if(this.state.optionsSelected.map(e => e.date).includes(date)){
      return (
        <Icon type = "pushpin" theme = "twoTone"/>
      )
    }
    else{
      return null;
    }
  }

  renderOptionsChain = () => {
    return this.state.optionsChain.map((e) => (
      <Panel key = {e[0]+"_optionexpiries"} header={e[0]} extra = {this.modalTrackSelected(e[0])} >
          <div step-name = {e[0]+"_optionexpiries"}>
            <Table dataSource = {e[1]} columns ={this.columns(e[0])} 
              rowClassName={(record) => record.atmNess} 
              pagination={false} size="small" scroll={{ y: 500 }} />
          </div>
      </Panel>
    ))
  }

  renderIVSkew = () => {
    return this.state.optionsChain.map(e => (
      <Panel key = {e[0]+"_ivexpiries"} header={e[0]} extra = {this.modalTrackSelected(e[0])}>
        <div className="IVSkewGraphs">
          <div id="IVGraph1">
            <NoAxisGraph data = {e[1]} xKey = {'strike'} dataKey = {'callIV'}></NoAxisGraph>
          </div>
          <div id="IVGraph2">
            <NoAxisGraph data = {e[1]} xKey = {'strike'} dataKey = {'putIV'}></NoAxisGraph>
          </div>
        </div>
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

  disableBody = target => disableBodyScroll(target)
  enableBody = target => enableBodyScroll(target)

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
    var columns = [{title: 'Price', dataIndex:"x", fixed:"left"}, ...data.map(key => ({
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
    if(selectedOptions.filter(o => !o.hide).length <= 0){
      return;
    }
    var rangeOfPrices = optionsMath.getRangeOfPrices(this.state.price, 1, 15, 0)
    for(var option of selectedOptions){
      var rfir = treasury.getRightYield(yields || [], timeMath.timeBetweenDates(timeMath.stringToDate(option.date),timeMath.getCurrentDate())) / 100
      option.greeks = optionsMath.calculateGreeks(timeMath.timeTillExpiry(timeMath.stringToDate(option.date)), this.state.price, option.strike, option.isCall, option.isLong,rfir,this.state.divYield, option.iv)  
      option.profit = []
      var d = timeMath.getCurrentDate();
      while(timeMath.timeBetweenDates(timeMath.stringToDate(option.date), d) > 0){
        option.profit.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
        for(var price of option.profit[option.profit.length-1][1]){
          price[1] = optionsMath.calculateOptionsPrice(timeMath.percentageOfYear(timeMath.timeBetweenDates(timeMath.stringToDate(option.date), d)), price[0], option.strike, option.isCall, option.isLong,rfir, this.state.divYield, option.iv) 
          price[1] -= option.limitPrice * (option.isLong?1:-1)
          price[1] *= option.hide ? 0 : option.quantity
        }
        d = timeMath.incrementOneDay(d)
      }

      //PROFIT AT EXPIRY
      option.profit.push([timeMath.dateToString(d),rangeOfPrices.map(function(arr) {return arr.slice();})])
      for(price of option.profit[option.profit.length-1][1]){
          price[1] = optionsMath.calculateProfitAtExpiry(option.limitPrice, price[0], option.strike, option.isCall, option.isLong)
          price[1] *= option.hide ? 0 : option.quantity
      }

    }
    this.setState(() => ({optionsSelected : selectedOptions}), 
    ()=>{
      this.mergeOptions(selectedOptions)
    })
  }

  mergeOptions = (selectedOptions) => {
    var mergedOptions = {'limitPrice':0, 'date':"", 'greeks':{'delta':0, 'gamma':0, 'theta':0, 'vega':0, 'rho':0}, 'profit':[]}    
    
    //var strategyCost = 0
  
    
    for (var option of selectedOptions){
        mergedOptions.limitPrice += (option.isLong ? 1 : -1) * parseFloat(option.limitPrice) * (option.hide ? 0 : parseInt(option.quantity))

        mergedOptions.greeks.delta += option.greeks.delta * option.hide ? 0 : option.quantity
        mergedOptions.greeks.gamma += option.greeks.gamma * option.hide ? 0 : option.quantity
        mergedOptions.greeks.theta += option.greeks.theta * option.hide ? 0 : option.quantity
        mergedOptions.greeks.vega += option.greeks.vega * option.hide ? 0 : option.quantity
        mergedOptions.greeks.rho += option.greeks.rho * option.hide ? 0 : option.quantity
        //strategyCost += option.limitPrice * option.quantity
        
    }

    console.log(selectedOptions.filter(o => !o.hide))
    var optionsProfits = selectedOptions.filter(o => !o.hide).map(o => o.profit)

    mergedOptions.date = timeMath.dateToString(selectedOptions.filter(o => !o.hide).map( o => timeMath.stringToDate(o.date) ).sort(timeMath.timeBetweenDates)[0])
       
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

  openOptionsChainModal = () => this.setAddLegModalVisible(true)
  closeOptionsChainModal = () => this.setAddLegModalVisible(false)
  
  sendCalcError = () => {
    const input = document.getElementsByTagName('html')[0]
    html2canvas(input).then(c => {
      var base64image = c.toDataURL("image/png");
      var formData = new FormData()
      formData.append('file', dataURItoBlob( base64image ),"img")
      post.fileReq('/imageReport', formData)
    })
    post.fetchReq('/report', 
      JSON.stringify({options: this.state.optionsSelected
        .map(option =>
          Object.keys(option).filter(key => key != "profit")
            .reduce((obj, key) => 
              {
                obj[key] = option[key]; 
                return obj
              }, 
        {}))
      }), 
      (data) => {
        console.log("Report Sent")
        console.log(data)
    })
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
      render: (text, row) => 
      (row.callOutlier ? (<strong>{text}</strong>) : (<div>{text}</div>))
    },
    {
      title: 'Call IV',
      dataIndex: 'callIV',
      render : (text) => (<div>{text.toFixed(2)}</div>)
    },
    {
      title: 'Strike',
      dataIndex: 'strike'
    },
    {
      title: 'Put',
      dataIndex: 'put'
    },
    {
      title: 'Put Vol',
      dataIndex: 'putVol',
      render: (text, row) => 
      (row.putOutlier ? (<strong>{text}</strong>) : (<div>{text}</div>))
    },
    {
      title: 'Put IV',
      dataIndex: 'putIV',
      render : (text) => (<div>{text.toFixed(2)}</div>)
    },
    {
      title: '',
      dataIndex: 'putAction',
      render: (text, row) =>
      <Checkbox checked= {this.state.optionsSelected.some(option => option.key === expiry+row.strike+"P") || false} onChange = {(e) => {this.onHandleOptionLegChange(e.target.checked, false, row.strike, row.put, expiry, row.putIV);}}></Checkbox>
    },
  ]}

  saveStrategy = () => {
    if(this.state.symbol != "" && this.state.optionsSelected.length > 0){
      if(Cookies.get(this.state.symbol.toUpperCase()) != undefined){
        Cookies.set(this.state.symbol.toUpperCase(), 
          [...Cookies.get(this.state.symbol.toUpperCase()), this.state.optionsSelected]
        )
      }
      else{  
        Cookies.set(this.state.symbol.toUpperCase(), 
          [this.state.optionsSelected]
        )
      }
    } 
  }

  loadStrategy = () => {
    console.log(Cookies.get())
  }

  startTutorial = () => {
    //introJs('.intro').start();
    this.setState(() => ({ isTourOpen : true }))
  }

  closeTutorial = () => {
    this.setState(() => ({ isTourOpen : false }))
  }

  tutorialSteps = (state) => [
    //Step 1: Title
    {
      position : "right", 
			selector: '[step-name="title"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            What's up 😊? I'm Mr. Outsmart, a sentient AI that'll help guide you on your journey. 
            Follow the arrows (⬅➡) and you'll get it in no time.
            <br></br>  
            <a onClick ={() => goTo(step)}> Click me ➡ when you're ready to go. </a>
          </div>
        )
      },
      style: {
        backgroundColor: 'black',
        color : 'white',
      }
    }, 
    //Step 2: Stock Symbol
    {
      position : "right", 
			selector: '[step-name="stock-symbol-input"]',
      content: ({goTo, inDOM, step}) => {
        if(!state.exists || state.symbol != ""){
          goTo(step)
        }
        return (
          <div>
            First things first, you should type in a stock and press enter. 😎 (Try something like AAPL or MSFT)
          </div>
        )
      }
    }, 
    //Step 3: Stock Symbol Incorrect
    {
      position : "right", 
			selector: '[step-name="stock-nonexistent"]',
      content: ({goTo, inDOM, step}) =>  {
        if(inDOM){
          return (
            <div>
              Well, well, well 😒. Looks like we got a rebel here. 
              <a onClick={() => {
                this.setState(()=> ({exists:true, symbol: ""}))
                goTo(1)
              }}> Go back ⬅</a> 
              and type in a stock that actually exists and has options.
            </div>
          )
        }
        else{
          goTo(step);
        }
      },
    }, 
    //Step 4: Price
    {
      position : "right", 
			selector: '[step-name="stock-price"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Once you type in the stock, you'll see the current price right here. Pretty cool right? 
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to move on</a>
            <br></br>
            <a onClick ={() => {
              this.setState(() => ({symbol: ""}))
              goTo(1)
            }}>Click here ⬅ to input a stock</a>
          </div>
        )
      }
    },
    //Step 5: Percent Change
    {
      position : "right", 
			selector: '[step-name="stock-percent-change"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            And here is the percent change for the day. We don't have premarket moves, so only during and after market hours will you see any changes.  
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to move on</a>
            <br></br>
            <a onClick ={() => {
              this.setState(() => ({symbol: ""}))
              goTo(1)
            }}>Click here ⬅ to input a stock</a>
          </div>
        )
      },
    },
    //Step 6: Edit Leg Button
    {
      position : "right", 
			selector: '[step-name="edit-leg"]',
      content: ({goTo, inDOM, step}) => {
        if(state.addLegModalVisible){
          goTo(step)
        }
        return (
          <div>
            So here is where we get into the meat 🍖 of this thing. 
            This button will open up the options chain. 
            Note that if you -sigh- didn't type in an stock that 
            has an options chain 😓 the button will be disabled.
            However, if a stock doesn't immediately load the button, don't get scared 😯.
            It may take a while to load. So go ahead, click the button.
          <br></br>
          <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      },
    }, 
    //Step 7: Show modal with expiries
    {
      position : "right", 
			selector: '[step-name="edit-leg-modal"]',
      content: ({ goTo, inDOM, step}) => {
        if(state.activeOptionExpiry != undefined && state.activeOptionExpiry.length > 0){
          goTo(step)
        }
        if(state.addLegModalVisible){
          return (
            <div>
              Here it is 🎉.
              Each date displayed is an expiry date for the contracts available for the stock.
              So what are you waiting for? Pick an expiry.
              <br></br>
              <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
              <br></br>
              <a onClick ={() => {
                  this.closeOptionsChainModal()
                  goTo(step-2)
                }
              }>
                Click here ⬅ to go back.
              </a>
            </div>
          )
        }
        else {
          goTo(step-2)
        }
      },
    }, 
    //Step 8: Show selected expiry table
    {
      position : "right", 
			selector: '[step-name="'+(state.activeOptionExpiry || " ")+'"]',
      content: ({goTo, inDOM, step}) => {
        if(inDOM && state.addLegModalVisible && state.activeOptionExpiry != undefined && state.activeOptionExpiry != ""){
          return (
            <div>
              Yikes 😬. A lot, right?
              You'll see call options on the left, put options on the right. 
              If you found the green row, that is the at-the-money strike.
              Use the checkboxes ☑ to add a contract to your strategy. Or 3 contracts. Or 5. Up to you 🤷‍♀️.
              <br></br>
              If you don't know what these words mean 🤔, you should probably go to our help page. We explain stuff in detail there 🤓.
              <br></br>
              <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
              <br></br>
              <a onClick ={() => {
                this.closeOptionsChainModal()
                goTo(step-3)
              }}>Click here ⬅ to go back.</a>  
            </div>
          )
        }
        else{
          goTo(step-2)
        }
      }
    }, 
    //Step 9: Ok button on modal
    {
      position : "right", 
			selector: '[step-name="ok-button-modal"]',
      content: ({goTo, inDOM, step}) => {
        if(state.addLegModalVisible){
          if(state.optionsSelected.length > 0){
            return (
              <div>
                Once you select all the strategies your heart desires, click this ok button 🆗.
              </div>
            )
          }
          else{
            goTo(step-2)
          }
        }
        else {
          goTo(step)
        }
      }
    },
    //Step 10: Example option leg
    {
      position : "right", 
			selector: '[step-name="example-contract"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Contract
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(5)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    }, 
    //Step 11: Option name 
    {
      position : "right", 
			selector: '[step-name="contract-name"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Contract Name
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    }, 
    //Step 12: Option long or short
    {
      position : "right", 
			selector: '[step-name="buy-or-write"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Contract Buy or Write
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    }, 
    //Step 13: Option quantity.
    {
      position : "right", 
			selector: '[step-name="option-quantity"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Contract Quantity
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    }, 
    //Step 14: Option bought at price.
    {
      position : "right", 
			selector: '[step-name="limit-price"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Contract Price
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    },
    //Step 15: Calculate button
    {
      position : "right", 
      selector: '[step-name="calculate-button"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Calc
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    },
    //Step 16: Cost of strat card
    {
      position : "right", 
      selector: '[step-name="cost-card"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            Cost
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    },
    //Step 17: Profit graph
    {
      position : "right", 
      selector: '[step-name="profit-graph"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            graf
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    },
    //Step 18: Profit table
    {
      position : "right", 
      selector: '[step-name="profit-table"]',
      content: ({goTo, inDOM, step}) => {
        return (
          <div>
            table
            <br></br>
            <a onClick ={() => goTo(step)}>Click here ➡ to continue.</a>
            <br></br>
            <a onClick ={() => goTo(step-2)}>Click here ⬅ to go back.</a>
          </div>
        )
      }
    }
]

  render() {
    return (
    <div>
      <Tour
        steps={this.tutorialSteps(this.state)}
        showNavigation = {false}
        showNumber = {false}
        showButtons = {false}
        showCloseButton = {false}
        disableKeyboardNavigation = {true}
        maskSpace={3}
        startAt = {0}
        onAfterOpen={this.disableBody}
        onBeforeClose={this.enableBody}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTutorial}
      />
      <div style={{width:'60px', paddingBottom:'20px'}}/>
      <div style={{width:'60px', display: 'inline-block'}}/>
      <h1 key = "mainTitle" step-name="title" style={{ width:'135px', display: 'inline-block'}}>Outsmart Options</h1>
      <StockSymbol updateCallback = {this.updateSearchResults} yieldCurve = {yields} options={true} historical = {false}/>
      
      <hr id="hr" align='left'/>

      <div className="optionsList" step-name = "example-contract">{this.renderLegs()}</div>

      <div className="optionsButtons">
          <div style={{width:'60px', display: 'inline-block'}}/>
          <div id= "addLegButton" step-name = 'edit-leg'>
            <Button icon="edit" disabled = {this.state.optionsChain[0] == undefined ? true : (this.state.optionsChain[0][0] == "Empty" ? true : false)} onClick={this.openOptionsChainModal}>Edit Legs</Button>
            <div className="addLegButtonWrapper">
              <div>
                <Modal
                  title="Add Leg"
                  centered
                  width = {"50%"}
                  visible={this.state.addLegModalVisible}
                  footer = {(
                    <Button key="ok" step-name="ok-button-modal" type="primary" onClick = {this.closeOptionsChainModal}>
                      Ok
                    </Button>
                  )}
                  onCancel = {this.closeOptionsChainModal}
                >
                  <div step-name = 'edit-leg-modal'>
                    <Collapse onChange={(e) => {this.setState(() => ({activeOptionExpiry: e}))}} accordion>
                      {this.renderOptionsChain()}
                    </Collapse>
                  </div>

                </Modal>
              </div>
            </div>
          </div>
          <div style={{width:'43px', display: 'inline-block'}}/>
          <div id= "ivSkewButton" >
            <Button icon="profile" disabled = {this.state.optionsChain[0] == undefined ? true : (this.state.optionsChain[0][0] 
              == "Empty" ? true : false)} onClick={() => this.setIVSkewModalVisible(true)}>IV Skew</Button>
            <div className="addLegButtonWrapper">
              <Modal
                title="IV Skew"
                centered
                width = {"50%"}
                visible={this.state.ivSkewModalVisible}
                footer = {(
                  <Button key="ok" type="primary" onClick = {() => this.setIVSkewModalVisible(false)}>
                    Ok
                  </Button>
                )}
                onCancel = {() => this.setIVSkewModalVisible(false)}
              >
                <Collapse accordion>
                  {this.renderIVSkew()}
                </Collapse>
              </Modal>
            </div>
          </div>
          
          <div style={{width:'43px', display: 'inline-block'}}/>
          <div id= "strategyButton" ><Button icon="fund" onClick = {this.startTutorial}>Strategy</Button></div>
          <div id= "calculateButton" step-name="calculate-button"><Button onClick={this.calculateProfits} type="primary">Calculate</Button></div>
          <div id= "saveButton"><Button shape="circle" icon="save" onClick = {this.saveStrategy}/></div>
          <div id= "savedStrategyButton"><Button shape="circle" icon="download" onClick = {this.loadStrategy}/></div>
        </div>
        <br />
        <div>{
          this.state.mergedOptions != undefined ?
          (
            <div>
              <div className="costStrategy">
                <Card  title="Cost of Strategy" step-name="cost-card" style={{ width: 400 }}>
                  <p>The cost of this strategy is estimated to be ${(this.state.mergedOptions.limitPrice * 100).toFixed(2)}</p>
                  <p>*bid and ask calculations are approximations</p>
                </Card>
              </div>

              <div className="profitGraphWrapper" step-name="profit-graph">
                <ProfitGraph data={this.state.profitGraphData} legAddition ={this.legAddition} keys={Object.keys(this.state.profitGraphData[0]).filter(o => o!="x")}/>
              </div>

              <hr id="hr2"/>
              <h3 style={{marginLeft:"60px"}}>Profit Table:</h3>
              <div className="profitTableWrapper" step-name="profit-table">
                <Table dataSource={this.state.profitTableData} columns={this.state.profitColumns} pagination={false} scroll={{ x: 500 }} size="small" />
              </div>
              <Button onClick = {this.sendCalcError}>Report Calculation Error</Button>
            </div>
          ): 
          null
        }</div>
    </div>);
    
  }
}


class OptionsLeg extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFirst: props.isFirst,
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
          <div className= "buyWrite"  step-name = {this.props.isFirst ? "buy-or-write" : ""}>
            Buy or Write:&nbsp;{this.props.isFirst ?  (
            <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            ) : null}
            <div id= "buyWriteSwitch">
              <Switch checkedChildren="Buy" unCheckedChildren="Write" defaultChecked onChange={this.handleSwitchChange}/>
            </div>
          </div>
          <div className= "contract"  step-name = {this.props.isFirst ? "contract-name" : ""}>
            Contract:&nbsp;{this.props.isFirst ?  (
            <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            ) : null}
            <div id= "contractBox">
              <Input placeholder="Contract" value={this.state.date + " " + this.state.strike + " " + (this.state.isCall?"C":"P")} disabled/>
              {this.state.hide ? (<Icon className="disabledLeg"  type="close-circle" />) : null}
            </div>
          </div>
          <div id= "xHeading">x</div>
          <div className= "quantity"  step-name = {this.props.isFirst ? "option-quantity" : ""}>
            Quantity:&nbsp;{this.props.isFirst ?  (
            <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            ) : null}
            <div id= "quantityInput"><Input id="quantity" placeholder={this.state.quantity} onChange={this.handleChange}/></div>
          </div>
          <div className= "atPrice"  step-name = {this.props.isFirst ? "limit-price" : ""}>
            At Price:&nbsp;{this.props.isFirst ?  (
            <HelpTooltip hide = {false} title = {"Title"} content = {"Bruv"} />
            ) : null}
            <div id= "atPriceInput"><Input id="limitPrice" placeholder={this.state.limitPrice} onChange={this.handleChange}/></div>
          </div>
          <div className="removeDisable">
            <div id= "removeButton"><Button shape="circle" icon="delete" onClick={() => {this.props.deleteSelf(this.state.isCall, this.state.strike, this.state.date)}}/></div>
            <div id= "disableButton"><Button shape="circle" icon="stop" onClick={this.disableSelf}/></div>
          </div>
        </div>
        
      </div>
    );
  }
}

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

export default OptionsCalculator 