const youtubeData = require('../data/youtube');
const { google } = require('googleapis');
const axios = require('axios');
const config = require('../../lib/config');
const utils = require('../../lib/utils');

async function getVideoData() {
    var url = config.google.youtube.baseUrl;
    var videoData = [];
    var response;

    try {
        var last10Seconds = new Date(new Date().getSeconds() - 10);
        response = await axios.get(url, {
            params: {
                key: config.google.apiKeys[0],
                type: 'video',
                order: 'date',
                part: 'snippet',
                publishedAfter: last10Seconds,
                q: 'football',
                maxResults: 25,
            },
        });
    } catch (error) {
        console.log(error);
        throw new Error(`Error in fetching youtube data : ${error.message}`);
    }

    try {
        if (
            response.data &&
            response.data.items &&
            response.data.items.length
        ) {
            response.data.items.forEach((items) => {
                var snippet = items.snippet;
                if (snippet) {
                    var currentItem = {
                        title: utils.massageData(snippet.title),
                        description: utils.massageData(snippet.description),
                        publishedAt: snippet.publishedAt || null,
                        thumbnail: snippet.thumbnails || {},
                    };
                    videoData.push(currentItem);
                }
            });
        }
        console.log(JSON.stringify(videoData));
        return videoData;
    } catch (error) {
        console.log(error);
        throw new Error(`Error in processing youtube data : ${error.message}`);
    }
}

module.exports = {
    getData: async function () {
        const data = await getVideoData();
        await youtubeData.insertData(data);
        return true;
    },
};
