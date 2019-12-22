const mongoose = require('mongoose');

const { Schema } = mongoose;

const StratSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  stock: String,
  legs: [{
    date: Date,
    strike: Number,
    price: Number,
    isCall: Boolean,
    isLong: Boolean,
    quantity: Number,
  }],
});

module.exports = mongoose.model('strategy', StratSchema);
