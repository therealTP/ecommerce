// require 3rd party modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// require internal modules
var userCtrl = require('./controllers/userCtrl');
var orderCtrl = require('./controllers/orderCtrl');
var productCtrl = require('./controllers/productCtrl');

var app = express();
var port = 9000;

app.listen(port, function() {
  console.log("listening on port", port);
});

//WHY ISN'T THIS WORKING?
// app.use(function(req, res, next) {
//   var params = req.params.id;
//   console.log(params);
//   console.log(req.method, "request made with params of", params, "query of", req.query, "and body of", req.body);
//   next();
// });

var dbUri = 'mongodb://localhost:27017/ecommerce';
mongoose.connect(dbUri);
mongoose.connection.once('open', function() {
  console.log('MongoDB running.');
});

// module options
var corsOptions = {
	origin: 'http://localhost' + port
};

app.use(cors(corsOptions)); // can also be used only for specific routes, passed in before route method
app.use(express.static(__dirname + '/public')); // serves up front end files
app.use(bodyParser.json());

// users Endpoints
app.post('/users', userCtrl.create);
app.get('/users', userCtrl.read); // includes cart. query has userId

// cart Endpoints
app.post('/cart/:userId', userCtrl.addToCart); // query has userId
// app.put('/cart', userCtrl.changeQofCartItem); // query has userId, body has itemID & new Q

// order endpoints
app.post('/order/:userId', orderCtrl.create); // params has userId
app.get('/orders', orderCtrl.read);

// products endpoints
app.get('/products', productCtrl.index); // get all products, or filter by query
app.get('/products/:id', productCtrl.find); // get product by id
app.post('/products', productCtrl.create); // post new product
app.put('/products/:id', productCtrl.update); // put update to product id
app.delete('/products/:id', productCtrl.destroy); // delete product by id
