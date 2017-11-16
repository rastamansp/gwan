/**
 * @file Servidor de api-rest.
 * @author @pedroalmeida
 * @since 2017-11-14
 */
'use strict';
///// instancia server
const server = require('./lib/express')(__dirname);

///// conecta ao banco de dados
require('./db/config');

///// inicializa server
server.create();

///// adiciona rota GraphQL
server.setGraphQL();

///// registra rotas
server.registerRoutes();

///// inicia servidor
server.start((port) => {

    console.log('Servidor disponivel na url: %s%s', 'http://localhost:', port);

    ///// itera rotas encontradas
    server.forEachRoute(route => {
        console.log('Rota registrada: %s [%s]', route.path, route.method);
    });
});