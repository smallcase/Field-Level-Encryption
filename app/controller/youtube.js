const youTubeService = require('../service/youtube');
const utils = require('../../lib/utils');

module.exports = {
    getData: async function (req, res) {
        try {
            const data = await youTubeService.getData();
            res.status(200).json(utils.createRes(true, null, data));
        } catch (error) {
            res.status(500).json(utils.createRes(false, error.message, null));
        }
    },

    test: async function (req, res) {
        res.status(200).send('Test');
    },
};
