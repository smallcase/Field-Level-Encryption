module.exports = {
    createRes: function (success, errorMessage, data) {
        return {
            success,
            error: errorMessage,
            data,
        };
    },

    massageData: function (text) {
        if (!text) return 'NA';
        else return text.replace(/[^\x00-\x7F]/g, '');
    },
};
