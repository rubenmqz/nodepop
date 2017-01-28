'use strict';

const mongoose = require('mongoose');

// primero creamos un esquema
const anuncioSchema = mongoose.Schema({
    nombre: {type: String, index: true},
    venta: {type: Boolean, index: true},
    precio: {type: Number, index: true},
    foto: String,
    tags: {type: [String], index: true}
});

// ponemos un método al schema
anuncioSchema.statics.list = function(filter, limit, skip, sort, cb) {
    const query = Anuncio.find(filter, '-_id -__v');
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.exec(cb);
};

// y luego creo el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

Anuncio.on('index', function (err) {
   if (err) {
       return console.log('No se han podido crear los índices para el modelo "Anuncio"', err);
   }
});

// no me hace falta exportalo porque mongoose me lo guarda internamente
//module.exports = Anuncio;