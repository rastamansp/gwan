/**
 * @file Consultar usuario.
 * @author @douglaspands
 * @since 2017-10-29
 */
'use strict';
/**
 * Registro da Rota
 * @return {object} Retorna o metodo e a uri da rota.
 */
module.exports.route = () => {
    return {
        method: 'post',
        uri: '/v1/usuarios/'
    }
};
/**
 * Modulo para validar os parametros de entrada.
 * @param {object} req Objeto que contem parametros de entrada da api.
 * @param {object} res Objeto com modulos de envio de dados.
 * @param {object} context Objeto de contexto para apis.
 * @return {void}
 */
module.exports.validator = (req, res, context) => {

    // Modulos
    const _ = context.require('lodash');

    const form = context.module('form');
    const message = context.message();

    // Validar parametros de entrada
    const errorList = form(req, context);
    if (!_.isEmpty(errorList)) {
        res.send(message.badRequest(errorList));
    }

    return errorList;

};
/**
 * Controller da rota.
 * @param {object} req Objeto que contem parametros de entrada da api.
 * @param {object} res Objeto com modulos de envio de dados.
 * @param {object} context Objeto de contexto para apis.
 * @return {void}
 */
module.exports.controller = (req, res, context) => {

    const message = context.message()
    const _ = context.require('lodash');
    const processor = context.processor('processor');

    ///// query para criar novo usuario
    const query = {
        body: req.body
    };

    processor(query, req, context, (erro, resultado) => {
        if (erro) {
            res.send(erro);
        } else {
            if (_.isEmpty(resultado)) {
                res.send(message.noContent());
            } else {
                res.send(message.sucess(resultado));
            }
        }
    });
};