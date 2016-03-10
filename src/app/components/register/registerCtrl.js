angular.module('startupReviewApp').controller('registerCtrl', [
  '$scope',
  '$state',
  'registerService',
  function($scope, $state, registerService) {

    $scope.form = {};

    // register button
    $scope.registerSubmitting = null;
    $scope.registerResult = null;
    $scope.registerBtnOptions = {
      buttonDefaultIcon: 'fa fa-arrow-right',
      buttonDefaultClass: 'btn btn-secondary',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessClass: 'btn-success',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorClass: 'btn-danger'
    };

    $scope.register = function(form) {
      if (!form) return false;

      $scope.submitted = true;

      if (!form.$valid) return;

      $scope.registerSubmitting = true;

      registerService.register($scope.form.email)
        .then(function() {
          $state.go('home');

          $scope.registerResult = 'success';
        })
        .catch(function(error) {
          console.log(error);

          $scope.registerResult = 'error';
        })
        .finally(function() {
          $scope.registerSubmitting = false;
        });
    };
  }
]);
