'use strict';

module.exports = function() {
  return (req, res, next) => {
    res.set('Vary', 'Accept-Encoding');
    return next(null);
  };
};
