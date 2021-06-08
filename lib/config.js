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
        apiKey: {
            keys: [
                process.env.GOOGLE_API_KEY_1 || '',
                process.env.GOOGLE_API_KEY_2 || '',
                process.env.GOOGLE_API_KEY_3 || '',
                process.env.GOOGLE_API_KEY_4 || '',
                process.env.GOOGLE_API_KEY_5 || '',
                process.env.GOOGLE_API_KEY_6 || '',
                process.env.GOOGLE_API_KEY_7 || '',
            ],
            acceptedErrors: [
                'API key not valid. Please pass a valid API key.',
                'Serving Limit Exceeded',
            ],
        },

        youtube: {
            baseUrl: 'https://www.googleapis.com/youtube/v3/search',
            pollingInterval: process.env.YOUTUBE_API_POLLING_INTERVAL || 10,
        },
    },
};

module.exports = config;
