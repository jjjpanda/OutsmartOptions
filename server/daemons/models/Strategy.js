const mongoose = require('mongoose');

const { Schema } = mongoose;

const StratSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  ticker: String,
  key: String,
  name: String,
  legs: [{
    date: String,
    strike: Number,
    cost: Number,
    isCall: Boolean,
    isLong: Boolean,
    quantity: Number,
    symbol: String,
  }],
}, { collection: 'strategy' });

module.exports = mongoose.model('strategy', StratSchema);
