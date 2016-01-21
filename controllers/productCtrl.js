var Product = require('./../models/ProductModel');

module.exports = {
  index: function(req, res) {
    Product.find(req.query, function(err, result) {
      if (err) {
        res.sendStatus(500, err);
      }
      res.send(result);
    });
  },
  find: function(req, res) {
    console.log(req.params.id);
    Product.findById(req.params.id, function(err, result) {
      if (err) {
        res.sendStatus(404, err);
      }
      res.send(result);
    });
  },
  create: function(req, res) {
    var product = new Product(req.body);
    product.save(function(err, result){
      if (err) {
        res.sendStatus(500, err);
      }
      res.send(result);
    });
  },
  update: function(req, res) {
    // var options = {new: false}; // this is default, no need to specify
    // also default of $set when passing body
    Product.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) {
        res.sendStatus(500, err);
      }
      res.send(result);
    });
  },
  destroy: function(req, res) {
    console.log(req.params.id);
    Product.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(result);
    });
  }
};
