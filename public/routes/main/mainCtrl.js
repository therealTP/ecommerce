eComm.controller('mainCtrl', function($scope, dbSvc) {
  $scope.test = "Main CTRL connected";
  $scope.columns = [{ field: 'name' }, { field: 'category' }, { field: 'description' }, { field: 'price' }, {field: 'edit',
      cellTemplate: '<button id="editBtn" type="button" class="btn-small glyphicon glyphicon-pencil" ng-click="grid.appScope.editUser(row.entity)" ></button> '}];
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
