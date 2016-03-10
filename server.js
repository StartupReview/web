'use strict';

const appConfig = require('./config/appConfig');
const app = require('./config/expressConfig').configure();

if (appConfig.ENV === 'production') {
  console.log('NEWRELIC ENABLED');
  require('newrelic');
}

app.listen(appConfig.PORT, () => {
  console.log('Listening on port: ' + appConfig.PORT);
});

module.exports = app;
