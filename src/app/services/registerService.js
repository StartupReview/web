angular
  .module('startupReviewApp').service('registerService', [
    '$q',
    'cookieService',
    'mailchimpService',
    'appConfig',
    function($q, cookieService, mailchimpService, appConfig) {
      var COOKIE_NAME = appConfig.NAME.toLowerCase() + '-registered';

      function RegisterService() {}

      RegisterService.prototype.hasRegistered = function() {
        var cookie = cookieService.get(COOKIE_NAME);

        return cookie ? true : false;
      };

      RegisterService.prototype.register = function(email) {
        return $q(function(resolve, reject) {
          mailchimpService.subscribeToList(mailchimpService.LIST_IDS.STARTUP_REVIEW_BETA, {
              email: email
            })
            .then(function(response) {
              console.log('RESPONSE', response);

              var created = cookieService.set(COOKIE_NAME, 'registered');

              if (created) {
                return resolve(created);
              } else {
                return reject(new Error('Error registering'));
              }
            })
            .catch(reject);
        });
      };

      RegisterService.prototype.unRegister = function() {
        cookieService.remove(COOKIE_NAME);
      };

      return new RegisterService();
    }
  ]);
