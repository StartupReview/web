angular.module('startupReviewApp', [
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'ngCookies',
  'ng-bs-animated-button'
]);

angular.module('startupReviewApp').run([
  '$rootScope',
  '$state',
  '$timeout',
  '$window',
  'registerService',
  function($rootScope, $state, $timeout, $window, registerService) {
    $rootScope.$state = $state;

    $timeout(function() {
      $state.go('register'); //always go to the register page for now
    });

    $(window).unload(function() {
      registerService.unRegister();
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!registerService.hasRegistered() && toState.name !== 'register') {
        event.preventDefault();

        $state.go('register');
      }
    });
  }
]);
