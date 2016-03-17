angular.module('startupReviewApp').controller('homeCtrl', [
  '$scope',
  'companyService',
  'utilsService',
  function($scope, companyService, utilsService) {
    $scope.companies = [];

    companyService.list()
      .then(function(companies) {
        $scope.companies = companies;
      });

    $scope.scrollDown = function($event) {
      if ($event) $event.preventDefault();

      utilsService.scrollTo('home-companies', -50);
    };
  }
]);
