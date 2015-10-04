var Member = require('./member');
var Room = require('./room');
let instance = null;

class ServerManager {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    init(socket) {
        socket.on('listening', this.onListening.bind(this));
        socket.on('connection', this.onConnection.bind(this));
        socket.on('close', this.onClose.bind(this));
        socket.on('error', this.onError.bind(this));
    }

    onConnection(socket) {
        var member = new Member(socket);
        Member.push(member);
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