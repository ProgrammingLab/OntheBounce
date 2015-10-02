var Base = require('./base');
var _ = require('./util');
var Udp = require('./tcp');


class Member extends Base {
  constructor(socket) {
    super(socket);
    this.address = socket.remoteAddress;
    this.session_id = _.sha1(this.address + 'salt');
  }
}

var members = [];

module.exports = Member;