var Packets = {
    session_id: require('./packets/session_id')
};

class Packet {
    constructor(json, member) {
        this.event = 'Unknown Event';
        this.errors = [];
        this.obj = null;

        var constructor = null;
        // eventが渡されていないもしくは不明のeventの場合は弾く
        if (json.hasOwnProperty("event") && Packets.hasOwnProperty(json.event)) {
            this.event = json.event;
            constructor = Packets[this.event];
            this.obj = new constructor(json.data, member);
        } else {
            this.errors.push('Unknown Event pushed');
        }
    }

    getErrors() {
        return [this.errors, this.obj ? this.obj.getErrors() : []].flatten();
    }

    getResult() {
        return this.obj ? this.obj.getResult() : {};
    }

    getEvent() {
        return this.event;
    }
}

module.exports = Packet;