'use strict';

module.exports = function(appConfig) {
  return (req, res, next) => {
    res.set('Vary', 'Accept-Encoding');
    return next(null);
  };
};
