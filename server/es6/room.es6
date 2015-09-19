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

  isMember(member) {
    for (var i = 0; i < this.members.length; i++) {
      if (this.members[i].session_id == member.session_id) {
        return true;
      }
    }
    return false;
  }
}

module.exports = Room;