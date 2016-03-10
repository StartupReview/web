angular
  .module('startupReviewApp').service('mailchimpService', [
    '$q',
    '$http',
    function($q, $http) {

      var LIST_IDS = {
        STARTUP_REVIEW_BETA: '9f53b207f1'
      };

      function MailChimpService() {}

      MailChimpService.prototype.LIST_IDS = LIST_IDS;

      MailChimpService.prototype.subscribeToList = function subscribeToList(listId, options) {
        return _subscribeToList(listId, options);
      };

      function _subscribeToList(listId, options) {
        var promise = null;

        switch (listId) {
          case LIST_IDS.STARTUP_REVIEW_BETA:
            promise = _subscribeToStartupReviewBeta(options.email);
            break;
          default:
            promise = $q.reject(listId + ' is not a valid list id');
        }

        return promise;
      }

      function _subscribeToStartupReviewBeta(email) {
        return $q(function(resolve, reject) {
          if (!email) return reject('Email is required');

          $http.post('/mailchimp/subscribe/' + LIST_IDS.STARTUP_REVIEW_BETA, {
              email: email
            })
            .then(resolve)
            .catch(reject);
        });
      }

      return new MailChimpService();
    }
  ]);
