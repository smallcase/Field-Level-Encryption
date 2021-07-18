const searchService = require('../service/user');
const utils = require('../../lib/utils');

module.exports = {
    getUser: async function (req, res) {
        try {
            const email = req.query.email;
            const data = await searchService.getUser(email);
            res.status(200).json(utils.createRes(true, null, data));
        } catch (error) {
            console.log(error);
            res.status(500).json(utils.createRes(false, error.message, null));
        }
    },

    addUser: async function (req, res) {
        try {
            const { email, phone, name } = req.body;
            const data = await searchService.addUser(email, phone, name);
            res.status(200).json(utils.createRes(true, null, data));
        } catch (error) {
            console.log(error);
            res.status(500).json(utils.createRes(false, error.message, null));
        }
    },

    aggregate: async function (req, res) {
        try {
            const { email } = req.query;
            const data = await searchService.aggregate(email);
            res.status(200).json(utils.createRes(true, null, data));
        } catch (error) {
            console.log(error);
            res.status(500).json(utils.createRes(false, error.message, null));
        }
    },
};
