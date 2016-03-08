angular
  .module('startupReviewApp').service('mailchimpService', [
    '$q',
    '$http',
    'appConfig',
    ($q, $http, appConfig) => {

      var LIST_IDS = {
        STARTUP_REVIEW_BETA: '9f53b207f1'
      };

      var ADDRESS = 'us12';

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

          var url = 'https://' + ADDRESS + '.api.mailchimp.com/3.0/lists/subscribe.json?u=' + appConfig.MAILCHIMP_API_KEY + '&id=' + LIST_IDS.STARTUP_REVIEW_BETA;

          $.ajax({
            url: url,
            data: {
              EMAIL: email //jshint ignore:line
            },
            dataType: 'jsonp',
            contentType: 'application/json; charset=utf-8',
            error: function(err) {
              console.log(err);

              return reject(new Error('Could not connect to the registration server. Please try again later.'));
            },
            success: function(data) {
              if (data.result !== 'success') {
                return reject('Error registering');
              } else {
                return resolve(data);
              }
            }
          });
        });
      }

      return new MailChimpService();
    }
  ]);
