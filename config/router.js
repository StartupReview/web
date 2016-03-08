'use strict';

const mailchimpRouter = require('./routes/mailchimp');

class Router {
  route(app) {
    if (!app) throw new Error('Router - route() - app is required');

    app.use('/mailchimp', mailchimpRouter);
  }
}

module.exports = new Router();
