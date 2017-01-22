"use strict";

const mongoose = require('mongoose');

// primero creamos un esquema
const anuncioSchema = mongoose.Schema({
    nombre: {type: String, index: true},
    venta: {type: Boolean, index: true},
    precio: {type: Number, index: true},
    foto: String,
    tags: {type: [String], index: true},
});

// y luego creo el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

Anuncio.on('index', function (err, aaa) {
   if (err) {
       return console.log("No se han podido crear los índices para el modelo 'Anuncio'", err)
   }
});

// no me hace falta exportalo porque mongoose me lo guarda internamente
//module.exports = Anuncio;