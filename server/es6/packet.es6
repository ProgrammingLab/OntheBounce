
var Packets = {
    session_id: require('./packets/session_id')
};

class Packet {
    constructor(data) {
        this.errors = [];
        this.obj = null;
        var event = data.event;
        var constructor = Packets[event];
        if (!constructor) {
            this.errors.push('Unknown Event pushed');
        } else {
            this.obj = new constructor(data);
        }
    }
}

module.exports = Packet;