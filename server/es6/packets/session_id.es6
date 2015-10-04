class SessionId {
    constructor(data, member) {
        data = data || {};
        this.member = member;
        this.data = data || {};
    }

    getResult() {
        return {session_id: this.member.session_id};
    }

    getErrors() {
        return [];
    }
}

module.exports = SessionId;