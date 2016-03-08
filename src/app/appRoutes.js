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
      .state('register', {
        url: '/register',
        templateUrl: '/app/components/register/register.html',
        controller: 'registerCtrl'
      })
      .state('startup', {
        url: '/startups/:id?section',
        templateUrl: '/app/components/company/company.html',
        controller: 'companyCtrl',
        reloadOnSearch: false
      });
  }
]);
