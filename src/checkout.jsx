import React from 'react';
import {CardElement} from 'react-stripe-elements';
import { render } from 'enzyme';
import './css/checkout.css';

class checkout extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <body>
                <h1 style="color:blue;">checkout</h1>
            </body>
        )
    }
}