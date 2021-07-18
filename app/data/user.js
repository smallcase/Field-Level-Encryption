const { encrypt } = require('../../models/cipher');
const models = require('../../models/index');

module.exports = {
    getUser: async function (email) {
        try {
            return await models.User.find({ email: email }).lean({
                getters: true,
            });
        } catch (error) {
            console.log(error);
            throw new Error(`Error in getting data from db : ${error.message}`);
        }
    },

    addUser: async function (email, phone, name) {
        try {
            var user = new models.User();
            user.email = email;
            user.phone = phone;
            user.name = name;
            return await user.save();
        } catch (error) {
            console.log(error);
            throw new Error(`Error in getting data from db : ${error.message}`);
        }
    },

    aggregate: async function (email) {
        try {
            var encryptedEmail = encrypt(email);
            var result = await models.User.aggregate([
                {
                    $match: {
                        email: encryptedEmail,
                    },
                },
                {
                    $project: {
                        name: 1,
                        phone: 1,
                    },
                },
            ]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(`Error in getting data from db : ${error.message}`);
        }
    },
};
