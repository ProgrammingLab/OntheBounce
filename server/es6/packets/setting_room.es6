var Base = require('./base');
var Room = require('../room');

class SettingRoom extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;
        this.room = null;

        this.validate('session_id', {require: true});
        this.validate('room_id', {require: true});


        if (this.session_id && this.session_id == this.member.session_id) {
            if (this.room_id) {
                var room_id = this.room_id;
                this.room = Room.get((room) => {
                    return room.room_id == room_id;
                });
                if (this.room) {
                    if (this.room.members.length == 1) {
                        this.validate('round', {default: this.room.round});
                        this.validate('hit_point', {default: this.room.hit_point});
                        this.validate('user_count', {default: this.room.user_count});
                        this.room.setHitPoint(this.hit_point);
                        this.room.setRound(this.round);
                        this.room.setUserCount(this.user_count);
                    } else {
                        this.errors.push("You can not change the room setting because either the other member joined or you have not joined");
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
            user_count: this.room.user_count
        };
    }
}

module.exports = SettingRoom;