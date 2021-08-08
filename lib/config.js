var config = {
    server: {
        port: 8900,
    },

    mongodb: {
        dbURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
        dbOptions: {
            user: process.env.MONGODB_USER || '',
            pass: process.env.MONGODB_PASS || '',
            useFindAndModify: false,
        },
    },
};

module.exports = config;
