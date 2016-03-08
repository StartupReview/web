angular
  .module('startupReviewApp').service('registerService', [
    'cookieService',
    (cookieService) => {
      var COOKIE_NAME = 'registered';

      function RegisterService() {}

      RegisterService.prototype.hasRegistered = function() {
        var cookie = cookieService.get(COOKIE_NAME);

        return cookie ? true : false;
      };

      RegisterService.prototype.register = function() {
        cookieService.set(COOKIE_NAME, {
          registered: true
        });
      };

      RegisterService.prototype.unRegister = function() {
        cookieService.remove(COOKIE_NAME);
      };

      return new RegisterService();
    }
  ]);
