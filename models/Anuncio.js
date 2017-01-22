"use strict";

const mongoose = require('mongoose');

// primero creamos un esquema

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


// y luego creo el modelo

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// no me hace falta exportalo porque mongoose me lo guarda internamente
//module.exports = Anuncio;