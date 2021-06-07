var youtubeData = require('../data/youtube');
module.exports = {
    test: async function () {
        return await youtubeData.test();
    },
};
