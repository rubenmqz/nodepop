"use strict";

const localConfig = require('../localConfig');
const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function(err) {
  console.log('Error de conexión:', err);
  process.exit(1);
});

conn.once('open', function() {
  console.log('Connected to mongodb.');
});

mongoose.connect(localConfig.mongo.databaseUrl);
