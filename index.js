var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./lib/config');
var connections = require('./connections/index')();

const userRoutes = require('./app/routes/user');

connections.init(function (err, connection) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    var app = express();
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.on('finish', () => {
            console.log(`${res.statusCode} ${res.statusMessage} ${req.url}`);
        });
        next();
    });

    process.on('uncaughtException', function (err) {
        console.error(err);
    });

    app.use(cors());

    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );

        // Request headers you wish to allow
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With,content-type'
        );

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.use('/', userRoutes);

    app.listen(config.server.port, () => {
        console.info('FLE API running on port - ' + config.server.port);
    });
});
