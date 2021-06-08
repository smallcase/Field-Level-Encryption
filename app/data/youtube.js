const models = require('../../models/index');

module.exports = {
    insertData: async function (data) {
        try {
            await models.Video.insertMany(data);
        } catch (error) {
            console.log(error);
            throw new Error(`Error in inserting data in db : ${error.message}`);
        }
    },
};
