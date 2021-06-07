var async = require('async');
var config = require('../lib/config');
var mongoCon = require('../connections/mongo')(config);

module.exports = function () {
    // const kafkaConsumer = require('./kafkaConsumer')(kafka, config, log)
    return {
        init: function (callback) {
            async.parallel(
                {
                    mongoClient: function (cb) {
                        mongoCon.connect(cb);
                    },
                },
                callback
            );
        },
    };
};
