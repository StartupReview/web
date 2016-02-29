'use strict';

const express = require('express');

//middleware
const compression = require('compression');
const ssl = require('../middleware/ssl');
const headers = require('../middleware/headers');
const notFound = require('../middleware/notFound');
const error = require('../middleware/error');
const indexFile = require('../middleware/indexFile');
const staticFiles = require('../middleware/static');

const expressConfig = {
  configure: configure
};

function configure(appConfig) {
  let app = express();
  loadMiddleware(app, appConfig);
  return app;
}

function loadMiddleware(app, appConfig) {
  app.use(compression());
  app.use(ssl(appConfig));
  app.use(headers(appConfig));

  app.use(compression());
  app.use(ssl(appConfig));
  app.use(headers(appConfig));
  app.use(staticFiles(appConfig.BUILD_DIR));
  app.use(notFound());
  app.use(indexFile(appConfig));
  app.use(error());
}

module.exports = expressConfig;
