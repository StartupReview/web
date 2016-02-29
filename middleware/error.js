'use strict';

module.exports = function() {
  return (err, req, res, next) => {
    res.status(500).send(err);
  };
};
