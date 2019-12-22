const mongoose = require('mongoose');

const { Schema } = mongoose;

const EarningsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  company: String,
});
module.exports = mongoose.model('earnings', EarningsSchema);
