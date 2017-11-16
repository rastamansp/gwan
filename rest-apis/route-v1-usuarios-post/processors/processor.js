/**
 * @file Controller da api de consulta usuarios.
 * @author @douglaspands
 * @since 2017-11-01
 */
'use strict';
/**
 * Processor da API.
 * @param {object} req Parametros de entrada da API.
 * @param {object} context Objeto de contexto.
 * @param {function} done Callback de finalização.
 * @return {void}
 */
function processor(query, req, context, done) {

    // Modulos
    const model = context.model('usuario')(context);

    ///// seta usuario
    const usuario = query.body;

    // Pesquisando usuario pelo id
    model.create(usuario, (erro, resultado) => {
        if (erro) {
            done(erro);
        } else {
            done(null, resultado);
        }
    });
};

module.exports = processor;