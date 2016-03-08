angular.module('startupReviewApp').controller('homeCtrl', [
  '$scope',
  'companyService',
  function($scope, companyService) {
    $scope.companies = [];

    companyService.list()
      .then(function(companies) {
        $scope.companies = companies;
      });
  }
]);
