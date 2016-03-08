'use strict';

const request = require('request');

const appConfig = require('../appConfig');

const MAILCHIMP_BASE_URL = `https://${appConfig.MAILCHIMP_API_DC}.api.mailchimp.com/3.0`;
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

    return _post(endpoint, null, options, next);
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
    body: body
  }, next);
}

function _getUrl(endpoint) {
  if (!endpoint) throw new Error('_getUrl() - endpoint is required');

  if (endpoint.indexOf('/') === 0) endpoint = endpoint.substring(1, endpoint.length);

  let fullUrl = `${MAILCHIMP_BASE_URL}/${endpoint}`;

  return fullUrl;
}

module.exports = new MailChimpApi();
