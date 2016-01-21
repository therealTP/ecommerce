var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
  name: {type: String, required: true, lowercase: true, unique: true, index: true},
  description: {type: String, lowercase: true, required: true},
  category: {
    type: String,
    enum: [
      'Computers & Accessories',
      'Groceries',
      'Audio',
      'Clothing',
      'Housekeeping',
      'Furniture',
      'Pharmacy & Personal Care',
      'Luggage',
      'Sporting Goods',
      'Other Electronics',
      'Other'
    ],
    index: true
  },
  price: {type: Number, required: true, min: 0}
});

module.exports = mongoose.model('Product', ProductSchema);
