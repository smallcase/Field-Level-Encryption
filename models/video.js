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
        title: String,
        description: String,
        publishedAt: Date,
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
