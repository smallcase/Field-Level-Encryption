const mongoose = require('mongoose');

module.exports = function (config) {
    return {
        connect: function (callback) {
            const dbConnection = getMongoConnection(
                config.mongodb.dbURI,
                // config.mongodb.dbOptions,
                {},
                true
            );
            dbConnection.once('open', function () {
                return callback(null, dbConnection);
            });
            dbConnection.once('error', function (err) {
                return callback(err);
            });
        },
    };
};

var getMongoConnection = function (uri, options, showDebug, callback = null) {
    var log = console;

    mongoose.Promise = global.Promise;
    var dbOptions = {
        poolSize: 5,
        keepAlive: 1000,
        connectTimeoutMS: 30000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    if (options) {
        dbOptions = Object.assign({}, dbOptions, options);
    }
    mongoose.connect(uri, dbOptions, function (err, client) {
        if (callback && typeof callback === 'function') callback(err, client);
    });
    var conn = mongoose.connection;
    if (showDebug) {
        mongoose.set('debug', true);
    }
    conn.on('open', function () {
        // (pid,env) should be unique to distinguish between logs
        log.info({ event: { mongodb: 'open' } });
    });
    conn.on('error', function (err) {
        log.error({ err: { name: err.name, stack: err.stack } });
    });
    conn.on('reconnected', function () {
        log.info({ event: { mongodb: 'reconnected' } });
    });
    conn.on('disconnected', function () {
        log.info({ babel: { event: { mongodb: 'disconnected' } } });
    });
    return conn;
};
