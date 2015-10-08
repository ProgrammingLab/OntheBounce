var Base = require('./base');
var GameManager = require('./game_manager');
var _ = require('./util');

var rooms = [];

class Room extends Base {
    constructor() {
        super();
        this.members = [];
        this.errors = [];
        this.$children = this.members;
        //this.room_id = _.sha1(new Date().getTime());
        this.room_id = "114514";

        this.round = null;
        this.hit_point = null;
        this.user_count = null;
        Room.push(this);

        this.game_manager = new GameManager(this);

        this.$on("gamestart");
        this.$on("gamestop");
    }

    joinAble(member) {
        if (this.user_count <= this.members.length) {
            member.errors.push("This room is full");
            return false;
        }

        for (var i = 0; i < this.members.length; i++) {
            if (member.session_id == this.members[i].session_id) {
                member.errors.push("You have already joined");
                return false;
            }
        }
        return true;
    }

    startGame() {
        console.log("Game start!");
        this.game_manager.startGame();
        this.$broadcast("gamestart", this.game_manager.current_round);
    }

    stopGame(win_team_id, next_round) {
        if (next_round != 0) {
            console.log(`${next_round - 1} round has finished`);
            for (var i = 0; i < this.members.length; i++) {
                this.members[i].ready = false;
            }
        } else {
            console.log("Game stop!");
        }
        this.$broadcast("gamestop", win_team_id, next_round);
    }

    setHitPoint(hit_point) {
        this.hit_point = hit_point;
    }

    setRound(round) {
        this.round = round;
        this.game_manager.round = this.round;
    }

    setUserCount(user_count) {
        this.user_count = user_count % 2 == 0 ? user_count : user_count + 1;
    }

    allReady() {
        for (var i = 0; i < this.members.length; i++) {
            if (!this.members[i].ready) return false;
        }
        return this.user_count == this.members.length;
    }

    addMember(member) {
        var rand = _.random;

        if (member.joinedRoom()) {
            member.errors.push("You have already joined another room");
            return;
        }

        // それぞれのチームの人数を数える
        var team_count = [0, 0];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < this.members.length; j++) {
                if (this.members[j].session_id == member.session_id) {
                    member.errors.push("You have already joined");
                    return;
                }
                if (this.members[j].team_id == i) {
                    team_count[i]++;
                }
            }
        }

        var num = rand(0, 1);
        if (team_count[num] == this.user_count / 2) {
            if (team_count[num ^ 1] == this.user_count / 2) {
                member.errors.push("The room is full");
            } else {
                member.team_id = num ^ 1;
            }
        } else {
            member.team_id = num;
        }

        member.$parent = this;

        this.members.push(member);
    }

    removeMember(member) {
        for (var i = 0; i < this.members.length; i++) {
            if (member == this.members[i]) {
                this.members.splice(i, 1);
            }
        }

        if (this.members.length == 0) {
            Room.remove(this.room_id);
        }
    }

    isMember(member) {
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].session_id == member.session_id) {
                return true;
            }
        }
        return false;
    }

    getErrors() {
        var ret = this.errors.flatten();
        this.errors = [];
        return ret;
    }

    hadError() {
        return !(this.errors.length == 0);
    }

    static push(room) {
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].room_id == room.room_id) {
                room.errors.push("The room has already existed");
                return;
            }
        }
        rooms.push(room);
    }

    static get(fn) {
        for (var i = 0; i < rooms.length; i++) {
            if (fn(rooms[i])) {
                return rooms[i];
            }
        }
        return null;
    }

    static remove(room_id) {
        var room;
        for (var i = 0; i < rooms.length; i++) {
            if (room_id == rooms[i].room_id) {
                room = rooms[i];
                rooms.splice(i, 1);
            }
        }
        room = null;
    }
}

module.exports = Room;