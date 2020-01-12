import React from 'react';

import {
  Card,
  Icon,
} from 'antd';

import * as optionsMath from '../jsLib/optionsMathLibrary.js';

const warningColor = (state) => {
  if (state.risks <= 0) {
    return '#00000000';
  }
  if (state.collateral > 0) {
    return '#555555';
  }
  if (state.ivRisk.length > 0 || state.assigmentRisk.length > 0) {
    return '#ff9900';
  }
  if (state.nakedCalls.length > 0 || state.nakedPuts.length > 0) {
    return '#ff0066';
  }
};

const listRedux = (list) => {
  const arr = [];
  for (const option of list) {
    for (let i = 0; i < option.quantity; i++) {
      arr.push({
        isLong: option.isLong,
        isCall: option.isCall,
        strike: option.strike,
        date: option.date,
      });
    }
  }
  return arr;
};

export const StrategyInfo = ({ stockPrice, optionsSelected, mergedOptions }) => {
  optionsSelected = optionsSelected.filter((o) => !o.hide);
  const analyzedStrategies = optionsMath.extractStrategies(optionsSelected);
  console.log(analyzedStrategies);
  console.log(optionsMath.nakedLegsAnalysis([...optionsSelected]));
  const state = {
    strategy: optionsMath.nameStrategy(analyzedStrategies),
    risks: 0,
    ivRisk: [],
    nakedCalls: [],
    nakedPuts: [],
    assigmentRisk: optionsMath.assignmentRiskAnalysis(stockPrice, optionsSelected),
    collateral: optionsMath.collateralAnalysis(analyzedStrategies) * 100,
    cost: (mergedOptions.limitPrice * 100),
    severity: '#ff9900',
  };

  return (
    <Card step-name="cost-card" title={state.strategy} extra={(state.risks ? <Icon type="warning" style={{ fontSize: '24px' }} theme="twoTone" twoToneColor={warningColor(state)} /> : null)} style={{ width: 400 }}>
      {state.cost >= 0
        ? (
          <div>
                The cost of this strategy is $
            {state.cost.toFixed(2)}
.
          </div>
        ) : (
          <div>
                The credit you'll receive for this strategy is $
            {(-1 * state.cost).toFixed(2)}
.
          </div>
        )}
      {state.collateral <= 0
        ? null
        : (
          <div>
            {state.collateral != Infinity
              ? `Your broker will probably make you hold an extra $${state.collateral.toFixed(2)} as collateral.`
              : "Your broker probably won't let this trade even happen."}
          </div>
        )}

      <p>*Bid and asks are always varying, so take our math with a grain of salt 🧂.</p>
    </Card>
  );
};
