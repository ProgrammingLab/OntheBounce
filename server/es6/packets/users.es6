var Base = require('./base');
var Room = require('../room');

class Users extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;
        this.room = null;

        this.members = [];

        this.validate('session_id', {required: true});
        this.validate('room_id', {required: true});

        if (this.session_id && this.session_id == member.session_id) {
            if (this.room_id) {
                var room_id = this.room_id;
                this.room = Room.get((room) => {
                    return room.room_id == room_id;
                });
                if (this.room) {
                    var members = this.room.members;
                    for (var i = 0; i < members.length; i++) {
                        this.members.push({session_id: members[i].session_id, ready: members[i].ready});
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
        return this.room ? {users: this.members} : {};
    }

    getErrors() {
        return this.errors.flatten();
    }
}

module.exports = Users;
