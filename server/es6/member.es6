var Base = require('./base');
var _ = require('./util');
var Packet = require('./packet');

var members = [];
var errors = [];

class Member extends Base {
    constructor(socket) {
        super(socket);
        this.address = socket.remoteAddress;
        this.session_id = _.sha1(this.address + 'salt' + _.random(0, 100));
        this.team_id = null;
        this.ready = false;

        this.hit_count = 0;
        this.hitted_count = 0;
        Member.push(this);
    }

    $socketData(msg) {
        var json;
        try {
            json = JSON.parse(msg.toString());
        } catch (e) {
            json = {};
            errors.push(e.toString());
        }

        var data = new Packet(json, this);
        this.$emit('send', data.getEvent(), data.getResult(), data.getErrors());
    }

    getManager() {
        return Member;
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
}

module.exports = Member;