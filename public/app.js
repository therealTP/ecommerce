var eComm = angular.module('eComm', ['ui.router', 'ui.bootstrap', 'ui.grid', 'ngAnimate']);

eComm.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'routes/main/mainTmpl.html',
    controller: 'mainCtrl'
  })
  .state('admin', {
    url: '/admin',
    templateUrl: 'routes/admin/adminTmpl.html',
    controller: 'adminCtrl'
  });

  $urlRouterProvider
  .otherwise('main');
});
