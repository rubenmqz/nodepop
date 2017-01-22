"use strict";

const mongoose = require('mongoose');

// primero creamos un esquema

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});


// y luego creo el modelo

const Usuario = mongoose.model('Usuario', usuarioSchema);

// no me hace falta exportalo porque mongoose me lo guarda internamente
//module.exports = Usuario;