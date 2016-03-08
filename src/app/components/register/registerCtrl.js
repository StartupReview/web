angular.module('startupReviewApp').controller('registerCtrl', [
  '$scope',
  'registerService',
  function($scope, registerService) {
    $scope.register = function(form) {
      if (!form) return false;

      registerService.register();
    };
  }
]);
