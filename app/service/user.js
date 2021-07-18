const userData = require('../data/user');

module.exports = {
    getUser: async function (email) {
        var data = await userData.getUser(email);

        return data;
    },

    addUser: async function (email, phone, name) {
        var data = await userData.addUser(email, phone, name);
        return data;
    },

    aggregate: async function (email) {
        var data = await userData.aggregate(email);
        return data;
    },
};
