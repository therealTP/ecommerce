var mongoose = require('mongoose');

module.exports = mongoose.Schema({
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  quantity: {type: Number, min: 1}
});
