const mongo = require('mongoose');
const Schema = mongo.Schema;

const thumbnailSchema = new Schema(
    {
        url: { type: String, default: 'NA' },
        height: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
    },
    {
        versionKey: false,
    }
);

const videoSchema = new Schema(
    {
        // Indexing for filter api, which searches title or description
        // Did not create a text index, because we will be doing regex search on these fields
        title: { type: String, index: true },
        description: { type: String, index: true },

        // Indexed because this is used for sorting in /video/ api
        // Used for pagination
        publishedAt: { type: Date, index: true },

        thumbnail: {
            default: thumbnailSchema,
            high: thumbnailSchema,
            medium: thumbnailSchema,
        },
    },

    {
        versionKey: false,
    }
);

const Video = mongo.model('videos', videoSchema, 'videos');
module.exports = Video;
