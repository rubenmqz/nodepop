'use strict';

const express = require('express');
const router = express.Router();

/* GET Anuncios */
router.get('/', function(req, res) {

    res.json([ 'lifestyle', 'mobile', 'motor', 'work']);

});

module.exports = router;