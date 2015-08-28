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
        var json = parseJson(msg, errors);
        switch (json.event) {
            default:
                errors.push('Unknown Event pushed');
                break;
        }
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