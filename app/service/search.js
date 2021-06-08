const searchData = require('../data/search');
const nodeCahce = require('node-cache');
var pageCache = new nodeCahce({ stdTTL: 3600 });

function buildRegex(text) {
    var words = text.split(' ');
    var regex = '';
    words.forEach((word) => {
        word = word.trim();
        word = word.replace(/[^a-zA-Z0-9]/g, '');
        if (word) regex += `${word}|`;
    });
    return regex.slice(0, -1);
}

module.exports = {
    // We are storing the data ordered by date
    // So _id is also sorted by date and not publishedAt
    // So _id cannot be used for pagination
    // We have to use pulishedAt

    // Would have prefered to use fast pagination technique
    // Failing TC for this
    // There are 15 videos of same publishedAt say T
    // page limit is 10
    // We fetch first 10 videos of ts T
    // Next time we will fetch videos ts less T, so 5 videos will be missed
    // If we get videos with ts >= T, 10 videos will be repeated

    // Hence, using skip and limit is the most correct option to proceed with, although not the most efficient

    getPaginatedData: async function (page, limit) {
        var data = await searchData.getPagedDataSortedByPublishedAt(
            page,
            limit
        );

        return data;
    },

    getFilteredData: async function (title, description) {
        if (title || description) {
            var titleRegex = title ? buildRegex(title) : null;
            var descriptionRegex = description ? buildRegex(description) : null;

            return await searchData.getFilteredData(
                titleRegex,
                descriptionRegex
            );
        } else return await searchData.getPagedDataSortedByPublishedAt(1, 10);
    },
};
