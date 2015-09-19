var Member = require('./member');
var Room = require('./room');
var Udp = require('./udp');
var RoomManager = require('./room_manager');
var MemberManager = require('./member_manager');
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

class ServerManager {
    constructor() {
        this.room_manager = new RoomManager();
        this.member_manager = new MemberManager();
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
                data.session_id = null;
                if (member) {
                    this.member_manager.push(member);
                    data.session_id = member.session_id;
                }
                break;
            case 'create_room':
                var member = this.member_manager.get(json.session_id);
                data.room_id = null;
                if (member) {
                    var room = new Room(member);
                    this.room_manager.push(room);
                    data.room_id = room.room_id;
                }
                break;
            case 'join_room':
                var member = this.member_manager.get(json.session_id);
                var room = this.room_manager.get(json.room_id);
                if (member && room) {
                    room.addMember(member, errors);
                }
                break;
            case 'users':
                var room = this.room_manager.get(json.room_id);
                var member = this.member_manager.get(json.session_id);
                data.users = [];
                if (room && member) {
                    if (room.isMember(member)) {
                        var users = [];
                        for (var i = 0; i < room.members.length; i++) {
                            users.push({session_id: room.members[i].session_id});
                        }
                        data.users = users;
                    } else {
                        errors.push("User is not a member of the room.");
                    }
                }
                break;
            case 'debug':
                data.debug = json;
                break;
            default:
                json.event = 'Unknown Event';
                errors.push('Unknown Event pushed');
                break;
        }
        var udp = new Udp(rinfo.address, rinfo.port);
        udp.distribute(json.event, data, errors);
        console.log({event: json.event, data: data, errors: errors});
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