var Base = require('./base');
var _ = require('./util');

class Room extends Base {
  constructor(user) {
    super();
    this.members = [];
    this.$children = this.members;
    this.room_id = _.sha1(new Date().getTime());
    this.author = user;
  }

  addMember(member, errors) {
    this.members.push(member);
  }

  static getRoom(room_id) {
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].room_id == room_id) {
        return rooms[i];
      }
    }
    return null;
  }

  static pushRoom(room) {
    rooms.push(room);
  }
}

var rooms = [];

module.exports = Room;