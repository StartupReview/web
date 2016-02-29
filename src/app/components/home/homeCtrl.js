angular.module('startupReviewApp').controller('homeCtrl', [
  '$scope',
  function($scope) {
    $scope.companies = [{
      name: 'AdHawk',
      description: 'Simplify your digital advertising.'
    }];
  }
]);
