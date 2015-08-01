var Base = require('./base');

class Room extends Base {
  constructor() {
    super();
    this.members = [];
    this.$children = this.members;
  }
}

module.exports = Room;