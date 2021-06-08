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

    google: {
        apiKeys: [process.env.GOOGLE_API_KEY],
        youtube: {
            baseUrl: 'https://www.googleapis.com/youtube/v3/search',
        },
    },
};

module.exports = config;
