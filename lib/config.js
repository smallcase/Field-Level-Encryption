var config = {
    server: {
        port: 8900,
    },

    mongodb: {
        dbURI: process.env.a || 'mongodb://localhost:27017/youtube-search',
        dbOptions: {
            user: process.env.MONGODB_USER || '',
            pass: process.env.MONGODB_PASS || '',
            useFindAndModify: false,
        },
    },
};

module.exports = config;
