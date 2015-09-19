var Base = require('./base');
var _ = require('./util');
var Udp = require('./udp');


class Member extends Base {
  constructor(address) {
    var udp = new Udp(address, 8080);
    super(udp.socket_);
    this.udp = udp;
    this.session_id = _.sha1(address.toString() + 'salt');
    this.address = address;
  }

}

var members = [];

module.exports = Member;