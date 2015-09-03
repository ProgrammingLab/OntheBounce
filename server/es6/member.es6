var Base = require('./base');
var _ = require('./util');
var Udp = require('./udp');


class Member extends Base {
  constructor(address) {
    var udp = new Udp(address, 8080);
    super(udp.socket_);
    this.udp = udp;
    this.session_id = _.sha1(address.toString() + 'salt');
  }

  static getMember(member_id) {
    for (var i = 0; i < members.length; i++) {
      if (members[i].session_id == member_id) {
        return members[i];
      }
    }
    return null;
  }

  static pushMember(member) {
    members.push(member);
  }
}

var members = [];

module.exports = Member;