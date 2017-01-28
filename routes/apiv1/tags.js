'use strict';

const express = require('express');
const router = express.Router();

const jwtAuth = require('../../lib/jwtAuth');

router.use(jwtAuth());

/* GET Anuncios */
router.get('/', function(req, res) {

    res.json([ 'lifestyle', 'mobile', 'motor', 'work']);

});

module.exports = router;