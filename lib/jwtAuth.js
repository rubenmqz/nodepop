'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');
const customError = require('./customError');

// Middleware de autenticación
module.exports = function() {
  return function(req, res, next) {
    const token = req.body.token || req.query.token || req.get('x-access-token');

    if (!token) {
      return next(customError('NO_TOKEN_PROVIDED', req.query.lang, 401));
    }

    jwt.verify(token, localConfig.jwt.secret, function(err, decoded) {
      if (err) {
        return next(customError('INVALID_TOKEN', req.query.lang, 401, err));
      }
      req.decoded = decoded;
      next();
    });
   };
};