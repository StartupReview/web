angular.module('startupReviewApp').constant('appConfig', {
  NAME: '@@NAME',
  VERSION: '@@VERSION',
  ENV: '@@ENV',
  API_URL: '@@API',
  COOKIE_DOMAIN: '@@COOKIE_DOMAIN',
  ENABLE_COOKIE_DOMAIN: '@@ENABLE_COOKIE_DOMAIN' === 'true' ? true : false,
  ENABLE_SECURE_COOKIE: '@@ENABLE_SECURE_COOKIE' === 'true' ? true : false
});
