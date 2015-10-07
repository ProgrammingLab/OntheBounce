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