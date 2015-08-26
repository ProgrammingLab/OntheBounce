
let instance = null;

class ServerManager {
    constructor() {
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
        console.log(msg.toString());
        console.log("%s:%d\n", rinfo.address, rinfo.port);
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