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
                'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.',
            ],
        },

        youtube: {
            baseUrl: 'https://www.googleapis.com/youtube/v3/search',
            pollingInterval:
                process.env.YOUTUBE_API_POLLING_INTERVAL_IN_SECONDS || 10,
        },
    },
};

module.exports = config;
