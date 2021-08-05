const mongoose = require('mongoose');
const mongooseLeanGetter = require('mongoose-lean-getters');
const Schema = mongoose.Schema;

const { encrypt, decrypt } = require('./cipher');

const userSchema = new Schema(
    {
        name: String,
        phone: { type: String, get: decrypt, set: encrypt },
        email: { type: String, get: decrypt, set: encrypt },
    },

    {
        versionKey: false,
        toObject: { getters: true, setters: true },
        toJSON: { getters: true, setters: true },
        runSettersOnQuery: true,
    }
);

userSchema.plugin(mongooseLeanGetter);

const User = mongoose.model('users', userSchema, 'users');
module.exports = User;
