var _ = require('dgram');

class Udp {
  constructor(host, port) {
    this.socket_ = _.createSocket('udp4');
    this.host = host;
    this.port = port;
  }

  distribute(event, data, errors, fn) {
    var msg_json = Udp.to_json(event, data, errors);
    this.socket_.send(msg_json, 0, msg_json.length, this.port, this.host, fn);
  }

  static to_json(event, data, errors) {
    var msg = {
      event: event,
      data: data,
      errors: errors
    };

    return JSON.stringify(msg);
  }
}

module.exports = Udp;