angular.module('startupReviewApp', [
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'ngSanitize'
]);

angular.module('startupReviewApp').run([
  '$rootScope',
  '$state',
  function($rootScope, $state) {
    $rootScope.$state = $state;
  }
]);
