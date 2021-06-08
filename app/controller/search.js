const searchService = require('../service/search');
const utils = require('../../lib/utils');

module.exports = {
    getPaginatedData: async function (req, res) {
        try {
            var page = parseInt(req.query.page);
            var limit = parseInt(req.query.limit);

            const data = await searchService.getPaginatedData(page, limit);
            res.status(200).json(utils.createRes(true, null, data));
        } catch (error) {
            console.log(error);
            res.status(500).json(utils.createRes(false, error.message, null));
        }
    },

    getFilteredData: async function (req, res) {
        try {
            var title = req.query.title;
            var description = req.query.description;

            const data = await searchService.getFilteredData(
                title,
                description
            );
            res.status(200).json(utils.createRes(true, null, data));
        } catch (error) {
            console.log(error);
            res.status(500).json(utils.createRes(false, error.message, null));
        }
    },
};
