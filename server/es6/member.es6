var Base = require('./base');
var _ = require('./util');
var Udp = require('./tcp');
var Room = require('./room');

function parseJson(msg, errors) {
    var data;
    try {
        data = JSON.parse(msg.toString());
    } catch (e) {
        errors.push(e.toString());
    }
    return data;
}

class Member extends Base {
    constructor(socket) {
        super(socket);
        this.address = socket.remoteAddress;
        this.session_id = _.sha1(this.address + 'salt');
    }

    $socketData(msg) {
        var errors = [];
        var data = {};
        var json = parseJson(msg, errors);
        switch (json.event) {
            case 'session_id':
                data.session_id = this.session_id;
                break;
            case 'create_room':
                if (json.data.session_id != this.session_id) {
                    errors.push("Session id is invalid");
                    break;
                }
                var room = new Room(this);
                room.addMember(this, errors);
                data.room_id = room.room_id;
                break;
            case 'default':
                break;
        }
    }
}

var members = [];

module.exports = Member;