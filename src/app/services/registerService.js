angular
  .module('startupReviewApp').service('registerService', [
    '$q',
    'cookieService', ($q, cookieService) => {
      var COOKIE_NAME = 'registered';

      function RegisterService() {}

      RegisterService.prototype.hasRegistered = function() {
        var cookie = cookieService.get(COOKIE_NAME);

        return cookie ? true : false;
      };

      RegisterService.prototype.register = function() {
        return $q(function(resolve, reject) {
          var created = cookieService.set(COOKIE_NAME, true);

          if (created) {
            return resolve(created);
          } else {
            return reject(new Error('Error registering'));
          }
        });
      };

      RegisterService.prototype.unRegister = function() {
        cookieService.remove(COOKIE_NAME);
      };

      return new RegisterService();
    }
  ]);
