var crypto = require('crypto');

exports.sha1 = function (str) {
    return crypto.createHash('sha1')
        .update(str.toString()).digest('hex');
};

exports.to_json = function (event, data, errors) {
    var msg = {
        event: event,
        data: data,
        errors: errors
    };

    return JSON.stringify(msg) + "\n";
};

exports.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
