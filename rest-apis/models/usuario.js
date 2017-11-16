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
        if (_.isObject(usuario)) {
            done(null, new Usuario('', usuario.nome, usuario.idade, usuario.sexo));
        } else {
            done(message.internalError('Usuario invalido!'));
        }
    }
    /**
     * Atualizar o usuario.
     * @param {string} id Id do usuario
     * @param {Usuario} usuario Objeto do usuario.
     * @param {Callback} done Callback de conclusão da execução.
     * @return {void} 
     */
    function update(id, usuario, done) {
        if (_.isString(id) && _.size(id) > 0 && _.isObject(usuario)) {
            done(null, new Usuario(id, usuario.nome, usuario.idade, usuario.sexo));
        } else {
            done(message.internalError('Problema na atualização do usuario!'));
        }
    };
    /**
     * Remover usuario.
     * @param {string} id Id do usuario
     * @param {Callback} done Callback de conclusão da execução. 
     * @return {void}
     */
    function remove(id, done) {
        if (_.isString(id) && _.size(id) > 0) {
            done(null, {});
        } else {
            done(message.internalError('Problema na exclusão do usuario!'));
        }
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