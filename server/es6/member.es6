var Base = require('./base');
var _ = require('./util');
var Room = require('./room');
var Packet = require('./packet');

var members = [];
var errors = [];


class Member extends Base {
    constructor(socket) {
        super(socket);
        this.address = socket.remoteAddress;
        this.session_id = _.sha1(this.address + 'salt');
        Member.push(this);

        var self = this;

        this.event_list = {
            session_id: self.$onSessionId,
            create_room: self.$onCreateRoom,
            join_room: self.$onJoinRoom,
            users: "",
            user_ready: "",
            hitted: "",
            user_dead: "",
            result: ""
        };

        this.event_list.foreach(function (key, value) {
            if (typeof value == 'function') {
                self.$on(key, value.bind(self));
            }
        });
    }

    $onCreateRoom(data) {
        var result = {};
        var errors = [];
        if (typeof data == 'object' && data.hasOwnProperty("session_id")) {
            if (data.session_id == this.session_id) {
                var room = new Room(this);
                room.addMember(this, errors);
                result.room_id = room.room_id;
            } else {
                errors.push("Session id is invalid");
            }
        } else {
            errors.push("Data is invalid");
        }

        this.$emit('send', 'create_room', result, errors);
    }

    $onJoinRoom(data) {
        var result = {};
        var member = Member.get((mem) => {
            return mem.session_id == data.session_id;
        });
        var room = Room.get((room) => {
            return room.room_id == data.room_id;
        });
        if (member && room) {
            room.addMember(member, errors);
        }
        errors.push(Room.getError());
        errors.push(Member.getError());
        errors = Array.prototype.concat.apply([], errors);

        this.$emit('send', 'join_room', result, errors);
    }

    $socketData(msg) {
        var json,
            errors = [];
        try {
            json = JSON.parse(msg.toString());
        } catch (e) {
            json = {};
            errors.push(e.toString());
        }

        var data = new Packet(json, this);
        this.$emit('send', data.getEvent(), data.getResult(), data.getErrors());
    }

    static push(member) {
        for (var i = 0; i < members.length; i++) {
            if (members[i].session_id == member.session_id) {
                errors.push("The user already exists.");
                return;
            }
        }
        members.push(member);
    }

    static get(fn) {
        for (var i = 0; i < members.length; i++) {
            if (fn(members[i])) {
                return members[i];
            }
        }
        errors.push("That session_id is invalid.")
        return null;
    }

    static getError() {
        var ret = errors;
        errors = [];
        return ret;
    }
}

module.exports = Member;