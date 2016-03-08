angular.module('startupReviewApp').constant('appConfig', {
  VERSION: '@@VERSION',
  ENV: '@@ENV',
  DOMAIN: '@@DOMAIN',
  API_URL: '@@API',
  ENABLE_COOKIE_DOMAIN: '@@ENABLE_COOKIE_DOMAIN' === 'true' ? true : false,
  ENABLE_SECURE_COOKIE: '@@ENABLE_SECURE_COOKIE' === 'true' ? true : false,
  MAILCHIMP_API_KEY: '@@MAILCHIMP_API_KEY'
});
