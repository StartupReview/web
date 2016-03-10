angular
  .module('startupReviewApp').service('registerService', [
    '$q',
    '$cookies',
    'mailchimpService',
    'appConfig',
    function($q, $cookies, mailchimpService, appConfig) {
      var COOKIE_NAME = '_' + appConfig.NAME.toLowerCase() + 'Registered';

      function RegisterService() {}

      RegisterService.prototype.hasRegistered = function() {
        var cookie = $cookies.get(COOKIE_NAME);

        return cookie ? true : false;
      };

      RegisterService.prototype.register = function(email) {
        return $q(function(resolve, reject) {
          mailchimpService.subscribeToList(mailchimpService.LIST_IDS.STARTUP_REVIEW_BETA, {
              email: email
            })
            .then(function(response) {
              console.log('RESPONSE', response);

              var created = $cookies.put(COOKIE_NAME, 1, {
                expires: 'Fri, 31 Dec 9999 23:59:59 GMT'
              });

              return resolve(created);
            })
            .catch(reject);
        });
      };

      RegisterService.prototype.unRegister = function() {
        $cookies.remove(COOKIE_NAME);
      };

      return new RegisterService();
    }
  ]);
