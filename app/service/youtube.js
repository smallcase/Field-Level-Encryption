const youtubeData = require('../data/youtube');
const axios = require('axios');
const config = require('../../lib/config');
const utils = require('../../lib/utils');

async function callYoutubeApi(apiKey) {
    var url = config.google.youtube.baseUrl;
    var response;
    var last10Seconds = new Date(new Date().getSeconds() - 10);
    response = await axios.get(url, {
        params: {
            key: apiKey,
            // key: 'config.google.apiKeys[0]',
            type: 'video',
            order: 'date',
            part: 'snippet',
            publishedAfter: last10Seconds,
            q: 'football',
            maxResults: 25,
            fields: 'items(snippet)',
        },
    });
    return response;
}

async function getVideoData(currentApiKeyIndex) {
    var videoData = [];
    var response = null;

    for (
        currentApiKeyIndex;
        currentApiKeyIndex < config.google.apiKey.keys.length && !response;

    ) {
        var apiKey = config.google.apiKey.keys[currentApiKeyIndex];
        if (!apiKey) currentApiKeyIndex++;
        else {
            try {
                response = await callYoutubeApi(apiKey);
            } catch (error) {
                console.log(error.message);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error &&
                    error.response.data.error.message &&
                    config.google.apiKey.acceptedErrors.includes(
                        error.response.data.error.message
                    )
                )
                    currentApiKeyIndex++;
                else
                    throw new Error(
                        `Error in fetching data from youtube api : ${error.message}`
                    );
            }
        }
    }

    if (currentApiKeyIndex === config.google.apiKey.keys.length)
        throw new Error('Google API Keys not found or not valid');

    if (!response) throw new Error('No data recieved from youtube api');

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

        return { data: videoData, workingApiIndexKey: currentApiKeyIndex };
    } catch (error) {
        console.log(error);
        throw new Error(`Error in processing youtube data : ${error.message}`);
    }
}

async function run(currentApiKeyIndex) {
    try {
        const { data, workingApiIndexKey } = await getVideoData(
            currentApiKeyIndex
        );
        await youtubeData.insertData(data);
        return workingApiIndexKey;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getData: function (currentApiKeyIndex, callback) {
        run(currentApiKeyIndex)
            .then((data) => {
                return callback(null, data);
            })
            .catch((err) => {
                return callback(err, null);
            });
    },
};
