angular.module('startupReviewApp').directive('disqus', [
  'disqusService',
  function(disqusService) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div id="disqus_thread"></div>',
      scope: {
        identifier: '=',
        url: '=',
        title: '='
      },
      link: function(scope) {
        scope.$watch('indentier', function(val) {
          if (val) _resetDisqus();
        });

        _resetDisqus();

        function _resetDisqus() {
          if (!scope.identifier || !scope.url) return;

          disqusService.reset({
            identifier: scope.identifier,
            url: scope.url,
            title: scope.title
          });
        }
      }
    };
  }
]);
