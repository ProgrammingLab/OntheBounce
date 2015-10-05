var Base = require('./base');
var Member = require('../member');

class SessionId extends Base {
    constructor(data, member) {
        super(data || {});
        this.member = member;
    }

    getResult() {
        return Member.getError() ? {} : {session_id: this.member.session_id}
    }

    getErrors() {
        return Member.getError().flatten();
    }
}

module.exports = SessionId;