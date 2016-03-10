'use strict';

const request = require('request');

const appConfig = require('../appConfig');

const MAILCHIMP_BASE_URL = `${appConfig.MAILCHIMP_API_DC}.api.mailchimp.com/3.0`;
const ENDPOINTS = {
  SUBSCRIBE_TO_LIST: '/lists/:listId/members'
};

class MailChimpApi {
  subscribeToList(listId, options, next) {
    next = next || function() {};

    if (!listId) return next(new Error('MailChimpApi - subscribeToList() - listId is required'));
    if (!options) return next(new Error('MailChimpApi - subscribeToList() - options is required'));
    if (!options.email) return next(new Error('MailChimpApi - subscribeToList() - options.email is required'));

    let endpoint = ENDPOINTS.SUBSCRIBE_TO_LIST.replace(':listId', listId);

    return _post(endpoint, null, {
      email_address: options.email, //jshint ignore:line
      status: 'subscribed'
    }, (error, response, body) => {
      if (error) return next(error);
      if (response.statusCode === 400 && body.title === 'Member Exists') return next(null, response); //just eat the error if they've already subscribed
      if (response.statusCode !== 200) return next(new Error(body.title));

      return next(null, response);
    });
  }
}

function _post(endpoint, params, body, next) {
  next = next || function() {};

  if (!endpoint) return next(new Error('MailChimpApi - _post() - endpoint is required'));

  let fullUrl = _getUrl(endpoint);

  request({
    url: fullUrl,
    method: 'POST',
    qs: params,
    body: body,
    json: true
  }, next);
}

function _getUrl(endpoint) {
  if (!endpoint) throw new Error('_getUrl() - endpoint is required');

  if (endpoint.indexOf('/') === 0) endpoint = endpoint.substring(1, endpoint.length);

  let fullUrl = `https://${appConfig.MAILCHIMP_USERNAME}:${appConfig.MAILCHIMP_API_KEY}@${MAILCHIMP_BASE_URL}/${endpoint}`;

  return fullUrl;
}

module.exports = new MailChimpApi();
