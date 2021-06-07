var youTubeService = require('../service/youtube');
module.exports = {
    test: async function (req, res) {
        const data = await youTubeService.test();
        res.send(data);
    },
};
