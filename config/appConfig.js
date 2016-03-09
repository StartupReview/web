'use strict';

const _ = require('underscore'); //jshint ignore:line

const NODE_ENV = process.env.WERCKER_GIT_BRANCH || process.env.NODE_ENV || process.argv[3];
const ENV = _setupEnv(NODE_ENV);
const PORT = process.env.PORT || 2020;

const defaultSettings = {
  PORT: PORT,
  BUILD_DIR: 'build',
  ENABLE_COOKIE_DOMAIN: false,
  ENABLE_SECURE_COOKIE: false,
  MAILCHIMP_USERNAME: 'thestartupreview',
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_API_DC: 'us12',
  GOOGLE_ANALYTICS: 'xxxxxxxxxx'
};

const production = _.extend(_.clone(defaultSettings), {
  ENV: 'production',
  API: 'https://api.startupreview.com',
  ENABLE_COOKIE_DOMAIN: true,
  ENABLE_SECURE_COOKIE: true,
  GOOGLE_ANALYTICS: 'UA-74655471-1',
  DOMAIN: 'www.reviewstartups.com'
});

const development = _.extend(_.clone(defaultSettings), {
  ENV: 'development',
  API: 'https://api-dev.startupreview.com',
  ENABLE_COOKIE_DOMAIN: true,
  ENABLE_SECURE_COOKIE: true,
  DOMAIN: 'www-dev.reviewstartups.com'
});

const local = _.extend(_.clone(defaultSettings), {
  ENV: 'local',
  API: 'http://localhost:3001',
  DOMAIN: `localhost:${PORT}`
});

const test = _.extend(_.clone(defaultSettings), { //jshint ignore:line
  ENV: 'test',
  API: 'http://localhost:3001',
  DOMAIN: `localhost:${PORT}`
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

module.exports = appConfig;
