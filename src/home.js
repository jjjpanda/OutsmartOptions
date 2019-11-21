import React from 'react';
import {StockSymbol} from './calc.js'

class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            price: 0,
            priceChange: 0,
            exists: true
        }
    }

    render(){
        return (
        <div style={{paddingLeft:'60px', paddingTop:'20px'}}>
            <h1 key = "mainTitle" >Outsmart Options</h1>

            <StockSymbol onSearch={this.onSearch} price={this.state.price} priceChange={this.state.priceChange} exists={this.state.exists}/>
      
            <br />
            <div> 
                What up Youtube. 
                <br />
                You're probably here for the calculator, 
                <br />
                so just click the calculator button at the side.
                <br />
            </div>
        </div>
    )}
}

export {HomePage}