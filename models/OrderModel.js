var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  products: [
    {
      productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      quantity: {type: Number, min: 1}
    }
  ],
  orderDate: {type: Date}
});

OrderSchema.pre('save', function(next) {
  var order = this;
  order.orderDate = Date.now();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
