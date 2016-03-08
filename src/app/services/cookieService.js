angular
  .module('startupReviewApp').service('cookieService', [
    'appConfig',
    (appConfig) => {
      //https://developer.mozilla.org/en-US/docs/Web/API/document.cookie

      function CookieService() {}

      CookieService.prototype.get = function(key) {
        if (!key) throw new Error('cookieService - get - key is required');

        var cookieRegex = new RegExp('(?:(?:^|.*;)\\s*' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$');

        var cookieValue = document.cookie.replace(cookieRegex, '$1');

        return cookieValue || null;
      };

      CookieService.prototype.set = function(key, value) {
        if (!key) throw new Error('cookieService - set - key is required');
        if (!value) throw new Error('cookieService - set - value is required');

        var domain = appConfig.ENABLE_COOKIE_DOMAIN || false;
        var secure = appConfig.ENABLE_SECURE_COOKIE || false;

        var expires = 'Fri, 31 Dec 9999 23:59:59 GMT';

        key = key;
        value = encodeURIComponent(value);

        var cookie = key + '=' + value + ';expires=' + expires;

        if (domain) cookie += ';domain=' + appConfig.DOMAIN;
        if (secure) cookie += ';secure';

        document.cookie = cookie;

        return true;
      };

      CookieService.prototype.remove = function(key) {
        if (!key) throw new Error('cookieService - remove - key is required');

        var domain = appConfig.ENABLE_COOKIE_DOMAIN || false;

        //update the cookie's expiration date to date in the past
        var expires = 'Thu, 01 Jan 1970 00:00:00 GMT';

        key = encodeURIComponent(key);

        var cookie = key + '=;expires=' + expires;

        if (domain) cookie += ';domain=' + appConfig.DOMAIN;

        document.cookie = cookie;

        return true;
      };

      return new CookieService();
    }
  ]);
