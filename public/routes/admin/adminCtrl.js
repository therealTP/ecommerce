eComm.controller('adminCtrl', function($scope, dbSvc) {
  $scope.test = "Admin CTRL connected";
  $scope.productCategories = [
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
  ];
  $scope.addProduct = function(productObj) {
    dbSvc.addNewProduct(productObj)
    .then(
      function(response) {
        console.log(response);
      }
    );
  };
});
