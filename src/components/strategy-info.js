import React from 'react'

class StrategyInfo extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Card title="Cost of Strategy" style={{ width: 400 }}>
                <p>The cost of this strategy is estimated to be ${(this.props.mergedOptions.limitPrice * 100).toFixed(2)}</p>
                <p>*bid and ask calculations are approximations</p>
            </Card>
        )
    }
}

export {StrategyInfo}