const mongo = require('mongoose');
const Schema = mongo.Schema;

const videoSchema = new Schema(
    {
        title: String,
        description: String,
        publishedAt: Date,
        thumbnail: String,
    },

    {
        versionKey: false,
    }
);

const Video = mongo.model('videos', videoSchema, 'videos');
module.exports = Video;
