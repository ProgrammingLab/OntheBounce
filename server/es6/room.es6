var Base = require('./base');
var _ = require('./util');
var room_manager = require('./room_manager');

var rooms = [];
var errors = [];

class Room extends Base {
  constructor(user) {
    super();
    this.members = [];
    this.$children = this.members;
    this.room_id = _.sha1(new Date().getTime());
    this.author = user;
    Room.push(this);
  }

  addMember(member, errors) {
    member.$parent = this;
    this.members.push(member);
  }

  isMember(member) {
    for (var i = 0; i < this.members.length; i++) {
      if (this.members[i].session_id == member.session_id) {
        return true;
      }
    }
    return false;
  }

  static push(room) {
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].room_id == room.room_id) {
        errors.push("The room already exists.")
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
    errors.push("The room is not exists");
    return null;
  }

  static getError() {
    var ret = errors;
    errors = [];
    return ret;
  }
}

module.exports = Room;