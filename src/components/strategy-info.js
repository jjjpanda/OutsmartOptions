import React from 'react'

import {
    Card,
    Icon
  } from 'antd';

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

const collateralAnalysis = (list, merged) => {
    if(merged.limitPrice >= 0){
        return 0;
    }
    else{

    }
    console.log(list)
    console.log(merged)
}

const identifyStrategy = (list) => {
    if(new Set(list.map(e => (e.isLong?"L":"S")+(e.isCall?"C":"P"))).size == 1){
        if(list[0].isCall){
            if(list[0].isLong) return list.length > 1 ? "Long Calls" :"Long Call"
            else return list.length > 1 ? "Call Sells" : "Call Sell"
        }
        else{
            if(list[0].isLong) return list.length > 1 ? "Long Puts" : "Long Put"
            else return list.length > 1 ? "Put Sells" : "Put Sell"
        }
    }
    else if(list.length == 2){
        if( new Set(list.map(e => e.date)).size == 1 ){
            //Spread
            if(list[0].isCall === list[1].isCall){
                if(list[0].isLong && list[0].isCall){
                    //Larger Call Strike is Long
                    return "Call Credit Spread"
                }
                else if(!list[0].isLong && !list[0].isCall){
                    //Larger Put Strike is short
                    return "Put Credit Spread"
                }
                else if(list[0].isLong && !list[0].isCall){
                    //Larger Put Strike is Long
                    return "Put Debit Spread"
                }
                if(!list[0].isLong && list[0].isCall){
                    //Larger Call Strike is Short
                    return "Call Debit Spread"
                }
            }
            else{
                //Straddle or Strangle
                if(list[0].isLong === list[1].isLong){
                    if(list[0]){
                        if(list[0].strike == list[1].strike) return "Long Straddle"
                        else return "Long Strangle"
                    } 
                    else{
                        if(list[0].strike == list[1].strike) return "Short Straddle"
                        else return "Short Strangle"
                    }
                }
            }    
        }
        else{

        }
    }
}

const StrategyInfo = ({optionsSelected, mergedOptions}) => {
    optionsSelected = optionsSelected.filter(o => !o.hide)
    collateralAnalysis(optionsSelected, mergedOptions)
    var state = {
        strategy: identifyStrategy(optionsSelected),
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
        <Card title={state.strategy} extra={(state.risks ? <Icon type="warning" style={{fontSize: '24px'}} theme="twoTone" twoToneColor={warningColor(state)} /> : null)} style={{ width: 400 }}>
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