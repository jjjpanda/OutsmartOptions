const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EarningsSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  companies: [{
    type: String
  }]
});
module.exports = mongoose.model("earnings", EarningsSchema);