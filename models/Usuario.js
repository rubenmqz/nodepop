'use strict';

const mongoose = require('mongoose');

// primero creamos un esquema

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {type: String, index: true},
    clave: String
});

usuarioSchema.index({ email: 1, clave: 1}); //para acelerar autenticación


// y luego creo el modelo

const Usuario = mongoose.model('Usuario', usuarioSchema);

Usuario.on('index', function (err) {
    if (err) {
        return console.log('No se han podido crear los índices para el modelo "Usuario"', err);
    }
});

// no me hace falta exportalo porque mongoose me lo guarda internamente
//module.exports = Usuario;