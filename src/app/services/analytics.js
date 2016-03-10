angular.module('startupReviewApp').factory('analytics', [
  '$window',
  '$rootScope',
  '$location',
  function($window, $rootScope, $location) {
    'use strict';

    if (!$window.ga) throw new Error('Google Analytics not loaded!');

    function trackPageView(path) {
      console.log('track page view : path=' + path);
      $window.ga('send', 'pageview', path);
    }

    function trackEvent(eventCategory, eventAction, eventLabel) {
      console.log('track event : category=' + eventCategory + ' : action=' + eventAction + ' : label=' + eventLabel);
      $window.ga('send', 'event', eventCategory, eventAction, eventLabel);
    }

    // subscribe to events
    $rootScope.$on('$stateChangeSuccess', function() {
      trackPageView($location.path());
    });

    return {
      trackPageView: trackPageView,
      trackEvent: trackEvent
    };
  }
]).run(['analytics', function() {

}]);

// angular.module('startupReviewApp').directive('analyticsOn', [
//   'analytics',
//   function(analytics) {
//     'use strict';
//
//     return {
//       restrict: 'A',
//       link: function($scope, $element, $attrs) {
//         var eventAction = $attrs.analyticsOn;
//         var eventCategory = $attrs.analyticsCategory;
//         var eventLabel = $attrs.analyticsLabel;
//
//         angular.element($element[0]).bind(eventAction, function() {
//           analytics.trackEvent(eventCategory, eventAction, eventLabel);
//         });
//       }
//     };
//   }
// ]);
