angular.module('startupReviewApp').controller('companyCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'companyService',
  function($scope, $state, $stateParams, companyService) {
    $scope.company = null;

    companyService.getById($stateParams.id)
      .then(function(company) {
        $scope.company = company;
      })
      .catch(function() {
        $state.go('home');
      });
  }
]);
