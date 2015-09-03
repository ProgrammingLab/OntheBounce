var Member = require('./member');
var Room = require('./room');
var Udp = require('./udp');
let instance = null;

function parseJson(msg, errors) {
    var data;
    try {
        data = JSON.parse(msg.toString());
    } catch(e) {
        errors.push(e.toString());
    }
    return data;
}

function getMember(members, session_id, errors) {
    if (!session_id) {
        errors.push("Session id is required");
        return null;
    }
    for(var i = 0; i < members.length; i++) {
        if (members[i].session_id == session_id) {
            return members[i];
        }
    }
    errors.push("Session id is invalid");
    return null;
}

function getRoom(rooms, room_id, errors) {
    if (!room_id) {
        errors.push("Room id is required");
        return null;
    }
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].room_id == room_id) {
            return rooms[i];
        }
    }
    errors.push("Room id is invalid");
    return null;
}

class ServerManager {
    constructor() {
        this.members = [];
        this.rooms = [];
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    init(socket) {
        socket.on('message', this.onMessage);
        socket.on('error', this.onError);
        socket.on('close', this.onClose);
        socket.on('listening', this.onListening);
    }

    onMessage(msg, rinfo) {
        var errors = [];
        var data = {};
        var json = parseJson(msg, errors);
        switch (json.event) {
            case 'session_id':
                var member = new Member(rinfo.address);
                this.members.push(member);
                data.session_id = member.session_id;
                break;
            case 'create_room':
                var member = getMember(this.members, json.session_id, errors);
                if (member) {
                    var room = new Room(member);
                    this.rooms.push(room);
                    data.room_id = room.room_id;
                }
                break;
            case 'join_room':
                var member = getMember(this.members, json.session_id, errors);
                var room = getRoom(this.rooms, json.room_id, errors);
                if (member && room) {
                    room.addMember(member, errors);
                }
                break;
            default:
                json.event = 'Unknown Event';
                errors.push('Unknown Event pushed');
                break;
        }
        var udp = new Udp(rinfo.address, rinfo.port);
        udp.distribute(json.event, data, errors);
    }

    onError(err) {
        console.log("server error:\n" + err.stack);
    }

    onClose() {
        console.log('Server Closed');
    }

    onListening() {
        console.log(`Listening Start on Server`);
    }
}

module.exports = ServerManager;