class Game {
    constructor(gm) {
        this.$parent = gm;

        this.round = null;
        this.win_team_id = null;
        this.started = false;
        this.stopped= true;

        this.teams = [[], []];

        var members = this.$parent.getMembers();
        for (var i = 0; i < members.length; i++) {
            this.teams[members[i].team_id][members[i].session_id] = {hit_count: 0, hitted_count: 0, status: 'alive'};
        }
    }

    dead(session_id) {
        var flg = false;
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < this.teams[i].length; j++) {
                var member = this.teams[i][j];
                if (member.session_id == session_id) {
                    member.status = 'dead';
                }

                if (member.status == 'alive') {
                    flg = true;
                }
            }
        }
        if (!flg) {
            this.stop();
        }
    }

    ready(session_id) {
        var members = this.$parent.getMembers();
        for (var i = 0; i < members.length; i++) {
            if (members[i].session_id == session_id) {
                members[i].ready = true;
            }
        }
    }

    start() {
        this.started = true;
        this.stopped = false;
        this.round = this.$parent.current_round;
    }

    stop() {
        this.stopped = true;
        this.$parent.stopGame(this.win_team_id);
    }
}

module.exports = Game;