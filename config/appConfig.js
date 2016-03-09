'use strict';

const _ = require('underscore'); //jshint ignore:line

const NODE_ENV = process.env.WERCKER_GIT_BRANCH || process.env.NODE_ENV || process.argv[3];
const ENV = _setupEnv(NODE_ENV);

const defaultSettings = {
  PORT: process.env.PORT || 2020,
  BUILD_DIR: 'build',
  DOMAIN: 'reviewstartups.com',
  ENABLE_COOKIE_DOMAIN: false,
  ENABLE_SECURE_COOKIE: false,
  MAILCHIMP_USERNAME: 'thestartupreview',
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_API_DC: 'us12'
};

const production = _.extend(_.clone(defaultSettings), {
  ENV: 'production',
  API: 'https://api.startupreview.com',
  ENABLE_COOKIE_DOMAIN: true,
  ENABLE_SECURE_COOKIE: true
});

const development = _.extend(_.clone(defaultSettings), {
  ENV: 'development',
  API: 'https://api-dev.startupreview.com',
  ENABLE_COOKIE_DOMAIN: true,
  ENABLE_SECURE_COOKIE: true
});

const local = _.extend(_.clone(defaultSettings), {
  ENV: 'local',
  API: 'http://localhost:3001'
});

const test = _.extend(_.clone(defaultSettings), { //jshint ignore:line
  ENV: 'test',
  API: 'http://localhost:3001'
});

const ENVS = {
  production: production,
  development: development,
  local: local,
  test: test
};

function _setupEnv(env) {
  // allow passing name as an argument
  if (env && env.indexOf('-') === 0) env = env.substring(1);

  // production
  if (env === 'master' || env === 'prod' || env === 'production') return 'production';
  // development
  else if (env === 'dev' || env === 'development') return 'development';
  // local
  else if (env === 'local') return 'local';
  // default
  else return 'development';
}

const appConfig = ENVS[ENV];

console.log('APP CONFIG');
console.log(appConfig);

module.exports = appConfig;
