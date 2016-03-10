angular.module('startupReviewApp').controller('footerCtrl', [
  '$scope',
  'appConfig',
  function($scope, appConfig) {
    $scope.copyright = moment().format('YYYY') + ' Copyright';
    $scope.name = appConfig.NAME;
  }
]);
