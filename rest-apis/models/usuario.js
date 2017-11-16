/**
 * @file Model Usuario.
 * @author @douglaspands
 * @since 2017-11-01
 */
'use strict';
/**
 * @typedef Callback Callback de execução.
 * @property {object} erro JSON com o erro da execução.
 * @property {object} resultado JSON com o resultado da execução.
 */
module.exports = (context) => {
    // Modulos
    const _ = context.require('lodash');

    const message = context.message();
    const Usuario = context.domain('usuario');
    const error = context.util('error');
    const mongoose = require('mongoose');
    const model = mongoose.model('MsgUser');
    /**
     * Criar usuario.
     * @param {object} usuario
     * @param {Callback} done Callback de conclusão da execução.
     * @return {void} 
     */
    function create(usuario, done) {
        ///// seta usuario
        const user = new model(usuario);

        ////// salva novo usuario
        user.save(function(err, data) {
            ///// executa callback de cadastro
            done(err, data);
        });
    }
    /**
     * Atualizar o usuario.
     * @param {string} id Id do usuario
     * @param {Usuario} usuario Objeto do usuario.
     * @param {Callback} done Callback de conclusão da execução.
     * @return {void} 
     */
    function update(id, usuario, done) {
        // if (_.isString(id) && _.size(id) > 0 && _.isObject(usuario)) {
        //     done(null, new Usuario(id, usuario.nome, usuario.idade, usuario.sexo));
        // } else {
        //     done(message.internalError('Problema na atualização do usuario!'));
        // }
        const query = { id: id };
        const body = usuario;

        ///// executa update
        model.update(query, body, (err, data) => {
            ///// caso seja ok
            if (data.ok) {
                ///// executa callback
                done(err, body);
            } else {
                ///// executa de erro
                done(err, null);
            }
        });
    };
    /**
     * Remover usuario.
     * @param {string} id Id do usuario
     * @param {Callback} done Callback de conclusão da execução. 
     * @return {void}
     */
    function remove(id, done) {
        // if (_.isString(id) && _.size(id) > 0) {
        //     done(null, {});
        // } else {
        //     done(message.internalError('Problema na exclusão do usuario!'));
        // }
        const query = { id: id };
        ///// executa remove
        model.remove(query, (err, data) => {
            if (data.ok) {
                ///// executa callback
                done(null, { removed: true });
            } else {
                ///// executa callback
                done(null, { removed: false });
            }
        });
    }
    /**
     * Consultar usuario.
     * @param {string} id Id do usuario
     * @param {Callback} done Callback de conclusão da execução. 
     * @return {void}
     */
    function find(id, done) {
        const query = {
            id: id
        };

        ///// executa busca
        model.findOne(query, (err, data) => {
            ///// executa callback
            done(err, data);
        });
    }

    function findAll(done) {
        const query = {};

        model.find(query, (err, data) => {
            ///// executa callback
            done(null, data);
        });

        //done(null, users);
    }
    return {
        create,
        remove,
        update,
        find,
        findAll
    };

}