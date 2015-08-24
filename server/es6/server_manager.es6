
let instance = null;

class ServerManager {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }
}

module.exports = ServerManager;