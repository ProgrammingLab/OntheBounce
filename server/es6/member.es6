var Base = require('./base');
var _ = require('./util');
var Udp = require('./tcp');
var Room = require('./room');

function parseJson(msg, errors) {
    var data;
    try {
        data = JSON.parse(msg.toString());
    } catch (e) {
        errors.push(e.toString());
    }
    return data;
}

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

    $onSessionId(data) {
        var result = {event: "session_id"};
        result.session_id = this.session_id;
    }

    $onCreateRoom(data) {
        var result = {event: "create_room"};
        var errors = [];
        if (data.session_id != this.session_id) {
            errors.push("Session id is invalid");
        }
        var room = new Room(this);
        room.addMember(this, errors);
        result.room_id = room.room_id;
    }

    $onJoinRoom(data) {
        var result = {event: "join_room"};
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
    }

    $socketData(msg) {
        var errors = [];
        var data = {};
        var json = parseJson(msg, errors);

        var self = this;
        this.event_list.foreach(function (key) {
            if (json.event == key) {
                var event = json.event;
                self.$emit(event, json.data);
            }
        });
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
        console.log(members);
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