var Game = require('./game');

var GameStatus = {
    preparation: 0,
    started: 1,
    stopped: 2
};

class GameManager {
    constructor(room) {

        this.$parent = room;

        this.games = [];

        this.status = GameStatus.preparation;
        this.round = 3;
        this.current_round = 1;
    }

    startGame() {
        var game = new Game(this);
        game.start();
        this.status = GameStatus.started;
        this.games.push(game);
    }

    stopGame(win_team_id) {
        var teams = [0, 0];
        for (var i = 0; i < this.games.length; i++) {
            teams[this.games[i].win_team_id]++;
        }

        var next_round = 0;
        this.current_round++;

        var gt_team_id = 0;
        if (teams[0] != teams[1]) {
            if (teams[0] > teams[1]) {
                gt_team_id = 0;
            } else {
                gt_team_id = 1;
            }
        }

        if (this.round / 2 + 1 >= teams[gt_team_id]) {
            next_round = this.current_round;
        }

        this.$parent.stopGame(win_team_id, next_round);
    }

    getCurrentGame() {
        return this.games[this.current_round - 1];
    }


    getMembers() {
        return this.$parent.members;
    }
}

module.exports = GameManager;