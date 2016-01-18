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
});
