angular
  .module('startupReviewApp').service('utilsService', [
    '$q',
    '$timeout',
    '$document',
    function($q, $timeout, $document) {
      function UtilsService() {}

      UtilsService.prototype.scrollTo = function(_id, _offset, _speed, _delay) {
        var id = (_id) ? _id : null;
        var offset = (_offset) ? _offset : 30;
        var delay = (_delay) ? _delay : 0;

        $timeout(function() {
          // https://github.com/durated/angular-scroll/
          try {
            $document.scrollToElement($('#' + id), offset, 500);
          } catch (err) {
            console.log('error', err);
          }
        }, delay);
      };

      return new UtilsService();
    }
  ]);
