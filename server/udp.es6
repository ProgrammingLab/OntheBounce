var _ = require('dgram');

class Udp {
  constructor(host, port) {
    this.socket_ = _.createSocket('udp4');
    this.host = host;
    this.port = port;
  }

  close() {
    this.socket_.close();
  }

  distribute(event, data, errors) {
    var msg = {
      event: event,
      data: data,
      errors: errors
    };
    var msg_json = JSON.stringify(msg);
    this.socket_.send(msg_json, 0, msg_json.length, this.port, this.host);
  }
}

module.exports = Udp;