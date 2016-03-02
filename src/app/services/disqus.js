angular.module('startupReviewApp').service('disqusService', [
  '$rootScope',
  '$window',
  function($rootScope, $window) {
    function Disqus() {}

    Disqus.prototype.reset = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.identifier) throw new Error('options.identifier is required');
      if (!options.url) throw new Error('options.url is required');

      //this is the name of our Disqus account
      options.shortname = 'reviewstartups';

      _enableDisqus(options);
    };

    $window.enableDisqus = {};

    //private helpers
    function _enableDisqus(config) {
      console.log('GET DISQUS', config);

      if ($window.enableDisqus.loaded) {
        console.log('reset', config);

        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = config.identifier;
            this.page.url = config.url;
            this.page.title = config.title;
          }
        });
      } else {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + config.shortname + '.disqus.com/embed.js'; //jshint ignore:line
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

        $window.enableDisqus.loaded = true;

        console.log('config', config);

        var interval = setInterval(function() {
          if ($window.DISQUS) {
            DISQUS.reset({
              reload: true,
              config: function() {
                this.page.identifier = config.identifier;
                this.page.url = config.url;
                this.page.title = config.title;
              }
            });

            clearInterval(interval);
          }
        }, 500);
      }
    }

    return new Disqus();
  }
]);
