'use strict';

let express = require('express');
let mime = express.static.mime;
let fs = require('fs');

module.exports = function(appConfig) {
  return (req, res, next) => {
    let path = appConfig.BUILD_DIR + '/index.html';

    res.set('Cache-Control', 'max-age=0, no-cache');
    res.contentType(mime.lookup(path));

    return fs.createReadStream(path)
      .on('error', next)
      .pipe(res);
  };
};
