var net = require('net');

class Tcp {
    constructor(socket) {
        this.socket = socket;
    }

    distribute(event, data, errors, fn) {
        var msg_json = Udp.to_json(event, data, errors);
        this.socket.write(msg_json, "UTF-8", fn);
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

module.exports = Tcp;