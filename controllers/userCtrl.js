var mongoose = require('mongoose');
var User = require('./../models/UserModel');

module.exports = {
  create: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, result) {
      if (err) {
        res.sendStatus(500, err);
      }
      res.send(result);
    });
  },
  read: function(req, res) {
    User.findById(req.query.userId)
    .populate('cart.productId')
    .exec(function(err, result) {
      if (err) {
        res.sendStatus(500);
      }
      res.send(result);
    });
  },
  addToCart: function(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      {$push: {'cart': req.body}},
      function(err, result) {
        if(err) {
          res.sendStatus(500);
        }
        res.send(result);
      }
    );
  }
};
