class Option {
    constructor(date, strike, price, isCall, isLong, quantity) {
      this.date = date;
      this.strike = strike;
      this.price = price;
      this.isCall = isCall;
      this.isLong = isLong;
      this.quantity = quantity;
    }
}

module.exports = Option