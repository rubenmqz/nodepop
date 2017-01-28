'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Anuncio = mongoose.model('Anuncio');

/* GET Anuncios */
router.get('/', function(req, res, next) {

    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const tag = req.query.tag;
    const limit = parseInt(req.query.limit) || 0;
    const skip = parseInt(req.query.skip) || 0;
    const sort = req.query.sort;
    const includeTotal = req.query.includeTotal;

    // creo un filtro vacio
    const filter = {};

    if (nombre) {
        filter.nombre = new RegExp('^' + nombre, 'i');
    }

    if (precio) {
        const valores = precio.split('-');
        if (valores.length === 1 && !isNaN(valores[0])) {
            filter.precio = Number(precio);
        } else if (valores.length === 2) {
            if (!isNaN(valores[0]) && !isNaN(valores[1]) && valores[0]!=='' && valores[1]!=='') {
                filter.precio = { '$gte': valores[0], '$lte': valores[1] };
            } else if (!isNaN(valores[0]) && valores[0]!=='') {
                filter.precio = { '$gte': valores[0] };
            } else if (!isNaN(valores[1]) && valores[1]!=='') {
                filter.precio = { '$lte': valores[1] };
            }
        }
    }

    if (venta === 'true' || venta === 'false') {
        filter.venta = venta;
    }

    if (tag) {
        filter.tags = tag;
    }

    Anuncio.list(filter, limit, skip, sort, function(err, data) {
        if (err) {
            console.log('Pasa por aquí');
            return next(err);
        }

        var imagesUrl = req.protocol + '://' + req.get('host') + '/images/anuncios/';
        for (var i = 0; i< data.length; i++) {
            data[i].foto = imagesUrl + data[i].foto;
        }

        const resJson = {success: true};
        if (includeTotal === 'true') {
            resJson.numItems = data.length;
        }
        resJson.data = data;
        res.json(resJson);
    });
});

module.exports = router;