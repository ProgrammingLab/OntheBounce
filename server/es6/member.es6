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
        this.team_id = null;
        this.ready = false;
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