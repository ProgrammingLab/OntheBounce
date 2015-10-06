var Base = require('./base');
var _ = require('./util');

var rooms = [];
var errors = [];

class Room extends Base {
    constructor(user) {
        super();
        this.members = [];
        this.$children = this.members;
        this.room_id = _.sha1(new Date().getTime());
        this.author = user;

        this.round = null;
        this.hit_point = null;
        this.user_count = null;
        Room.push(this);
    }

    setRound(round) {
        this.round = parseInt(round / 2 + 1) * 2;
    }

    addMember(member, errors) {
        var rand = _.random;

        // それぞれのチームの人数を数える
        var team_count = [0, 0];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < this.members.length; j++) {
                if (this.members[j].session_id == member.session_id) {
                    errors.push("Member is already joined");
                    return;
                }
                if (this.members[j].team_id == i) {
                    team_count[i]++;
                }
            }
        }

        var num = rand(0, 1);
        if (team_count[num] == this.user_count / 2) {
            if (team_count[num ^ 1] == this.user_count / 2) {
                errors.push("The room is full");
            } else {
                member.team_id = num ^ 1;
            }
        } else {
            member.team_id = num;
        }

        member.$parent = this;

        this.members.push(member);
    }

    isMember(member) {
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].session_id == member.session_id) {
                return true;
            }
        }
        return false;
    }

    static push(room) {
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].room_id == room.room_id) {
                errors.push("The room already exists.")
                return;
            }
        }
        rooms.push(room);
    }

    static get(fn) {
        for (var i = 0; i < rooms.length; i++) {
            if (fn(rooms[i])) {
                return rooms[i];
            }
        }
        errors.push("The room is not exists");
        return null;
    }

    static getError() {
        var ret = errors;
        errors = [];
        return ret;
    }
}

module.exports = Room;