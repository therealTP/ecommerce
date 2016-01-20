// require 3rd party modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// require internal modules
var apiCtrl = require('./controllers/apiCtrl');

var app = express();
var port = 9000;

app.listen(port, function() {
  console.log("listening on port", port);
});

/*
WHY ISN'T THIS WORKING?
app.use(function(req, res, next) {
  console.log(req.method, "request made with params of", req.params.id, "query of", req.query, "and body of", req.body);
  next();
});
*/

var dbUri = 'mongodb://localhost:27017/ecommerce';
mongoose.connect(dbUri);
mongoose.connection.once('open', function() {
  console.log('MongoDB running.');
});

// module options
var corsOptions = {
	origin: 'http://localhost' + port
};

app.use(express.static(__dirname + '/public')); // serves up front end files
app.use(cors(corsOptions)); // can also be used only for specific routes, passed in before route method
app.use(bodyParser.json());

app.get('/products', apiCtrl.index); // get all products, or filter by query
app.get('/products/:id', apiCtrl.find); // get product by id
app.post('/products', apiCtrl.create); // post new product
app.put('/products/:id', apiCtrl.update); // put update to product id
app.delete('/products/:id', apiCtrl.destroy); // delete product by id
