'use strict';

module.exports = function() {
  return (err, req, res) => {
    res.status(500).send(err);
  };
};
