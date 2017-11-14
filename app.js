/**
 * @file Servidor de api-rest.
 * @author @pedroalmeida
 * @since 2017-11-14
 */
'use strict';
const server = require('./lib/express')(__dirname);

server.create();
///// adiciona rota GraphQL
server.setGraphQL();
///// adiciona rotas
server.registerRoutes();
server.start((port) => {
    console.log('Servidor disponivel na url: %s%s', 'http://localhost:', port);
    server.forEachRoute(route => {
        console.log('Rota registrada: %s [%s]', route.path, route.method);
    });
});