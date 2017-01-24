"use strict";

const fs = require('fs');

function loadJSONFile (fichero, cb) {
    fs.readFile(fichero, 'utf8', function (err, data) {
        if (err) {
            return cb(err);
        }

        try {
            const jsonData = JSON.parse(data);
            return cb(null, jsonData);
        } catch (ex) {
            return cb(ex);
        }
    });
}

module.exports = loadJSONFile;