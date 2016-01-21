var mongoose = require('mongoose');
var CartSchema = require('./CartSchema');
var OrderModel = require('./OrderModel');

var UserSchema = mongoose.Schema({
  name: {type: String, required: true, lowercase: true},
  email: {type: String, required: true, lowercase: true},
  updatedAt: {type: Date},
  cart: [CartSchema],
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
});

UserSchema.pre('save', function(next) {
  var user = this;
  user.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('User', UserSchema);
