'use strict';

const chalk = require('chalk');
const translate = require('./translate');

function customError (mensaje, idioma, status, error) {
    //Mostramos el error por consola, en español
    console.log(chalk.bold.white.bgRed(translate('ERROR', 'es')), translate(mensaje, 'es'));
    if (error) {
        console.log(chalk.red(translate('ERROR_DETAILS', 'es') + ':', error));
    }

    //devolvemos un objeto
    return {'status': status, 'message': translate(mensaje, idioma), 'detail': error };
}

module.exports = customError;