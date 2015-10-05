var Room = require('../room');
var Base = require('./base');

class CreateRoom extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;
        this.room = null;

        this.validate('session_id', {required: true});
        this.validate('round', {default: 3});
        this.validate('hit_point', {default: 20});
        this.validate('user_count', {default: 2});

        if (this.session_id && this.session_id == this.member.session_id) {
            this.room = new Room(this.member);
            this.room.hit_point = this.hit_point;
            this.room.round = this.round;
            this.room.user_count = this.user_count;
        } else {
            this.errors.push("Session id is invalid");
        }
    }

    getResult() {
        return this.room ?
        {
            room_id: this.room.room_id,
            round: this.room.round,
            hit_point: this.room.hit_point,
            user_count: this.room.user_count
        } : {};
    }

    getErrors() {
        return this.errors.flatten();
    }
}

module.exports = CreateRoom;
