var Base = require('./base');
var _ = require('./util');
var Packet = require('./packet');

var members = [];

class Member extends Base {
    constructor(socket) {
        super(socket);
        this.address = socket.remoteAddress;
        this.errors = [];
        this.session_id = _.sha1(this.address + 'salt' + _.random(0, 100));
        this.team_id = null;
        this.ready = false;

        this.hit_count = 0;
        this.hitted_count = 0;

        this.$on('gamestart', this.gamestart.bind(this));
        this.$on('gamestop', this.gamestop.bind(this));
    }

    gamestart(round) {
        this.$emit('send', 'game_start', {round: round});
    }

    gamestop(win_team_id, next_round) {
        this.$emit('send', 'game_stop', {win_team_id: win_team_id, next_round: next_round})
    }

    getErrors() {
        var ret = this.errors.flatten();
        this.errors = [];
        return ret;
    }

    $socketData(msg) {
        var json;
        try {
            json = JSON.parse(msg.toString());
        } catch (e) {
            json = {};
            this.errors.push(e.toString());
        }

        var data = new Packet(json, this);
        var event = data.getEvent(),
            res = data.getResult(),
            errors = data.getErrors();
        console.log({event: event, data: res, errors: errors});
        this.$emit('send', event, res, errors);
    }

    joinedRoom() {
        return this.$parent != null;
    }

    $socketClose(had_error) {
        if (this.joinedRoom()) {
            var room = this.$parent;

            room.removeMember(this);
        }

        Member.remove(this.session_id);
    }

    hadError() {
        return !(this.errors.length == 0);
    }

    getManager() {
        return Member;
    }

    static push(member) {
        for (var i = 0; i < members.length; i++) {
            if (members[i].session_id == member.session_id) {
                member.errors.push("The user have already existed");
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
        return null;
    }

    static remove(session_id) {
        var member;
        for (var i = 0; i < members.length; i++) {
            if (members[i].session_id == session_id) {
                member = members[i];
                members.splice(i, 1);
            }
        }
        member = null;
    }
}

module.exports = Member;
