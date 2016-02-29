'use strict';

module.exports = function(appConfig) {
  return (req, res, next) => {
    if (appConfig.SSL) {
      let protocol = req.get('x-forwarded-proto') || req.protocol;
      if (protocol != 'https') {
        res.redirect(301, 'https://' + req.get('host') + req.url);
      } else {
        res.header('Strict-Transport-Security', 'max-age=31536000');
        return next(null);
      }
    } else {
      return next(null);
    }
  };
};
