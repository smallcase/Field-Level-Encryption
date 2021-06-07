const models = require('../../models/index');

module.exports = {
    test: async function () {
        const data = await models.Video.find({}).lean();
        console.log(data);
        return data;
    },
};
