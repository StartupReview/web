'use strict';

const express = require('express');

const appConfig = require('./appConfig');

//middleware
const compression = require('compression');
const ssl = require('../middleware/ssl');
const headers = require('../middleware/headers');
const notFound = require('../middleware/notFound');
const error = require('../middleware/error');
const indexFile = require('../middleware/indexFile');
const staticFiles = require('../middleware/static');
const router = require('./router');

const expressConfig = {
  configure: configure
};

function configure() {
  let app = express();
  loadMiddleware(app, appConfig);
  return app;
}

function loadMiddleware(app) {
  app.use(compression());
  app.use(ssl(appConfig));
  app.use(headers(appConfig));

  app.use(compression());
  app.use(ssl(appConfig));
  app.use(headers(appConfig));
  app.use(staticFiles(appConfig.BUILD_DIR));

  router.route(app);

  app.use(notFound());
  app.use(indexFile(appConfig));
  app.use(error());
}

module.exports = expressConfig;
