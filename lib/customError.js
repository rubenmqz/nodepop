"use strict";

const chalk = require('chalk');
const translate = require('./translate');

function customError (mensaje, error) {
    console.log(chalk.bold.white.bgRed(translate("HELLO", "es")), mensaje);
    if (error) {
        console.log(chalk.red("Detalles del error:"), error);
    }
}

module.exports = customError;