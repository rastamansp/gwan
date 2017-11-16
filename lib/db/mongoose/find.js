/**
 * @file Obtendo o modulo de servidor.
 * @since 2017-11-16
 * @author @pedroalmeida.
 */
'use strict';

function find(model, query, options, callback) {
    ///// executa find
    model.find(query, (err, data) => {
        callback(err, data);
    });
}

module.exports = find;