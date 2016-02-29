'use strict';

module.exports = function() {
  return (req, res, next) => {
    if (isFile(req)) {
      res.status(404).send('Not found');
    } else {
      next();
    }
  }
};

function isFile(req) {
  let fileName = req.path.split('/').pop();
  let isFile = fileName.split('.').length > 1;
  return isFile;
}
