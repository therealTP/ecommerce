// require 3rd party modules
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var cors = require('cors');

// require internal modules
var apiCtrl = require('./controllers/apiCtrl');

var app = express();
var port = 9000;

app.listen(port, function() {
  console.log("listening on port", port);
});

// module options
var corsOptions = {
	origin: 'http://localhost' + port
};

app.use(express.static(__dirname + '/public')); // serves up front end files
app.use(cors(corsOptions)); // can also be used only for specific routes, passed in before route method
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log(req.method, "request made with params of", req.params, "and body of", req.body);
  next();
});

app.get('/products', apiCtrl.index); // get all products
app.get('/products/:id', apiCtrl.find); // get product by id
app.post('/products', apiCtrl.create); // post new product
app.put('/products/:id', apiCtrl.update); // put update to product id
app.delete('/products/:id', apiCtrl.destroy); // delete product by id
