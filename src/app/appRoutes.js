angular.module('startupReviewApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    if (window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    }

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/components/home/home.html',
        controller: 'homeCtrl'
      })
      .state('startup', {
        url: 'startups/:id',
        templateUrl: '/app/components/company/company.html',
        controller: 'companyCtrl'
      });
  }
]);
