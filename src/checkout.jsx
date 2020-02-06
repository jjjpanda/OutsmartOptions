import React from 'react';
import './css/checkout.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
          <h1 className = "text" id = "title">Checkout</h1>
          <img src="/img/stripeExample.png" alt="stripe" height="250" width="450" /> 
          
      </div>
    );
  }
}

export default Checkout;
