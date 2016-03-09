'use strict';

const fs = require('fs');
const mime = require('express').static.mime;
const _ = require('underscore');

const METHODS = ['GET', 'HEAD'];

module.exports = function(dir) {
  return (req, res, next) => {
    let path = req.path;
    let mimeType = mime.lookup(path);

    if (mimeType === 'text/html') {
      res.set('Cache-Control', 'max-age=0, no-cache');
    } else {
      res.set('Cache-Control', 'max-age=31536000'); //cache non-html files for 1 year
    }

    if (!_.contains(METHODS, req.method)) {
      return next();
    }
    return fs.createReadStream(dir + req.path)
      .on('open', () => {
        res.contentType(mime.lookup(req.path));
        res.status(200);
      })
      .on('error', err => {
        return next(err);
      })
      .pipe(res);
  };
};
