eComm.controller('mainCtrl', function($scope, dbSvc) {
  $scope.test = "Main CTRL connected";
  $scope.columns = [{ field: 'name' }, { field: 'category' }, { field: 'description' }, { field: 'price' }];
  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: $scope.columns
  };

  dbSvc.getAllProducts()
  .then(
    function(response) {
      $scope.gridOptions.data = response;
    }
  );
});
