const moment = require('moment')

const Option = class {
  constructor(date, strike, price, isCall, isLong, quantity, symbol) {
    this.date = date;
    this.strike = strike;
    this.price = price;
    this.isCall = isCall;
    this.isLong = isLong;
    this.quantity = quantity
    this.symbol = symbol;
  }

  static compare(a, b){
    const t = moment(a.date).diff(moment(b.date), 'hours')
    if( t > 0){
      return 1;
    }
    if(t < 0){
      return -1;
    }
    if(a.strike < b.strike){
      return 1;
    }
    if( b.strike < a.strike ){
      return -1
    }
    if( a.isCall){
      return 1
    }
    return -1
  }
}

module.exports = Option;
