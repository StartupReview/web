'use strict';

const _ = require('underscore'); //jshint ignore:line

const defaultSettings = {
  PORT: process.env.PORT || 2020,
  BUILD_DIR: 'build',
  DOMAIN: 'reviewstartups.com'
};

const production = _.extend(_.clone(defaultSettings), {
  ENV: 'production',
  API: 'https://api.startupreview.com'
});

const development = _.extend(_.clone(defaultSettings), {
  ENV: 'development',
  API: 'https://api-dev.startupreview.com'
});

const local = _.extend(_.clone(defaultSettings), {
  ENV: 'local',
  API: 'http://localhost:3001'
});

const test = _.extend(_.clone(defaultSettings), { //jshint ignore:line
  ENV: 'test',
  API: 'http://localhost:3001'
});

module.exports = {
  production: production,
  development: development,
  local: local,
  test: test
};
