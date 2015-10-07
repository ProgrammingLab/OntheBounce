var Base = require('./base');
var Member = require('../member');

class UserReady extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;

        this.validate('session_id', {required: true});

        if (this.session_id && this.session_id == this.member.session_id) {
            if (this.member.joinedRoom()) {
                this.member.ready = true;

                var room = this.member.$parent;
                if (room.allReady()) {
                    room.startGame();
                }
            } else {
                this.member.errors.push("You have not joined yet this room");
            }
        } else {
            this.errors.push("Session id is invalid");
        }
    }

    getResult() {
        return {};
    }
}

module.exports = UserReady;