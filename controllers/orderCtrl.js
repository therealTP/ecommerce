var mongoose = require('mongoose');
var moment = require('moment');
var Order = require('./../models/OrderModel');
var User = require('./../models/UserModel');

module.exports = {
  create: function(req, res) {
    var userId = req.params.userId;
    User.findById(userId, function(err, result) {
      if (err) {
        res.sendStatus(500);
      }
      var userObj = result;
      var userOrder = {};
      userOrder.products = userObj.cart;
      userOrder.userId = userId;
      var newOrder = new Order(userOrder);
      newOrder.save(function(err, result) {
        if (err) {
          res.sendStatus(500);
        }
        userObj.cart = [];
        userObj.orders.push(mongoose.Types.ObjectId(result._id));
        // userObj.update({$push: {orders: mongoose.Types.ObjectId(result._id)}},
        userObj.save(function(err, result) {
          if (err) {
            res.sendStatus(500);
          }
          res.send(result);
        });
      });
    });
  },
  read: function(req, res) {
    if (req.query.orderDate) {
      var regex = new RegExp("/^" + req.query.orderDate + "/");
      Order.find({})
      .exec(function(err, result) {
        if (err) {
          res.sendStatus(500);
        }
        res.send(result);
      });
    } else {
      Order.find(req.query, function(err, result) {
        if (err) {
          res.sendStatus(500);
        }
        res.send(result);
      });
    }

  }
};
