'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');
const customError = require('../../lib/customError');

const Usuario = mongoose.model('Usuario');


router.post('/authenticate', function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  // Buscamos en la base de datos un usuario con userName
  Usuario.find({'email': email, 'clave': password}).exec(function(err, data) {
      if (err) {
          return  next(customError('UNKNOWN_ERROR', req.query.lang, 500, err));
      }
      if (data.length>0) {
          // creamos el token
          const token = jwt.sign({_id: data._id}, localConfig.jwt.secret, {
              expiresIn: localConfig.jwt.expiresIn
          });

          res.json({success: true, token: token});
      } else {
        return next(customError('EMAIL_OR_PASS_NOT_CORRECT', req.query.lang, 404));
      }
  });
});

module.exports = router;