angular.module('startupReviewApp', [
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'ngCookies',
  'duScroll',
  'ng-bs-animated-button'
]);

angular.module('startupReviewApp').run([
  '$rootScope',
  '$state',
  '$timeout',
  '$window',
  'registerService',
  'appConfig',
  function($rootScope, $state, $timeout, $window, registerService, appConfig) {
    $rootScope.$state = $state;

    $timeout(function() {
      if (appConfig.ENV === 'local') return;

      $state.go('register'); //always go to the register page for now
    });

    $(window).unload(function() {
      registerService.unRegister();
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (appConfig.ENV === 'local') return;

      if (!registerService.hasRegistered() && toState.name !== 'register') {
        event.preventDefault();

        $state.go('register');
      }
    });
  }
]);
