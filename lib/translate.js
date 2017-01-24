"use strict";

const loadJsonFile = require('./loadJsonFile');
const path = require('path');

const ficheroDatos = path.join('translate', 'literals.json');

let literals = {}

loadJsonFile(ficheroDatos, function (err, json) {
    if (err) {
        return console.log("Error al cargar el archivo de datos de prueba", err);
    }
    literals = json.literals;
});

function translate (cadena, idioma) {
    return literals[cadena][idioma];
}

module.exports = translate;