/**
 * @file Utilitarios para o framework express.js.
 * @author @douglaspands
 * @since 2017-10-29
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const Log = require('./log');
const Context = require('./context');
const Request = require('./request');
const Response = require('./response');
const utils = require('./utils');
const config = require('../config/server');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');


/**
 * @param {string} dir diretorio do servidor.
 * @return {utilsExpress} Retorna funções.
 */
module.exports = (dir) => {

    let server;
    let diretorioServidor = dir;

    /**
     * Criar o servidor.
     * @return {object} Objeto do express().
     */
    function create() {
        server = express();
        server.use(express.static(path.join(__dirname, '..', 'public')));
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());
        return server;
    }
    /**
     * Executa iteração para cada rota.
     * @param {function} callback Funcao que sera executada a cada rota encontrada.
     * @return {array} Lista de rotas registradas.
     */
    function forEachRoute(callback) {
        return (server._router.stack || []).reduce((routes, o) => {
            if (o.route && o.route.path) {
                let route = {
                    path: o.route.path,
                    method: Object.keys(o.route.methods)[0]
                };
                if (typeof callback === 'function') callback(route);
                routes.push(route);
            }
            return routes;
        }, []);
    }
    /**
     * Procura arquivo index.js no segundo nivel de diretorios.
     * @return {void}
     */
    function registerRoutes() {

        const listaRotas = utils.scanRoutes(path.join(diretorioServidor, config.PASTA_APIS));

        _.forEach(listaRotas, (rota) => {

            const api = require(rota);
            let method, uri;

            if (_.get(api, 'route', null) && (_.isPlainObject(api.route) || _.isFunction(api.route))) {

                if (_.isFunction(api.route)) {
                    method = (_.get(api.route(), 'method', '')).toLowerCase();
                    uri = (_.get(api.route(), 'uri', '') ? api.route().uri : _.get(api.route(), 'route', '')).toLowerCase();
                } else {
                    method = (_.get(api.route, 'method', '')).toLowerCase();
                    uri = (_.get(api.route, 'uri', '') ? api.route.uri : _.get(api.route, 'route', '')).toLowerCase();
                }

                try {
                    server[method](uri, (req, res) => {

                        const log = new Log();
                        const context = new Context(rota, log);

                        req.routeDirectory = rota;
                        const request = new Request(req, log);

                        const response = new Response(res, log);
                        const message = context.message();

                        const listaFuncoes = _.without(Object.keys(api), 'route');

                        if (_.size(listaFuncoes) < 1) {
                            response.send(message.notImplemented('Favor contatar o administrador do sistema!'));
                        } else {
                            _.forEach(listaFuncoes, (fn) => {
                                if (response.verifySendExecute()) {
                                    return false;
                                } else {
                                    try {
                                        api[fn](request, response, context);
                                    } catch (error) {
                                        response.send(message.internalError('Favor contatar o administrador do sistema!'));
                                        log.pushError(error);
                                    }
                                }
                            });
                        }
                        // Registra log no servidor dedicado.
                        log.sendLog();
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });

        /**
         * Tratamento de statusCode 404
         */
        server.use((req, res, next) => {
            const log = new Log();
            const context = new Context(__dirname, log);
            const response = new Response(res, log);
            const message = context.message();
            response.send(message.notFound(`Route not found: ${req.url} [${req.method}]`));
            // Registra log no servidor dedicado.
            log.sendLog();
        });

    }

    function setGraphQL() {
        server.use('/graphql', expressGraphQL({
            schema: schema,
            graphiql: true
        }));
    }
    /**
     * Iniciando o servidor.
     * @param {number} port Numero da porta de conexão.
     * @param {function} callback Função que será executada apos iniciar o servidor.
     * @return {object} Retorno resultado do inicio do servidor. 
     */
    function start(callback) {
        const porta = process.env.PORT || config.PORTA || 3000;
        return server.listen(porta, (callback) ? callback(porta) : null);
    }
    /**
     * Objeto de retorno.
     */
    return {
        start,
        create,
        forEachRoute,
        registerRoutes,
        setGraphQL
    };
};