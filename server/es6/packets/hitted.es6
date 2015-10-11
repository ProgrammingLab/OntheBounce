var Base = require('./base');
var Room = require('../room');

class Hitted extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;

        this.attack_user = null;
        this.hitted_user = null;

        //this.validate('attack_session_id', {required: true});
        this.validate('hitted_session_id', {required: true});

        var Member = member.getManager();

        console.log(this.hitted_session_id);
        if (this.hitted_session_id) {
            var self = this;
            this.hitted_user = Member.get(function(mem) {
                return mem.session_id == self.hitted_session_id;
            });
            var room = this.hitted_user.$parent;
            for (var i = 0; i < room.members.length; i++) {
                if (room.members[i].session_id != this.hitted_user.session_id) {
                    this.attack_user = room.members[i];
                }
            }
            if (this.attack_user && this.hitted_user) {
                this.attack_user.hit_count++;
                this.hitted_user.hitted_count++;
            }
        }
        /*
        if (this.attack_session_id && this.hitted_session_id) {
            var self = this;
            this.attack_user = Member.get(function(mem) {
                return mem.session_id == self.attack_session_id;
            });
            this.hitted_user = Member.get(function(mem) {
                return mem.session_id == self.hitted_session_id;
            });
            if (this.attack_user && this.hitted_user) {
                this.attack_user.hit_count++;
                this.hitted_user.hitted_count++;
            } else {
                this.errors.push("attack_session_id or hitted_session_id is invalid");
            }
        }
        */
    }

    getResult() {
        return {};
    }

    getErrors() {
        return this.errors.flatten();
    }
}

module.exports = Hitted;