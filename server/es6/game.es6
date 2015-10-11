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
            this.teams[members[i].team_id][members[i].session_id] = {team_id: members[i].team_id, hit_count: 0, hitted_count: 0, status: 'alive'};
        }

        this.teams.allDead = function(team_id) {
            var members = this[team_id];
            for (var i = 0; i < members.length; i++) {
                if (members[i].status == 'alive') {
                    return false;
                }
            }
            return true;
        };
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
            for (var i = 0; i < 2; i++) {
                if (this.teams.allDead(i)) {
                    this.win_team_id = i ^ 1;
                }
            }
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

    getResult(session_id) {
        var members = this.$parent.getMembers();
        for (var i = 0; i < members.length; i++) {
            if (members[i].session_id == session_id) {
                var member = this.teams[members[i].team_id][members[i].session_id];
                return {
                    round: this.round,
                    win: member.team_id == this.win_team_id,
                    hit_count: member.hit_count,
                    hitted_count: member.hitted_count
                };
            }
        }
        return {};
    }
}

module.exports = Game;