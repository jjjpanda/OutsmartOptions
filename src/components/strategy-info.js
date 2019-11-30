import React from 'react'

import {
    Card,
    Icon
  } from 'antd';

  import * as optionsMath from '../jsLib/optionsMathLibrary.js'

const warningColor = (state) => {
    if(state.risks <= 0){
        return "#00000000"
    }
    else if(state.collateral > 0){
        return "#555555"
    }
    else if(state.ivRisk.length > 0 || state.assigmentRisk.length > 0){
        return "#ff9900"
    }
    else if(state.nakedCalls.length > 0 || state.nakedPuts.length > 0){
        return "#ff0066"
    }
}

const listRedux = (list) => {
    var arr = []
    for(var option of list){
        for(var i = 0; i < option.quantity; i++){
            arr.push({
                isLong: option.isLong,
                isCall: option.isCall,
                strike: option.strike,
                date: option.date
            })
        }
    }
    return arr
}

const StrategyInfo = ({optionsSelected, mergedOptions}) => {
    optionsSelected = optionsSelected.filter(o => !o.hide)

    console.log(listRedux(optionsSelected))
    console.log(optionsMath.extractStrategies(listRedux(optionsSelected)))
    
    optionsMath.collateralAnalysis(optionsSelected, mergedOptions)
    var state = {
        strategy: optionsMath.idStrat(optionsSelected),
        risks: 0,
        ivRisk: [],
        nakedCalls: [],
        nakedPuts: [],
        assigmentRisk: [],
        collateral: 0,
        cost: (mergedOptions.limitPrice * 100),
        severity: '#ff9900'
    }

    return (
        <Card step-name="cost-card" title={state.strategy} extra={(state.risks ? <Icon type="warning" style={{fontSize: '24px'}} theme="twoTone" twoToneColor={warningColor(state)} /> : null)} style={{ width: 400 }}>
            {state.cost >= 0 ? 
            <div>
                The cost of this strategy is ${state.cost.toFixed(2)}.
            </div>:
            <div>
                The credit you'll receive for this strategy is ${(-1*state.cost).toFixed(2)}.
            </div>
            }
            {state.collateral <= 0 ?
            null:
            <div>
                Your broker will probably make you hold an extra ${(state.collateral.toFixed(2))} as collateral.
            </div>
            }
            
            <p>*Bid and asks are always varying, so take our math with a grain of salt 🧂.</p>
        </Card>
    )
}

export {StrategyInfo}