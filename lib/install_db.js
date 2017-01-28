'use strict';

//var debug = require('debug')('nodepop:install_db');

const loadJsonFile = require('./loadJsonFile');
const path = require('path');

const async = require('async');

// Base de datos y modelos
require('./connectMongoose');
require('../models/Anuncio');
require('../models/Usuario');
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario');


const ficheroDatos = path.join('initialData', 'data.json');
loadJsonFile(ficheroDatos, function (err, json) {
    if (err) {
        return console.log('Error al cargar el archivo de datos de prueba', err);
    }

    //sólo borramos datos si se ha parseado bien el json
    //borramos en paralelo anuncios y usuarios, y hasta que no acaben ambos, no hacemos inserts
    async.parallel([
        function (cb) {
            Anuncio.remove({}, function (err) {
                if (err) {
                    return cb('Error al borrar anuncios existentes');
                }
                cb(null, 'Anuncios existentes borrados');
            });
        },
        function (cb) {
            Usuario.remove({}, function (err) {
                if (err) {
                    return cb('Error al borrar usuarios existentes');
                }
                cb(null, 'Usuarios existentes borrados');
            });
        }
    ],
    function (err, results) {
        if (err) {
            return console.log(err);
        }

        results.forEach(function(result) {
            console.log(result);
        });

        async.parallel([
            function (cb) {
                if (json.anuncios) {
                    Anuncio.insertMany(json.anuncios, function (err, docs) {
                        if (err) {
                            return cb('Error al insertar los anuncios', err);
                        }
                        cb(null, docs.length + ' anuncios insertados');
                    });
                } else {
                    console.log('No hay anuncios en el archivo json.');
                }
            },
            function (cb) {
                if (json.usuarios) {
                    Usuario.insertMany(json.usuarios, function (err, docs) {
                        if (err) {
                            return cb('Error al insertar los usuarios', err);
                        }
                        cb(null, docs.length + ' usuarios insertados');
                    });
                } else {
                    console.log('No hay usuarios en el archivo json.');
                }
            }
        ],
        function (err, results) {
            if (err) {
                return console.log(err);
            }

            results.forEach(function(result) {
                console.log(result);
            });
            process.exit();
        });

    });

});