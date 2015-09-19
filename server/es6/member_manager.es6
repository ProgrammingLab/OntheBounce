class MemberManager {
    constructor() {
        this.members = [];
        this.errors = [];
    }

    get(member_id) {
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].session_id == member_id) {
                return this.members[i];
            }
        }
        this.errors.push("That session_id is invalid.");
        return null;
    }

    push(member) {
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].session_id == member.session_id) {
                this.errors.push("The user already exists.")
                return;
            }
        }
        this.members.push(member);
    }
}

module.exports = MemberManager;