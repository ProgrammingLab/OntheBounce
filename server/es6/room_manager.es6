class RoomManager {
    constructor() {
        this.rooms = [];
        this.errors = [];
    }

    push(room) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].room_id == room.room_id) {
                this.errors.push("The room already exists.")
                return;
            }
        }
        this.rooms.push(room);
    }

    get(room_id) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].room_id == room_id) {
                return this.rooms[i];
            }
        }
        this.errors.push("That room_id is invalid.");
        return null;
    }
}

module.exports = RoomManager;