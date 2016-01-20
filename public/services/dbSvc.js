eComm.service('dbSvc', function($http) {
  this.getAllProducts = function() {
    return $http({
      method: 'GET',
      url: '/products'
    })
    .then(
      function(response) {
        return response.data;
      }
    );
  };

  this.addNewProduct = function(product) {
    return $http({
      method: 'POST',
      url: '/products',
      data: product
    })
    .then(
      function(response) {
        return response.data;
      }
    );
  };
});
