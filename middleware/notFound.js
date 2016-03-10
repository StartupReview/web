'use strict';

module.exports = function() {
  return (req, res, next) => {
    if (isFile(req)) {
      res.status(404).send('Not found');
    } else {
      next();
    }
  };
};

function isFile(req) {
  let fileName = req.path.split('/').pop();
  return fileName.split('.').length > 1;
}
