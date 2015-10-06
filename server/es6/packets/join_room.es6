var Room = require('../room');
var Base = require('./base');

class JoinRoom extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;
        this.room = null;

        this.validate('session_id', {required: true});
        this.validate('room_id', {required: true});

        if (this.session_id && this.session_id == this.member.session_id) {
            if (this.room_id) {
                var room_id = this.room_id;
                this.room = Room.get((room) => {
                    return room.room_id == room_id;
                });
                if (this.room) {
                    if (this.room.joinAble(this.member)) {
                        this.room.addMember(this.member);
                    }
                } else {
                    this.errors.push("Room id is invalid");
                }
            }
        } else {
            this.errors.push("Session id is invalid");
        }
    }

    getResult() {
        return this.hadError() ? {} :
        {
            hit_point: this.room.hit_point,
            round: this.room.round,
            user_count: this.room.user_count,
            team_id: this.member.team_id
        };
    }
}

module.exports = JoinRoom;
