const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Anuncio = mongoose.model('Anuncio');

/* GET Anuncios */
router.get('/', function(req, res, next) {
    Anuncio.list(function(err, data) {
        if (err) {
            return next(err);
        }

        var imagesUrl = req.protocol + '://' + req.get('host') + '/images/anuncios/';
        for (var i = 0; i< data.length; i++) {
            data[i].foto = imagesUrl + data[i].foto;
        }

        res.json({success: true, data: data});
    })
});

module.exports = router;