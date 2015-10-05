var Base = require('./base');
var Member = require('../member');

class UserReady extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;

        this.validate('session_id', {required: true});

        if (this.session_id && this.session_id == this.member.session_id) {
            this.member.ready = true;
        } else {
            this.errors.push("Session id is invalid");
        }
    }

    getResult() {
        return {};
    }

    getErrors() {
        return this.errors.flatten();
    }
}

module.exports = UserReady;