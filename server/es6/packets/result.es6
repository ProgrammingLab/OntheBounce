var Room = require('../room');
var Base = require('./base');

class Result extends Base {
    constructor(data, member) {
        super(data || {});

        this.member = member;

        this.validate('session_id', {required: true});

        if (this.session_id && this.session_id == this.member.session_id) {
            var game_manager = this.$parent.game_manager;
            this.result = game_manager.getResult();
        } else {
            this.errors.push("Session id is invalid");
        }
    }

    getResult() {
        return this.hadError() ? {} : this.result;
    }
}

module.exports = Result;
