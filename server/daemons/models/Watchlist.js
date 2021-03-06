const mongoose = require('mongoose');

const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  stocks: [String],
}, { collection: 'watchlist' });

module.exports = mongoose.model('watchlist', WatchlistSchema);
