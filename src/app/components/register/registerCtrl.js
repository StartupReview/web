angular.module('startupReviewApp').controller('registerCtrl', [
  '$scope',
  '$state',
  'registerService',
  function($scope, $state, registerService) {

    $scope.form = {};

    $scope.register = function(form) {
      if (!form) return false;

      $scope.submitted = true;

      if (!form.$valid) return;

      registerService.register()
        .then(function() {
          $state.go('home');
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }
]);
