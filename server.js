'use strict';

let appConfig = require('./config/appConfig')[process.env.NODE_ENV || 'development'];
let app = require('./config/expressConfig').configure(appConfig);

app.listen(appConfig.PORT, () => {
  console.log('Listening on port: ' + appConfig.PORT);
});

module.exports = app;
