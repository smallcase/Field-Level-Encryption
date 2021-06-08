const models = require('../../models/index');

module.exports = {
    getPagedDataSortedByPublishedAt: async function (page, limit) {
        try {
            return await models.Video.find()
                .sort({ publishedAt: -1 })
                .skip(limit * (page - 1))
                .limit(limit)
                .lean();
        } catch (error) {
            console.log(error);
            throw new Error(`Error in getting data from db : ${error.message}`);
        }
    },

    // Since we are storing data according to publishedAt
    // _id is also sorted according to publishedAt
    getVideoData: async function (query, limit) {
        try {
            return await models.Video.find(query)
                .sort({ publishedAt: -1 })
                .limit(limit)
                .lean();
        } catch (error) {
            console.log(error);
            throw new Error(`Error in getting data from db : ${error.message}`);
        }
    },
};
