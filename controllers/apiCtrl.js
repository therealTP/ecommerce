var mongojs = require('mongojs');
var db = mongojs('ecommerce', ['products']);
var ObjectId = require('mongodb').ObjectId;

module.exports = {
  index: function(req, res, next) {
    db.products.find({}, function(err, result) {
      if (err) {
        res.sendStatus(500, "Error, or no records found.");
      }
      res.send(result);
    });
  },
  find: function(req, res, next) {
    var idToFind = ObjectId(req.params.id);
    db.products.find({"_id": idToFind}, function(err, result) {
      if (err || result.n === 0) {
        res.sendStatus(404, "record not found");
      }
      res.send(result);
    });
  },
  create: function(req, res, next) {
    db.products.insert(req.body, function(err, result){
      if (err) {
        res.sendStatus(500);
      }
      res.send(result);
    });
  },
  update: function(req, res, next) {
    var idToUpdate = ObjectId(req.params.id);
    var updateObj = {
      query: {_id: idToUpdate},
      update: {$set: req.body}, // this just updates, doesn't overwrite
      new: false
    };
    db.products.findAndModify(updateObj, function(err, result) {
      if (err) {
        res.sendStatus(500);
      } else if (result.n === 0) {
        res.sendStatus(404, "record not found");
      }
      res.send(result);
    });
  },
  destroy: function(req, res, next) {
    var idToDelete = ObjectId(req.params.id);
    db.products.remove({"_id": idToDelete}, function(err, result) {
      if (err) {
        res.sendStatus(500);
      }
      res.send(result);
    });
  }
};
