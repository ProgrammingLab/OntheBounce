var Packets = {
    session_id: require('./packets/session_id'),
    create_room: require('./packets/create_room'),
    join_room: require('./packets/join_room'),
    setting_room: require('./packets/setting_room'),
    users: require('./packets/users'),
    user_ready: require('./packets/user_ready'),
    user_dead: require('./packets/user_dead'),
    hitted: require('./packets/hitted')
};

class Packet {
    constructor(json, member) {
        this.event = 'Unknown Event';
        this.errors = [];
        this.obj = null;

        var constructor = null;
        // eventが渡されていないもしくは不明のeventの場合は弾く
        if (json.hasOwnProperty("event") && Packets.hasOwnProperty(json.event)) {
            if (json.data.hasOwnProperty("debug")) {
                this.debug = !!json.data.debug;
            }
            this.event = json.event;
            constructor = Packets[this.event];
            this.obj = new constructor(json.data, member);
            this.obj.debug = json;
        } else {
            this.errors.push('Unknown event has pushed');
        }
    }

    getErrors() {
        return [this.errors, this.obj ? this.obj.getErrors() : []].flatten();
    }

    getResult() {
        var result = this.obj ? this.obj.getResult() : {};
        if (this.debug) {
            result.debug = this.obj.debug;
        }
        return result;
    }

    getEvent() {
        return this.event;
    }
}

module.exports = Packet;