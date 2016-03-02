angular.module('startupReviewApp').directive('disqus', [
  'disqusService',
  function(disqusService) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div id="disqus_thread"></div>',
      scope: {
        handle: '='
      },
      link: function(scope) {
        scope.handle = scope.handle || {};
        scope.handle.refresh = function(options) {
          console.log('refresh');
          _resetDisqus(options);
        };

        // _resetDisqus();

        function _resetDisqus(options) {
          if (!options || !options.identifier || !options.url) return;

          disqusService.reset(options);
        }
      }
    };
  }
]);
