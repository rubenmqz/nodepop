'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');
const customError = require('../../lib/customError');
const validate = require('../../lib/validate');
const sha256 = require('sha256');

const Usuario = mongoose.model('Usuario');

// crear un usuario nuevo
router.post('/', function(req, res, next) {
    if (!req.body.nombre || !req.body.email || !req.body.password) {
        return next(customError('INCOMPLETE_USER_DATA', req.query.lang, 400));
    }

    if (!validate.validateEmail(req.body.email)) {
        return next(customError('INVALID_EMAIL', req.query.lang, 400));
    }

    //TODO: comprobar que no exista el e-mail en la BD
    Usuario.find({'email': req.body.email}).exec(function(err, user) {
       if (err) {
           return next(customError('UNKNOWN_ERROR', req.query.lang, 500, err));
       }
       if (user.length>0) {
           return next(customError('EMAIL_EXISTS', req.query.lang, 400));
       }

        const usuario = new Usuario({
            'nombre': req.body.nombre,
            'email': req.body.email,
            'clave': sha256.x2(req.body.password)
        });

        usuario.save(function(err, usuarioCreado) {
            if (err) {
                return next(customError('UNKNOWN_ERROR', req.query.lang, 500, err));
            }
            res.json({success: true, data: {
                'nombre': usuarioCreado.nombre,
                'email': usuarioCreado.email,
                'clave': usuarioCreado.clave
            }});
        });
    });
});

//autenticar a un usuario (devuelve un token)
router.post('/authenticate', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return next(customError('INCOMPLETE_LOGIN_DATA', req.query.lang, 400));
  }

  const email = req.body.email;
  const password = sha256.x2(req.body.password);

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