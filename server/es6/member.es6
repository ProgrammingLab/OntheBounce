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
    }

    $socketData(msg) {
        var errors = [];
        var data = {};
        var json = parseJson(msg, errors);

        switch (json.event) {
            case 'session_id':
                data.session_id = this.session_id;
                break;
            case 'create_room':
                if (json.data.session_id != this.session_id) {
                    errors.push("Session id is invalid");
                    break;
                }
                var room = new Room(this);
                room.addMember(this, errors);
                data.room_id = room.room_id;
                break;
            case 'join_room':
                var member = Member.get((mem) => {
                    return mem.session_id == json.data.session_id;
                });
                var room = Room.get((room) => {
                    return room.room_id == json.data.room_id;
                });
                if (member && room) {
                    room.addMember(member, errors);
                }
                errors.push(Room.getError());
                errors.push(Member.getError());
                errors = Array.prototype.concat.apply([], errors);
                break;
            case 'default':
                break;
        }
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