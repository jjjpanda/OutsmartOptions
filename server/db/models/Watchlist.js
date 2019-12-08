const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  stocks : [{
    type: String
  }]
});

module.exports = mongoose.model("watchlist", WatchlistSchema);