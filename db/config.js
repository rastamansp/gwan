/*jshint esversion: 6 */
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/statusReport';
//const dbURI = 'mongodb://mongodb.gwan.kinghost.net/gwan01';

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect(dbURI, options);

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection connected to "%s"', dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});
mongoose.connection.on('open', function() {
    console.log('Mongoose default connection is open');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});